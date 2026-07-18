export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PRODUCTS', 'CREATE')
  const body = await readBody(event)

  if (!body.name || !body.nameAr || !body.type) {
    throw createError({ statusCode: 400, statusMessage: 'Name (en), Name (ar), and type are required' })
  }

  if (body.warehouseId) {
    await validateWarehouseAccess(event, body.warehouseId)
  }

  const prefixMap: Record<string, string> = {
    RAW_CHARCOAL: 'RC',
    PACKAGED_CHARCOAL: 'PC',
    OTHER: 'OT',
  }
  const prefix = prefixMap[body.type] || 'PR'

  const lastProduct = await prisma.product.findFirst({
    where: { sku: { startsWith: prefix } },
    orderBy: { createdAt: 'desc' },
    select: { sku: true },
  })

  let nextNum = 1
  if (lastProduct) {
    const numPart = parseInt(lastProduct.sku.slice(3), 10)
    if (!isNaN(numPart)) nextNum = numPart + 1
  }
  const sku = `${prefix}-${String(nextNum).padStart(4, '0')}`

  const initialQuantity = body.initialQuantity ? parseFloat(body.initialQuantity) : 0

  const product = await prisma.$transaction(async (tx) => {
    const created = await tx.product.create({
      data: {
        name: body.name,
        nameAr: body.nameAr,
        type: body.type,
        sku,
        image: body.image,
        weight: body.weight ? parseFloat(body.weight) : null,
        purchaseCost: body.purchaseCost ? parseFloat(body.purchaseCost) : null,
        sellingPrice: body.sellingPrice ? parseFloat(body.sellingPrice) : null,
      },
    })

    if (initialQuantity > 0 && body.warehouseId) {
      await tx.stock.upsert({
        where: {
          warehouseId_productId: {
            warehouseId: body.warehouseId,
            productId: created.id,
          },
        },
        create: {
          warehouseId: body.warehouseId,
          productId: created.id,
          quantity: initialQuantity,
        },
        update: {
          quantity: initialQuantity,
        },
      })

      await tx.stockMovement.create({
        data: {
          productId: created.id,
          warehouseId: body.warehouseId,
          type: 'ADJUSTMENT',
          quantity: initialQuantity,
          notes: 'Opening stock / رصيد أول المدة',
          createdById: event.context.auth.userId,
        },
      })
    }

    return tx.product.findUniqueOrThrow({
      where: { id: created.id },
      include: {
        stocks: { include: { warehouse: true } },
      },
    })
  })

  return { product }
})
