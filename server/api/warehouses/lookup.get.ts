export default defineEventHandler(async (event) => {
  await requirePermission(event, 'WAREHOUSES', 'READ')
  const { q, cursor, take } = parseLookupQuery(event)
  const where: Record<string, any> = buildSearchWhere(q, ['name', 'location'])
  const warehouseIds = await getAccessibleWarehouseIds(event)
  if (warehouseIds !== null) {
    where.id = { in: warehouseIds }
  }
  const result = await paginatedLookup(prisma.warehouse, {
    where,
    take,
    cursor,
    select: { id: true, name: true, location: true },
    orderBy: { name: 'asc' },
  })
  return {
    items: result.items.map((i: any) => toLookupItem(i, 'name', 'id', 'location')),
    nextCursor: result.nextCursor,
  }
})
