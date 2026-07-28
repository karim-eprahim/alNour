export default defineEventHandler(async (event) => {
  await requirePermission(event, 'LEDGER', 'READ')
  const query = getQuery(event)

  const where = buildLedgerWhere(query)
  const { page, limit, skip } = parsePagination(query)
  const orderBy = parseSort(query)

  const [entries, total] = await Promise.all([
    prisma.ledgerEntry.findMany({
      where,
      include: {
        customer: { select: { id: true, name: true } },
        supplier: { select: { id: true, name: true } },
        worker: { select: { id: true, name: true } },
        distributor: { select: { id: true, name: true } },
      },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.ledgerEntry.count({ where }),
  ])

  return { entries, total, page, limit }
})
