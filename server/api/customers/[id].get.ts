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
      linkedSupplier: {
        include: {
          ledgerEntries: { select: { amount: true, type: true } },
        },
      },
    },
  })
  if (!customer) {
    throw createError({ statusCode: 404, statusMessage: 'Customer not found' })
  }
  const balance = customer.ledgerEntries.reduce((sum, e) => {
    return e.type === 'DEBIT' ? sum + e.amount.toNumber() : sum - e.amount.toNumber()
  }, 0)

  let linkedSupplierBalance = 0
  let netBalance = balance
  if (customer.linkedSupplier) {
    linkedSupplierBalance = customer.linkedSupplier.ledgerEntries.reduce((sum, e) => {
      return e.type === 'DEBIT' ? sum + Number(e.amount) : sum - Number(e.amount)
    }, 0)
    netBalance = balance - linkedSupplierBalance
  }

  const { linkedSupplier, ...rest } = customer
  return {
    customer: {
      ...rest,
      balance,
      linkedSupplier: linkedSupplier
        ? { id: linkedSupplier.id, name: linkedSupplier.name, balance: linkedSupplierBalance }
        : null,
      netBalance,
    },
  }
})
