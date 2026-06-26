export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const where: any = {}

  if (query.workerId) where.workerId = query.workerId
  if (query.status) where.status = query.status
  if (query.startDate) {
    where.date = { ...(where.date || {}), gte: new Date(query.startDate as string) }
  }
  if (query.endDate) {
    where.date = { ...(where.date || {}), lte: new Date(query.endDate as string) }
  }

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 50
  const skip = (page - 1) * limit

  const [attendance, total] = await Promise.all([
    prisma.attendance.findMany({
      where,
      include: { worker: { select: { id: true, name: true, role: true } } },
      orderBy: { date: 'desc' },
      skip,
      take: limit,
    }),
    prisma.attendance.count({ where }),
  ])

  return { attendance, total, page, limit }
})
