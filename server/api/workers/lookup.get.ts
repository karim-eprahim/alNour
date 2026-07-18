export default defineEventHandler(async (event) => {
  await requirePermission(event, 'WORKERS', 'READ')
  const { q, cursor, take, includeInactive } = parseLookupQuery(event)
  const where: any = {}
  if (!includeInactive) {
    where.isActive = true
  }
  Object.assign(where, buildSearchWhere(q, ['name', 'phone']))
  const result = await paginatedLookup(prisma.worker, {
    where,
    take,
    cursor,
    select: { id: true, name: true, phone: true },
    orderBy: { name: 'asc' },
  })
  return {
    items: result.items.map((i: any) => toLookupItem(i, 'name', 'id', 'phone')),
    nextCursor: result.nextCursor,
  }
})
