
export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'READ')

  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 20
  const skip = (page - 1) * limit

  const where: any = {}

  if (query.distributorId) {
    where.distributorId = query.distributorId
  }
  if (query.status) {
    where.status = query.status
  }
  if (query.paymentMethod) {
    where.paymentMethod = query.paymentMethod
  }
  if (query.dateFrom || query.dateTo) {
    where.submittedAt = {}
    if (query.dateFrom) {
      where.submittedAt.gte = new Date(query.dateFrom as string)
    }
    if (query.dateTo) {
      where.submittedAt.lte = new Date(query.dateTo as string)
    }
  }
  if (query.search) {
    where.OR = [
      { settlementNumber: { contains: query.search, mode: 'insensitive' } },
      { distributor: { name: { contains: query.search, mode: 'insensitive' } } },
    ]
  }

  const [settlements, total, statusGroups] = await Promise.all([
    prisma.settlement.findMany({
      where,
      include: {
        distributor: { select: { id: true, name: true } },
        confirmedByUser: { select: { id: true, name: true } },
      },
      orderBy: { submittedAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.settlement.count({ where }),
    prisma.settlement.groupBy({ by: ['status'], _count: { _all: true } }),
  ])

  const summary: Record<string, number> = {}
  for (const g of statusGroups) {
    summary[g.status] = g._count._all
  }

  return {
    settlements: settlements.map(serializeSettlement),
    total,
    page,
    limit,
    summary,
  }
})
