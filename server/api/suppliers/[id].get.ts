export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SUPPLIERS', 'READ')
  const id = getRouterParam(event, 'id')

  const supplier = await prisma.supplier.findUnique({
    where: { id },
    include: {
      _count: { select: { purchaseInvoices: true, ledgerEntries: true } },
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

  const [debitAgg, creditAgg, purchaseAgg] = await Promise.all([
    prisma.ledgerEntry.aggregate({ where: { supplierId: id, type: 'DEBIT' }, _sum: { amount: true } }),
    prisma.ledgerEntry.aggregate({ where: { supplierId: id, type: 'CREDIT' }, _sum: { amount: true } }),
    prisma.purchaseInvoice.aggregate({ where: { supplierId: id }, _sum: { totalAmount: true, paidAmount: true } }),
  ])

  const balance = Number(debitAgg._sum.amount || 0) - Number(creditAgg._sum.amount || 0)
  const totalPurchases = Number(purchaseAgg._sum.totalAmount || 0)
  const totalPaid = Number(purchaseAgg._sum.paidAmount || 0)

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
      totalPurchases,
      totalPaid,
      linkedCustomer: linkedCustomer
        ? { id: linkedCustomer.id, name: linkedCustomer.name, balance: linkedCustomerBalance }
        : null,
      netBalance,
    },
  }
})
