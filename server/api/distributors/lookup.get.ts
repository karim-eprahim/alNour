export default defineEventHandler(async (event) => {
  await requirePermission(event, 'USERS', 'READ')
  const { q, cursor, take } = parseLookupQuery(event)
  const where: any = {
    role: { name: 'DISTRIBUTOR' },
    status: 'ACTIVE',
  }
  Object.assign(where, buildSearchWhere(q, ['name', 'email']))
  const result = await paginatedLookup(prisma.user, {
    where,
    take,
    cursor,
    select: { id: true, name: true, email: true },
    orderBy: { name: 'asc' },
  })
  return {
    items: result.items.map((i: any) => toLookupItem(i, 'name', 'id', 'email')),
    nextCursor: result.nextCursor,
  }
})
