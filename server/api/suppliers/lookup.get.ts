export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SUPPLIERS', 'READ')
  const { q, cursor, take } = parseLookupQuery(event)
  const where = buildSearchWhere(q, ['name', 'company', 'phone'])
  const result = await paginatedLookup(prisma.supplier, {
    where,
    take,
    cursor,
    select: { id: true, name: true, company: true },
    orderBy: { name: 'asc' },
  })
  return {
    items: result.items.map((i: any) => toLookupItem(i, 'name', 'id', 'company')),
    nextCursor: result.nextCursor,
  }
})
