export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const auth = event.context.auth

  if (!body.fromWarehouseId || !body.toWarehouseId || !body.items?.length) {
    throw createError({ statusCode: 400, statusMessage: 'fromWarehouseId, toWarehouseId, and items are required' })
  }

  if (body.fromWarehouseId === body.toWarehouseId) {
    throw createError({ statusCode: 400, statusMessage: 'Source and destination warehouses must be different' })
  }

  const transfer = await prisma.$transaction(async (tx) => {
    const count = await tx.stockTransfer.count()
    const transferNumber = `TRF-${String(count + 1).padStart(6, '0')}`

    for (const item of body.items) {
      const stock = await tx.stock.findUnique({
        where: {
          warehouseId_productId: {
            warehouseId: body.fromWarehouseId,
            productId: item.productId,
          },
        },
      })

      const qty = parseFloat(item.quantity)
      if (!stock || stock.quantity.toNumber() < qty) {
        throw createError({ statusCode: 400, statusMessage: `Insufficient stock for product ${item.productId}` })
      }
    }

    const created = await tx.stockTransfer.create({
      data: {
        transferNumber,
        fromWarehouseId: body.fromWarehouseId,
        toWarehouseId: body.toWarehouseId,
        createdById: auth.userId,
        status: body.status || 'PENDING',
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            quantity: parseFloat(item.quantity),
          })),
        },
      },
      include: {
        fromWarehouse: true,
        toWarehouse: true,
        items: { include: { product: true } },
      },
    })

    return created
  })

  return { transfer }
})
