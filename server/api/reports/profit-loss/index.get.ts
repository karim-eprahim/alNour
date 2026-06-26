export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const startDate = query.startDate ? new Date(query.startDate as string) : new Date(new Date().getFullYear(), 0, 1)
  const endDate = query.endDate ? new Date(query.endDate as string) : new Date()

  const dateFilter = { gte: startDate, lte: endDate }

  // Revenue from confirmed invoices
  const invoices = await prisma.invoice.findMany({
    where: { createdAt: dateFilter, status: { not: 'CANCELLED' } },
    select: { totalAmount: true, paidAmount: true },
  })
  const totalRevenue = invoices.reduce((s, i) => s + i.totalAmount.toNumber(), 0)
  const totalRevenueCollected = invoices.reduce((s, i) => s + i.paidAmount.toNumber(), 0)
  const outstandingRevenue = totalRevenue - totalRevenueCollected

  // COGS = raw materials consumed in production batches
  const batches = await prisma.productionBatch.findMany({
    where: { createdAt: dateFilter, status: { not: 'CANCELLED' } },
    select: { rawMaterialsCost: true, laborCost: true, otherCosts: true, totalBatchCost: true },
  })
  const totalRawMaterialsCost = batches.reduce((s, b) => s + b.rawMaterialsCost.toNumber(), 0)

  // Labor costs (worker daily wages)
  const wageAgg = await prisma.workerDailyWage.aggregate({
    where: { date: dateFilter },
    _sum: { dailyWage: true },
  })
  const totalLaborCost = wageAgg._sum.dailyWage?.toNumber() || 0

  // Operating expenses
  const expenseAgg = await prisma.expense.aggregate({
    where: { date: dateFilter },
    _sum: { amount: true },
  })
  const totalExpenses = expenseAgg._sum.amount?.toNumber() || 0

  // Purchase costs (raw material purchases)
  const purchaseAgg = await prisma.purchaseInvoice.aggregate({
    where: { invoiceDate: dateFilter },
    _sum: { totalAmount: true, paidAmount: true },
  })
  const totalPurchaseCost = purchaseAgg._sum.totalAmount?.toNumber() || 0
  const totalPurchasePaid = purchaseAgg._sum.paidAmount?.toNumber() || 0

  const grossProfit = totalRevenue - totalRawMaterialsCost
  const netProfit = grossProfit - totalLaborCost - totalExpenses

  const expenseByCategory = await prisma.expense.groupBy({
    by: ['category'],
    where: { date: dateFilter },
    _sum: { amount: true },
  })

  return {
    summary: {
      period: { startDate, endDate },
      revenue: {
        totalRevenue,
        totalRevenueCollected,
        outstandingRevenue,
      },
      costOfGoodsSold: {
        rawMaterialsCost: totalRawMaterialsCost,
        purchaseCost: totalPurchaseCost,
        purchasePaid: totalPurchasePaid,
      },
      laborCost: totalLaborCost,
      operatingExpenses: totalExpenses,
      grossProfit,
      netProfit,
      expenseByCategory: expenseByCategory.map((e) => ({
        category: e.category,
        amount: e._sum.amount?.toNumber() || 0,
      })),
    },
  }
})
