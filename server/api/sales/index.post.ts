export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'CREATE')
  const body = await readBody(event)
  const auth = event.context.auth

  await validateWarehouseAccess(event, body.warehouseId)

  if (!body.customerId || !body.warehouseId || !body.items?.length) {
    throw createError({ statusCode: 400, statusMessage: 'customerId, warehouseId, and items are required' })
  }

  const order = await prisma.$transaction(async (tx) => {
    const count = await tx.salesOrder.count()
    const orderNumber = `SO-${String(count + 1).padStart(6, '0')}`

    let totalAmount = 0
    const itemsData = body.items.map((item: any) => {
      const qty = parseFloat(item.quantity) || 0
      const unitPrice = parseFloat(item.unitPrice) || 0
      const totalPrice = qty * unitPrice
      totalAmount += totalPrice
      return {
        productId: item.productId,
        quantity: qty,
        unitPrice,
        totalPrice,
      }
    })

    const created = await tx.salesOrder.create({
      data: {
        orderNumber,
        customerId: body.customerId,
        warehouseId: body.warehouseId,
        createdById: auth.userId,
        totalAmount,
        status: 'CONFIRMED',
        items: { create: itemsData },
      },
      include: {
        customer: { select: { id: true, name: true } },
        warehouse: { select: { id: true, name: true } },
        items: { include: { product: { select: { id: true, name: true, sku: true } } } },
      },
    })

    const invCount = await tx.invoice.count()
    const invoiceNumber = `INV-${String(invCount + 1).padStart(6, '0')}`

    const paidAmount = body.paidAmount ? parseFloat(body.paidAmount) : 0
    const invoiceStatus = paidAmount >= totalAmount ? 'PAID' : paidAmount > 0 ? 'PARTIAL' : 'UNPAID'

    const invoice = await tx.invoice.create({
      data: {
        invoiceNumber,
        salesOrderId: created.id,
        customerId: body.customerId,
        createdById: auth.userId,
        totalAmount,
        paidAmount,
        status: invoiceStatus,
      },
    })

    for (const item of itemsData) {
      const stock = await tx.stock.findUnique({
        where: {
          warehouseId_productId: {
            warehouseId: body.warehouseId,
            productId: item.productId,
          },
        },
      })
      const currentQty = stock ? stock.quantity.toNumber() : 0
      const newQty = currentQty - item.quantity
      if (newQty < 0) {
        throw createError({ statusCode: 400, statusMessage: `Insufficient stock for product ${item.productId}` })
      }
      if (stock) {
        await tx.stock.update({ where: { id: stock.id }, data: { quantity: newQty } })
      }
      await tx.stockMovement.create({
        data: {
          productId: item.productId,
          warehouseId: body.warehouseId,
          type: 'SALE',
          quantity: -item.quantity,
          notes: `Sales order ${orderNumber}`,
          referenceId: created.id,
          createdById: auth.userId,
        },
      })
    }

    if (paidAmount > 0) {
      await tx.payment.create({
        data: {
          invoiceId: invoice.id,
          createdById: auth.userId,
          amount: paidAmount,
          paymentMethod: body.paymentMethod || 'CASH',
          notes: body.paymentNotes || null,
        },
      })
    }

    await tx.ledgerEntry.create({
      data: {
        customerId: body.customerId,
        amount: totalAmount,
        type: 'DEBIT',
        description: `Sales order ${orderNumber} / Invoice ${invoiceNumber}`,
      },
    })

    if (paidAmount > 0) {
      await tx.ledgerEntry.create({
        data: {
          customerId: body.customerId,
          amount: paidAmount,
          type: 'CREDIT',
          description: `Payment for invoice ${invoiceNumber}`,
        },
      })
    }

    return created
  })

  return { order }
})
