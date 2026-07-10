export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PRODUCTION', 'READ')
  const query = getQuery(event)
  const where: any = {}

  if (query.warehouseId) {
    await validateWarehouseAccess(event, query.warehouseId as string)
    where.warehouseId = query.warehouseId
  } else {
    const warehouseIds = await getAccessibleWarehouseIds(event)
    if (warehouseIds !== null) {
      where.warehouseId = { in: warehouseIds }
    }
  }
  if (query.status) where.status = query.status
  if (query.startDate) {
    where.createdAt = { ...(where.createdAt || {}), gte: new Date(query.startDate as string) }
  }
  if (query.endDate) {
    where.createdAt = { ...(where.createdAt || {}), lte: new Date(query.endDate as string) }
  }

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 20
  const skip = (page - 1) * limit

  const [batches, total] = await Promise.all([
    prisma.productionBatch.findMany({
      where,
      include: {
        warehouse: { select: { id: true, name: true } },
        consumptions: {
          include: { product: { select: { id: true, name: true, sku: true } } },
        },
        outputs: {
          include: { product: { select: { id: true, name: true, sku: true, type: true } } },
        },
        _count: { select: { consumptions: true, outputs: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.productionBatch.count({ where }),
  ])

  return { batches, total, page, limit }
})
