export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const where: any = {}

  if (query.productId) where.productId = query.productId
  if (query.warehouseId) where.warehouseId = query.warehouseId
  if (query.type) where.type = query.type

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 50
  const skip = (page - 1) * limit

  const [movements, total] = await Promise.all([
    prisma.stockMovement.findMany({
      where,
      include: {
        product: { select: { id: true, name: true, sku: true } },
        warehouse: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.stockMovement.count({ where }),
  ])

  return { movements, total, page, limit }
})
