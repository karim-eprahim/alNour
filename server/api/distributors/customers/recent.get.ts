export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'SALES', 'READ')

  const invoices = await prisma.invoice.findMany({
    where: { createdById: auth.userId },
    select: {
      customerId: true,
      createdAt: true,
      totalAmount: true,
      paidAmount: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const customerMap = new Map<string, { lastVisit: Date; totalAmount: number; paidAmount: number; invoiceCount: number }>()
  for (const inv of invoices) {
    if (!customerMap.has(inv.customerId)) {
      customerMap.set(inv.customerId, {
        lastVisit: inv.createdAt,
        totalAmount: inv.totalAmount.toNumber(),
        paidAmount: inv.paidAmount.toNumber(),
        invoiceCount: 1,
      })
    } else {
      const entry = customerMap.get(inv.customerId)!
      entry.invoiceCount++
    }
  }

  const customerIds = [...customerMap.keys()].slice(0, 10)

  if (customerIds.length === 0) {
    return { customers: [] }
  }

  const customers = await prisma.customer.findMany({
    where: { id: { in: customerIds } },
    select: {
      id: true,
      name: true,
      phone: true,
      address: true,
      createdAt: true,
      ledgerEntries: {
        select: { amount: true, type: true },
      },
    },
  })

  const result = customers.map((c) => {
    const stats = customerMap.get(c.id)!
    const balance = c.ledgerEntries.reduce((sum, e) => {
      return e.type === 'DEBIT' ? sum + e.amount.toNumber() : sum - e.amount.toNumber()
    }, 0)
    const { ledgerEntries, ...rest } = c
    return {
      ...rest,
      balance,
      lastVisit: stats.lastVisit,
      invoiceCount: stats.invoiceCount,
    }
  })

  result.sort((a, b) => b.lastVisit.getTime() - a.lastVisit.getTime())

  return { customers: result }
})
