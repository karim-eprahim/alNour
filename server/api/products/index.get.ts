export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PRODUCTS', 'READ')
  const query = getQuery(event)
  const where: any = {}

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { nameAr: { contains: query.search, mode: 'insensitive' } },
      { sku: { contains: query.search, mode: 'insensitive' } },
    ]
  }
  if (query.type) where.type = query.type
  if (query.warehouseId) {
    await validateWarehouseAccess(event, query.warehouseId as string)
    where.stocks = { some: { warehouseId: query.warehouseId } }
  } else {
    const warehouseIds = await getAccessibleWarehouseIds(event)
    if (warehouseIds !== null) {
      where.stocks = { some: { warehouseId: { in: warehouseIds } } }
    }
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        stocks: { include: { warehouse: true } },
        _count: { select: { movements: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ])

  return { products, total }
})
