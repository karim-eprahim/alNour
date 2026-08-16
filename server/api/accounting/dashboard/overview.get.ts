export default defineEventHandler(async (event) => {
  await requirePermission(event, 'ACCOUNTING', 'READ')
  const query = getQuery(event)
  const { start, end } = parseDashboardPeriod(query)

  const warehouseIds = await getAccessibleWarehouseIds(event)

  const invoiceWhere: any = { createdAt: { gte: start, lte: end }, status: { not: 'CANCELLED' } }
  const productionWhere: any = { createdAt: { gte: start, lte: end }, status: { not: 'CANCELLED' } }
  if (warehouseIds !== null) {
    invoiceWhere.warehouseId = { in: warehouseIds }
    productionWhere.warehouseId = { in: warehouseIds }
  }

  const [invoices, batches, wages, expenses] = await Promise.all([
    prisma.invoice.findMany({ where: invoiceWhere, select: { createdAt: true, totalAmount: true } }),
    prisma.productionBatch.findMany({ where: productionWhere, select: { createdAt: true, rawMaterialsCost: true } }),
    prisma.workerDailyWage.findMany({ where: { date: { gte: start, lte: end } }, select: { date: true, dailyWage: true } }),
    prisma.expense.findMany({ where: { date: { gte: start, lte: end } }, select: { date: true, amount: true } }),
  ])

  const byMonth = new Map<string, { revenue: number; rawMaterials: number; labor: number; expenses: number }>()
  const ensure = (key: string) => {
    if (!byMonth.has(key)) {
      byMonth.set(key, { revenue: 0, rawMaterials: 0, labor: 0, expenses: 0 })
    }
    return byMonth.get(key)!
  }
  for (const invoice of invoices) ensure(monthKey(invoice.createdAt)).revenue += invoice.totalAmount.toNumber()
  for (const batch of batches) ensure(monthKey(batch.createdAt)).rawMaterials += batch.rawMaterialsCost.toNumber()
  for (const wage of wages) ensure(monthKey(wage.date)).labor += wage.dailyWage.toNumber()
  for (const expense of expenses) ensure(monthKey(expense.date)).expenses += expense.amount.toNumber()

  const months: string[] = []
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1)
  const lastMonth = new Date(end.getFullYear(), end.getMonth(), 1)
  while (cursor <= lastMonth) {
    months.push(monthKey(cursor))
    cursor.setMonth(cursor.getMonth() + 1)
  }

  const data = months.map((month) => {
    const m = byMonth.get(month) || { revenue: 0, rawMaterials: 0, labor: 0, expenses: 0 }
    const expensesTotal = m.rawMaterials + m.labor + m.expenses
    return {
      month,
      revenue: m.revenue,
      expenses: expensesTotal,
      profit: m.revenue - expensesTotal,
    }
  })

  return { data }
})