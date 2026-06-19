export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const auth = event.context.auth

  const transfer = await prisma.stockTransfer.findUnique({
    where: { id },
    include: { items: true },
  })

  if (!transfer) {
    throw createError({ statusCode: 404, statusMessage: 'Transfer not found' })
  }

  if (transfer.status !== 'PENDING') {
    throw createError({ statusCode: 400, statusMessage: 'Transfer is already completed or cancelled' })
  }

  await prisma.$transaction(async (tx) => {
    await tx.stockTransfer.update({
      where: { id },
      data: { status: 'COMPLETED' },
    })

    for (const item of transfer.items) {
      const qty = item.quantity.toNumber()

      const fromStock = await tx.stock.findUnique({
        where: {
          warehouseId_productId: {
            warehouseId: transfer.fromWarehouseId,
            productId: item.productId,
          },
        },
      })
      if (!fromStock || fromStock.quantity.toNumber() < qty) {
        throw createError({ statusCode: 400, statusMessage: 'Insufficient stock after transfer was created' })
      }

      await tx.stock.update({
        where: { id: fromStock.id },
        data: { quantity: { decrement: qty } },
      })

      const toStock = await tx.stock.findUnique({
        where: {
          warehouseId_productId: {
            warehouseId: transfer.toWarehouseId,
            productId: item.productId,
          },
        },
      })

      if (toStock) {
        await tx.stock.update({
          where: { id: toStock.id },
          data: { quantity: { increment: qty } },
        })
      } else {
        await tx.stock.create({
          data: {
            warehouseId: transfer.toWarehouseId,
            productId: item.productId,
            quantity: qty,
          },
        })
      }

      await tx.stockMovement.create({
        data: {
          productId: item.productId,
          warehouseId: transfer.fromWarehouseId,
          type: 'TRANSFER_OUT',
          quantity: -qty,
          referenceId: transfer.id,
          createdById: auth.userId,
        },
      })

      await tx.stockMovement.create({
        data: {
          productId: item.productId,
          warehouseId: transfer.toWarehouseId,
          type: 'TRANSFER_IN',
          quantity: qty,
          referenceId: transfer.id,
          createdById: auth.userId,
        },
      })
    }
  })

  return { success: true }
})
