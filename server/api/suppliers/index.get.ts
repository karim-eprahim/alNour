export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SUPPLIERS', 'READ')
  const query = getQuery(event)
  const where: any = {}

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { company: { contains: query.search, mode: 'insensitive' } },
      { phone: { contains: query.search, mode: 'insensitive' } },
    ]
  }

  const [suppliers, total] = await Promise.all([
    prisma.supplier.findMany({
      where,
      include: {
        _count: { select: { purchaseInvoices: true, ledgerEntries: true } },
        ledgerEntries: { select: { amount: true, type: true } },
        linkedCustomer: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.supplier.count({ where }),
  ])

  const suppliersWithBalance = suppliers.map((s) => {
    const balance = s.ledgerEntries.reduce((acc, entry) => {
      return entry.type === 'DEBIT' ? acc + Number(entry.amount) : acc - Number(entry.amount)
    }, 0)
    const { ledgerEntries, ...rest } = s
    return { ...rest, balance }
  })

  return { suppliers: suppliersWithBalance, total }
})
