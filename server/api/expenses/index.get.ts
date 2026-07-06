export default defineEventHandler(async (event) => {
  await requirePermission(event, 'EXPENSES', 'READ')
  const query = getQuery(event)
  const where: any = {}

  if (query.category) where.category = query.category
  if (query.startDate) {
    where.date = { ...(where.date || {}), gte: new Date(query.startDate as string) }
  }
  if (query.endDate) {
    where.date = { ...(where.date || {}), lte: new Date(query.endDate as string) }
  }
  if (query.search) {
    where.title = { contains: query.search as string, mode: 'insensitive' }
  }

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 20
  const skip = (page - 1) * limit

  const [expenses, total] = await Promise.all([
    prisma.expense.findMany({
      where,
      include: { createdBy: { select: { id: true, name: true } } },
      orderBy: { date: 'desc' },
      skip,
      take: limit,
    }),
    prisma.expense.count({ where }),
  ])

  const categories = await prisma.expense.groupBy({
    by: ['category'],
    _sum: { amount: true },
    _count: true,
  })

  return { expenses, total, page, limit, categories }
})
