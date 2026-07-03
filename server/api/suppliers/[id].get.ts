export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const supplier = await prisma.supplier.findUnique({
    where: { id },
    include: {
      purchaseInvoices: {
        include: {
          items: { include: { product: true } },
          weightTickets: true,
          warehouse: true,
        },
        orderBy: { createdAt: 'desc' },
      },
      ledgerEntries: {
        orderBy: { createdAt: 'desc' },
        take: 100,
      },
      linkedCustomer: {
        include: {
          ledgerEntries: { select: { amount: true, type: true } },
        },
      },
    },
  })

  if (!supplier) {
    throw createError({ statusCode: 404, statusMessage: 'Supplier not found' })
  }

  const balance = supplier.ledgerEntries.reduce((acc, entry) => {
    return entry.type === 'DEBIT' ? acc + Number(entry.amount) : acc - Number(entry.amount)
  }, 0)

  let linkedCustomerBalance = 0
  let netBalance = balance
  if (supplier.linkedCustomer) {
    linkedCustomerBalance = supplier.linkedCustomer.ledgerEntries.reduce((acc, entry) => {
      return entry.type === 'DEBIT' ? acc + Number(entry.amount) : acc - Number(entry.amount)
    }, 0)
    netBalance = balance - linkedCustomerBalance
  }

  const { linkedCustomer, ...rest } = supplier
  return {
    supplier: {
      ...rest,
      balance,
      linkedCustomer: linkedCustomer
        ? { id: linkedCustomer.id, name: linkedCustomer.name, balance: linkedCustomerBalance }
        : null,
      netBalance,
    },
  }
})
