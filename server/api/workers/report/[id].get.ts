export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const worker = await prisma.worker.findUnique({ where: { id } })
  if (!worker) {
    throw createError({ statusCode: 404, statusMessage: 'Worker not found' })
  }

  const query = getQuery(event)
  const dateFilter: any = {}
  if (query.startDate) dateFilter.gte = new Date(query.startDate as string)
  if (query.endDate) dateFilter.lte = new Date(query.endDate as string)
  const hasDateFilter = query.startDate || query.endDate

  const [attendance, dailyWages, advances] = await Promise.all([
    prisma.attendance.findMany({
      where: { workerId: id, ...(hasDateFilter ? { date: dateFilter } : {}) },
      orderBy: { date: 'desc' },
    }),
    prisma.workerDailyWage.findMany({
      where: { workerId: id, ...(hasDateFilter ? { date: dateFilter } : {}) },
      include: { batch: { select: { id: true, batchNumber: true } } },
      orderBy: { date: 'desc' },
    }),
    prisma.workerAdvance.findMany({
      where: { workerId: id, ...(hasDateFilter ? { date: dateFilter } : {}) },
      orderBy: { date: 'desc' },
    }),
  ])

  const totalWages = dailyWages.reduce((s, w) => s + w.dailyWage.toNumber(), 0)
  const totalAdvances = advances.reduce((s, a) => s + a.amount.toNumber(), 0)

  const attendanceSummary = {
    present: attendance.filter((a) => a.status === 'PRESENT').length,
    absent: attendance.filter((a) => a.status === 'ABSENT').length,
    leave: attendance.filter((a) => a.status === 'LEAVE').length,
    total: attendance.length,
  }

  return {
    report: {
      worker: { id: worker.id, name: worker.name, phone: worker.phone, role: worker.role, defaultDailyWage: worker.defaultDailyWage?.toNumber() || 0, isActive: worker.isActive },
      attendanceSummary,
      attendanceHistory: attendance,
      totalWagesEarned: totalWages,
      totalAdvancesTaken: totalAdvances,
      netPayout: totalWages - totalAdvances,
      dailyWages,
      advances,
    },
  }
})
