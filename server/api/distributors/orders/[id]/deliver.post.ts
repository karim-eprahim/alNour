const DELIVERY_RESULTS = ['FULL', 'PARTIAL', 'FAILED', 'CANCELLED']

function validateResult(result: string) {
  return DELIVERY_RESULTS.includes(result)
}

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'SALES', 'UPDATE')

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const result = body.result as 'FULL' | 'PARTIAL' | 'FAILED' | 'CANCELLED'

  if (!validateResult(result)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid delivery result' })
  }

  const order = await prisma.salesOrder.findFirst({
    where: { id, assignedDistributorId: auth.userId, status: 'OUT_FOR_DELIVERY' },
    include: { items: true },
  })

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Order not found' })
  }

  if (result === 'FAILED') {
    const updated = await prisma.salesOrder.update({
      where: { id },
      data: { deliveryResult: 'FAILED' },
    })
    return { order: { id: updated.id, status: updated.status, deliveryResult: updated.deliveryResult } }
  }

  if (result === 'CANCELLED') {
    const updated = await prisma.$transaction(async (tx) => {
      const order = await tx.salesOrder.update({
        where: { id },
        data: {
          deliveryResult: 'CANCELLED',
          status: 'CANCELLED',
          cancelReason: body.cancelReason || null,
          completedAt: new Date(),
        },
      })

      await tx.deliveryTracking.updateMany({
        where: { salesOrderId: id, status: 'ACTIVE' },
        data: { status: 'CANCELLED', endedAt: new Date(), lastUpdatedAt: new Date() },
      })

      return order
    })
    return { order: { id: updated.id, status: updated.status, deliveryResult: updated.deliveryResult } }
  }

  const delivered = result === 'FULL'
    ? order.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity.toNumber(),
      }))
    : (body.items || []).map((item: any) => ({
        productId: item.productId,
        quantity: parseFloat(item.quantity) || 0,
      }))

  if (delivered.length !== order.items.length) {
    throw createError({ statusCode: 400, statusMessage: 'Delivered quantities must be provided for every item' })
  }

  const orderedByProduct = new Map(order.items.map((item) => [item.productId, item.quantity.toNumber()]))
  const unitPriceByProduct = new Map(order.items.map((item) => [item.productId, item.unitPrice.toNumber()]))

  for (const item of delivered) {
    const orderedQty = orderedByProduct.get(item.productId)
    if (orderedQty === undefined) {
      throw createError({ statusCode: 400, statusMessage: `Product ${item.productId} is not part of this order` })
    }
    if (item.quantity < 0 || item.quantity > orderedQty) {
      throw createError({
        statusCode: 400,
        statusMessage: `Delivered quantity for product ${item.productId} must be between 0 and ${orderedQty}`,
      })
    }
  }

  if (result === 'PARTIAL' && delivered.every((item: any) => item.quantity === orderedByProduct.get(item.productId))) {
    throw createError({ statusCode: 400, statusMessage: 'Delivered quantities match the full order. Use FULL instead.' })
  }

  const invoiceItems = delivered.filter((item: any) => item.quantity > 0)
  const totalAmount = invoiceItems.reduce((sum: number, item: any) => sum + item.quantity * unitPriceByProduct.get(item.productId)!, 0)

  if (invoiceItems.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'At least one item must have a delivered quantity greater than zero' })
  }

  const paidAmount = body.paidAmount ? parseFloat(body.paidAmount) : 0
  if (paidAmount > totalAmount) {
    throw createError({ statusCode: 400, statusMessage: 'Paid amount cannot exceed the invoice total' })
  }

  const completed = await prisma.$transaction(async (tx) => {
    for (const item of invoiceItems) {
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

      await tx.stockMovement.create({
        data: {
          productId: item.productId,
          warehouseId: order.warehouseId,
          type: 'DISTRIBUTOR_SALE',
          quantity: -item.quantity,
          referenceId: order.id,
          notes: `Delivery ${result} for order ${order.orderNumber}`,
          createdById: auth.userId,
        },
      })
    }

    const invCount = await tx.invoice.count()
    const invoiceNumber = `INV-${String(invCount + 1).padStart(6, '0')}`
    const invoiceStatus = paidAmount >= totalAmount ? 'PAID' : paidAmount > 0 ? 'PARTIAL' : 'UNPAID'

    const invoice = await tx.invoice.create({
      data: {
        invoiceNumber,
        salesOrderId: order.id,
        customerId: order.customerId,
        warehouseId: order.warehouseId,
        createdById: auth.userId,
        totalAmount,
        paidAmount,
        status: invoiceStatus,
        saleSource: order.saleSource,
        items: {
          create: invoiceItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: unitPriceByProduct.get(item.productId)!,
            totalPrice: item.quantity * unitPriceByProduct.get(item.productId)!,
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
        customerId: order.customerId,
        amount: totalAmount,
        type: 'DEBIT',
        description: `Delivery ${result} for order ${order.orderNumber} / Invoice ${invoiceNumber}`,
      },
    })

    if (paidAmount > 0) {
      await tx.ledgerEntry.create({
        data: {
          customerId: order.customerId,
          amount: paidAmount,
          type: 'CREDIT',
          description: `Payment for invoice ${invoiceNumber}`,
        },
      })
    }

    const updated = await tx.salesOrder.update({
      where: { id: order.id },
      data: {
        deliveryResult: result,
        status: 'COMPLETED',
        partialDeliveryReason: result === 'PARTIAL' ? body.partialDeliveryReason || null : null,
        completedAt: new Date(),
      },
    })

    await tx.deliveryTracking.updateMany({
      where: { salesOrderId: order.id, status: 'ACTIVE' },
      data: { status: 'COMPLETED', endedAt: new Date(), lastUpdatedAt: new Date() },
    })

    return { invoice, order: updated }
  })

  return {
    invoice: completed.invoice,
    order: {
      id: completed.order.id,
      status: completed.order.status,
      deliveryResult: completed.order.deliveryResult,
    },
  }
})
