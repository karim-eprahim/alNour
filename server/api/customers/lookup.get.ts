export default defineEventHandler(async (event) => {
  await requirePermission(event, 'CUSTOMERS', 'READ')
  const { q, cursor, take } = parseLookupQuery(event)
  const where = buildSearchWhere(q, ['name', 'phone'])
  const result = await paginatedLookup(prisma.customer, {
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
