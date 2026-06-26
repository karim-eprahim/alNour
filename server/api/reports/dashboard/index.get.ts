export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  const userRole: string = auth.userRole

  const isStorekeeper = userRole === 'STOREKEEPER'
  const isAccountant = userRole === 'ACCOUNTANT'
  const isAdmin = userRole === 'ADMIN' || userRole === 'MANAGER'
  const canViewFinancial = isAdmin || isAccountant
  const canViewStock = isAdmin || isStorekeeper

  const data: any = {}

  // Stock data (visible to STOREKEEPER, MANAGER, ADMIN)
  if (canViewStock) {
    const stocks = await prisma.stock.findMany({
      include: {
        warehouse: { select: { id: true, name: true } },
        product: { select: { id: true, name: true, sku: true, type: true } },
      },
    })
    const lowStock = stocks.filter((s) => s.quantity.toNumber() <= 0)
    const totalQty = stocks.reduce((s, i) => s + i.quantity.toNumber(), 0)

    data.stockSummary = {
      totalStockItems: stocks.length,
      totalQuantity: totalQty,
      lowStockCount: lowStock.length,
      lowStockItems: lowStock.slice(0, 5),
    }

    const recentMovements = await prisma.stockMovement.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        product: { select: { id: true, name: true } },
        warehouse: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true } },
      },
    })
    data.recentMovements = recentMovements

    const warehouses = await prisma.warehouse.findMany({
      select: { id: true, name: true, _count: { select: { stocks: true } } },
    })
    data.warehouses = warehouses
  }

  // Production data (visible to all)
  const batches = await prisma.productionBatch.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      warehouse: { select: { id: true, name: true } },
      _count: { select: { outputs: true, consumptions: true } },
    },
  })
  const batchStatusCounts = await prisma.productionBatch.groupBy({
    by: ['status'],
    _count: true,
  })
  data.productionSummary = {
    recentBatches: batches,
    batchStatusCounts,
  }

  // Financial data (visible to ADMIN, MANAGER, ACCOUNTANT)
  if (canViewFinancial) {
    const invoiceAgg = await prisma.invoice.aggregate({
      _sum: { totalAmount: true, paidAmount: true },
      where: { status: { not: 'CANCELLED' } },
    })
    data.financialSummary = {
      totalRevenue: invoiceAgg._sum.totalAmount?.toNumber() || 0,
      totalCollected: invoiceAgg._sum.paidAmount?.toNumber() || 0,
    }

    const expenseAgg = await prisma.expense.aggregate({
      _sum: { amount: true },
    })
    data.totalExpenses = expenseAgg._sum.amount?.toNumber() || 0

    const wageAgg = await prisma.workerDailyWage.aggregate({
      _sum: { dailyWage: true },
    })
    data.totalLaborCost = wageAgg._sum.dailyWage?.toNumber() || 0

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)

    const todayProduction = await prisma.productionBatch.findMany({
      where: { createdAt: { gte: todayStart, lte: todayEnd } },
      select: { totalBatchCost: true },
    })
    data.todayProductionCost = todayProduction.reduce((s, b) => s + b.totalBatchCost.toNumber(), 0)

    const workers = await prisma.worker.count({ where: { isActive: true } })
    data.activeWorkers = workers
  }

  // Worker summary (visible to all)
  const workerCount = await prisma.worker.count()
  data.totalWorkers = workerCount

  // Product summary (visible to all)
  const productCount = await prisma.product.count()
  data.totalProducts = productCount

  // Customer/supplier counts (visible to ADMIN, MANAGER, ACCOUNTANT)
  if (canViewFinancial || isAdmin) {
    const customerCount = await prisma.customer.count()
    const supplierCount = await prisma.supplier.count()
    data.customerCount = customerCount
    data.supplierCount = supplierCount
  }

  data.userRole = userRole

  return data
})
