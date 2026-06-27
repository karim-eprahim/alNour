export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const auth = event.context.auth

  if (!body.distributorId || !body.productId || !body.quantity) {
    throw createError({ statusCode: 400, statusMessage: 'distributorId, productId, and quantity are required' })
  }

  if (!body.warehouseId) {
    throw createError({ statusCode: 400, statusMessage: 'warehouseId is required' })
  }

  const quantity = parseFloat(body.quantity)
  if (isNaN(quantity) || quantity <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Quantity must be a positive number' })
  }

  const distributor = await prisma.user.findUnique({
    where: { id: body.distributorId },
    select: { id: true, role: { select: { name: true } } },
  })
  if (!distributor || distributor.role?.name !== 'DISTRIBUTOR') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid distributor' })
  }

  const product = await prisma.product.findUnique({
    where: { id: body.productId },
    select: { id: true, name: true, sellingPrice: true },
  })
  if (!product) {
    throw createError({ statusCode: 400, statusMessage: 'Product not found' })
  }

  const result = await prisma.$transaction(async (tx) => {
    const stock = await tx.stock.findUnique({
      where: {
        warehouseId_productId: {
          warehouseId: body.warehouseId,
          productId: body.productId,
        },
      },
    })

    if (!stock || stock.quantity.toNumber() < quantity) {
      throw createError({ statusCode: 400, statusMessage: 'Insufficient warehouse stock' })
    }

    const newStockQty = stock.quantity.toNumber() - quantity
    await tx.stock.update({
      where: { id: stock.id },
      data: { quantity: newStockQty },
    })

    await tx.stockMovement.create({
      data: {
        productId: body.productId,
        warehouseId: body.warehouseId,
        type: 'DISTRIBUTOR_LOAD',
        quantity: -quantity,
        referenceId: body.distributorId,
        notes: body.notes || `Loaded onto distributor truck`,
        createdById: auth.userId,
      },
    })

    const custody = await tx.distributorCustody.upsert({
      where: {
        distributorId_productId: {
          distributorId: body.distributorId,
          productId: body.productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        distributorId: body.distributorId,
        productId: body.productId,
        quantity,
      },
    })

    await tx.distributorOperation.create({
      data: {
        distributorId: body.distributorId,
        productId: body.productId,
        quantity,
        type: 'LOAD',
      },
    })

    return { custody }
  })

  return result
})
