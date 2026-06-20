export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const where: any = {}

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { phone: { contains: query.search, mode: 'insensitive' } },
    ]
  }

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 50
  const skip = (page - 1) * limit

  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      include: {
        _count: { select: { salesOrders: true, invoices: true } },
        ledgerEntries: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { name: 'asc' },
      skip,
      take: limit,
    }),
    prisma.customer.count({ where }),
  ])

  const customersWithBalance = customers.map((c) => {
    const balance = c.ledgerEntries.reduce((sum, e) => {
      return e.type === 'DEBIT' ? sum + e.amount.toNumber() : sum - e.amount.toNumber()
    }, 0)
    const { ledgerEntries, ...rest } = c
    return { ...rest, balance }
  })

  return { customers: customersWithBalance, total, page, limit }
})
