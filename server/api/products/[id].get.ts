export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PRODUCTS', 'READ')
  const id = getRouterParam(event, 'id')

  const warehouseIds = await getAccessibleWarehouseIds(event)
  const stockWhere: any = {}
  const movementWhere: any = {}
  if (warehouseIds !== null) {
    stockWhere.warehouseId = { in: warehouseIds }
    movementWhere.warehouseId = { in: warehouseIds }
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      stocks: {
        where: stockWhere,
        include: { warehouse: true },
      },
      movements: {
        where: movementWhere,
        include: { warehouse: true, createdBy: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
    },
  })

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return { product }
})
