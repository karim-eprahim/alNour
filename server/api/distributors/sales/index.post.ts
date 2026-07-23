export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'SALES', 'CREATE')

  const body = await readBody(event)

  if (!body.customerId || !body.items?.length) {
    throw createError({ statusCode: 400, statusMessage: 'customerId and items are required' })
  }

  if (!body.warehouseId) {
    throw createError({ statusCode: 400, statusMessage: 'warehouseId is required' })
  }

  const result = await prisma.$transaction(async (tx) => {
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

    for (const item of itemsData) {
      const custody = await tx.distributorCustody.findUnique({
        where: {
          distributorId_productId: {
            distributorId: auth.userId,
            productId: item.productId,
          },
        },
      })

      const custodyQty = custody ? custody.quantity.toNumber() : 0
      if (custodyQty < item.quantity) {
        throw createError({
          statusCode: 400,
          statusMessage: `Insufficient custody for product ${item.productId}. Have ${custodyQty}, need ${item.quantity}`,
        })
      }

      const newCustodyQty = custodyQty - item.quantity
      if (newCustodyQty <= 0) {
        await tx.distributorCustody.delete({ where: { id: custody!.id } })
      } else {
        await tx.distributorCustody.update({
          where: { id: custody!.id },
          data: { quantity: newCustodyQty },
        })
      }

      await tx.distributorOperation.create({
        data: {
          distributorId: auth.userId,
          productId: item.productId,
          quantity: item.quantity,
          type: 'SALE',
        },
      })
    }

    const invCount = await tx.invoice.count()
    const invoiceNumber = `INV-${String(invCount + 1).padStart(6, '0')}`

    const paidAmount = body.paidAmount ? parseFloat(body.paidAmount) : 0
    const invoiceStatus = paidAmount >= totalAmount ? 'PAID' : paidAmount > 0 ? 'PARTIAL' : 'UNPAID'

    const invoice = await tx.invoice.create({
      data: {
        invoiceNumber,
        customerId: body.customerId,
        warehouseId: body.warehouseId,
        createdById: auth.userId,
        totalAmount,
        paidAmount,
        status: invoiceStatus,
        saleSource: 'DIRECT_DISTRIBUTOR',
        items: {
          create: itemsData.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        },
      },
    })

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

      await tx.user.update({
        where: { id: auth.userId },
        data: { cashOnHand: { increment: paidAmount } },
      })

      await tx.distributorCashMovement.create({
        data: {
          distributorId: auth.userId,
          amount: paidAmount,
          type: 'PAYMENT_COLLECTED',
          referenceId: invoice.id,
          notes: `Payment collected for invoice ${invoiceNumber}`,
        },
      })
    }

    await tx.ledgerEntry.create({
      data: {
        customerId: body.customerId,
        amount: totalAmount,
        type: 'DEBIT',
        description: `Direct distributor sale / Invoice ${invoiceNumber}`,
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

    return { invoice }
  })

  return result
})
