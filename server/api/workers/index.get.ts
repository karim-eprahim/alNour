export default defineEventHandler(async (event) => {
  await requirePermission(event, 'WORKERS', 'READ')
  const query = getQuery(event)
  const where: any = {}

  if (query.search) {
    where.OR = [
      { name: { contains: query.search as string, mode: 'insensitive' } },
      { phone: { contains: query.search as string, mode: 'insensitive' } },
    ]
  }
  if (query.isActive !== undefined) where.isActive = query.isActive === 'true'
  if (query.role) where.role = query.role

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 20
  const skip = (page - 1) * limit

  const [workers, total] = await Promise.all([
    prisma.worker.findMany({
      where,
      include: {
        _count: { select: { attendance: true, advances: true, dailyWages: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.worker.count({ where }),
  ])

  const workersWithSummary = await Promise.all(
    workers.map(async (w) => {
      const wageAgg = await prisma.workerDailyWage.aggregate({
        where: { workerId: w.id },
        _sum: { dailyWage: true },
      })
      const advanceAgg = await prisma.workerAdvance.aggregate({
        where: { workerId: w.id },
        _sum: { amount: true },
      })
      return {
        ...w,
        totalWagesEarned: wageAgg._sum.dailyWage?.toNumber() || 0,
        totalAdvancesTaken: advanceAgg._sum.amount?.toNumber() || 0,
        netPayout: (wageAgg._sum.dailyWage?.toNumber() || 0) - (advanceAgg._sum.amount?.toNumber() || 0),
      }
    })
  )

  return { workers: workersWithSummary, total, page, limit }
})
