export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PRODUCTS', 'READ')
  const { q, cursor, take, warehouseId } = parseLookupQuery(event)
  const where: any = {}
  Object.assign(where, buildSearchWhere(q, ['name', 'nameAr', 'sku']))
  if (warehouseId) {
    where.stocks = { some: { warehouseId } }
  }
  const result = await paginatedLookup(prisma.product, {
    where,
    take,
    cursor,
    select: { id: true, name: true, nameAr: true },
    orderBy: { name: 'asc' },
  })
  return {
    items: result.items.map((i: any) => ({
      value: i.id,
      label: i.name,
      subtitle: i.nameAr || undefined,
    })),
    nextCursor: result.nextCursor,
  }
})
