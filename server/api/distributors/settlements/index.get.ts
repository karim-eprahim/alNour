
export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'SALES', 'READ')

  const query = getQuery(event)
  const distributorId = (query.distributorId as string) || auth.userId

  if (distributorId !== auth.userId) {
    await requirePermission(event, 'USERS', 'READ')
  }

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 20
  const skip = (page - 1) * limit

  const where: any = { distributorId }

  if (query.status) {
    const statuses = (query.status as string).split(',')
    where.status = { in: statuses }
  }

  const [settlements, total, custodySummary] = await Promise.all([
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
    getDistributorCustody(prisma, distributorId),
  ])

  return {
    settlements: settlements.map(serializeSettlement),
    total,
    page,
    limit,
    summary: {
      collected: custodySummary.collected,
      confirmed: custodySummary.confirmed,
      custody: custodySummary.custody,
    },
  }
})
