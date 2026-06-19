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
    },
  })

  if (!supplier) {
    throw createError({ statusCode: 404, statusMessage: 'Supplier not found' })
  }

  const balance = supplier.ledgerEntries.reduce((acc, entry) => {
    return entry.type === 'DEBIT' ? acc + Number(entry.amount) : acc - Number(entry.amount)
  }, 0)

  return { supplier: { ...supplier, balance } }
})
