export default defineEventHandler(async (event) => {
  // await requirePermission(event, 'LEDGER', 'READ')
  const { q, cursor, take } = parseLookupQuery(event)
  const query = getQuery(event)

  const where: any = {}

  if (q && q.length >= 2) {
    where.description = { contains: q, mode: 'insensitive' }
  }

  for (const field of ['customerId', 'supplierId', 'workerId', 'distributorId'] as const) {
    if (query[field]) {
      where[field] = query[field]
    }
  }

  if (query.type) {
    where.type = query.type
  }

  const result = await paginatedLookup(prisma.ledgerEntry, {
    where,
    take,
    cursor,
    orderBy: { createdAt: 'desc' },
    select: { id: true, description: true, amount: true, type: true, createdAt: true },
  })

  return {
    items: result.items.map((i: any) => ({
      value: i.id,
      label: i.description || `Ledger #${i.id.slice(0, 8)}`,
      subtitle: `${i.type} ${Number(i.amount).toFixed(2)}`,
    })),
    nextCursor: result.nextCursor,
  }
})
