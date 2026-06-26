export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const worker = await prisma.worker.findUnique({
    where: { id },
    include: {
      attendance: { orderBy: { date: 'desc' }, take: 90 },
      advances: { orderBy: { date: 'desc' } },
      dailyWages: {
        include: { batch: { select: { id: true, batchNumber: true } } },
        orderBy: { date: 'desc' },
      },
    },
  })

  if (!worker) {
    throw createError({ statusCode: 404, statusMessage: 'Worker not found' })
  }

  const wageAgg = await prisma.workerDailyWage.aggregate({
    where: { workerId: id },
    _sum: { dailyWage: true },
  })
  const advanceAgg = await prisma.workerAdvance.aggregate({
    where: { workerId: id },
    _sum: { amount: true },
  })
  const attendanceCounts = await prisma.attendance.groupBy({
    by: ['status'],
    where: { workerId: id },
    _count: true,
  })

  const totalWagesEarned = wageAgg._sum.dailyWage?.toNumber() || 0
  const totalAdvancesTaken = advanceAgg._sum.amount?.toNumber() || 0

  return {
    worker: {
      ...worker,
      totalWagesEarned,
      totalAdvancesTaken,
      netPayout: totalWagesEarned - totalAdvancesTaken,
      attendanceSummary: attendanceCounts.reduce((acc: any, a) => {
        acc[a.status.toLowerCase()] = a._count
        return acc
      }, { present: 0, absent: 0, leave: 0 }),
    },
  }
})
