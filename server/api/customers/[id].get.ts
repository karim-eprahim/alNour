export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      salesOrders: {
        include: {
          items: { include: { product: { select: { id: true, name: true, sku: true } } } },
          warehouse: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
      invoices: {
        include: {
          payments: { orderBy: { createdAt: 'desc' } },
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
      ledgerEntries: { orderBy: { createdAt: 'desc' }, take: 50 },
    },
  })
  if (!customer) {
    throw createError({ statusCode: 404, statusMessage: 'Customer not found' })
  }
  const balance = customer.ledgerEntries.reduce((sum, e) => {
    return e.type === 'DEBIT' ? sum + e.amount.toNumber() : sum - e.amount.toNumber()
  }, 0)
  return { customer: { ...customer, balance } }
})
