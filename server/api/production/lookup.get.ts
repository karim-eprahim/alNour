export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PRODUCTION', 'READ')
  const { q, cursor, take, warehouseId } = parseLookupQuery(event)
  const where: any = {}
  Object.assign(where, buildSearchWhere(q, ['batchNumber']))
  if (warehouseId) {
    await validateWarehouseAccess(event, warehouseId)
    where.warehouseId = warehouseId
  } else {
    const warehouseIds = await getAccessibleWarehouseIds(event)
    if (warehouseIds !== null) {
      where.warehouseId = { in: warehouseIds }
    }
  }
  const result = await paginatedLookup(prisma.productionBatch, {
    where,
    take,
    cursor,
    select: { id: true, batchNumber: true },
    orderBy: { createdAt: 'desc' },
  })
  return {
    items: result.items.map((i: any) => ({ value: i.id, label: i.batchNumber })),
    nextCursor: result.nextCursor,
  }
})
