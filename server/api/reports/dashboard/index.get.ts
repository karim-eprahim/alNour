export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  const userRole: string = auth.userRole

  const isStorekeeper = userRole === 'STOREKEEPER'
  const isAccountant = userRole === 'ACCOUNTANT'
  const isAdmin = userRole === 'ADMIN' || userRole === 'MANAGER'
  const canViewFinancial = isAdmin || isAccountant || true
  const canViewStock = isAdmin || isStorekeeper || true

  const data: any = {
    userRole,
    financials: null,
    inventory: null,
    counts: {
      totalCustomers: 0,
      totalSuppliers: 0,
      totalWorkers: 0,
      totalProducts: 0,
    },
  }

  // ──────────────────────────────────────────────
  // 1. COUNTS — visible to everyone
  // ──────────────────────────────────────────────
  const [workerCount, productCount, customerCount, supplierCount] = await Promise.all([
    prisma.worker.count(),
    prisma.product.count(),
    prisma.customer.count(),
    prisma.supplier.count(),
  ])
  data.counts = {
    totalCustomers: customerCount,
    totalSuppliers: supplierCount,
    totalWorkers: workerCount,
    totalProducts: productCount,
  }

  // ──────────────────────────────────────────────
  // 2. FINANCIALS — ADMIN / MANAGER / ACCOUNTANT
  // ──────────────────────────────────────────────
  if (canViewFinancial) {
    const [invoiceAgg, cogsAgg, laborAgg, expenseAgg, recentExpenses, recentInvoices] =
      await Promise.all([
        prisma.invoice.aggregate({
          _sum: { totalAmount: true, paidAmount: true },
          where: { status: { not: 'CANCELLED' } },
        }),
        prisma.productionBatch.aggregate({
          _sum: { rawMaterialsCost: true },
          where: { status: { not: 'CANCELLED' } },
        }),
        prisma.workerDailyWage.aggregate({
          _sum: { dailyWage: true },
        }),
        prisma.expense.aggregate({
          _sum: { amount: true },
        }),
        prisma.expense.findMany({
          take: 5,
          orderBy: { date: 'desc' },
          select: { id: true, title: true, amount: true, category: true, date: true },
        }),
        prisma.invoice.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          where: { status: { not: 'CANCELLED' } },
          select: {
            id: true,
            invoiceNumber: true,
            totalAmount: true,
            paidAmount: true,
            status: true,
            createdAt: true,
            customer: { select: { id: true, name: true } },
          },
        }),
      ])

    const totalRevenue = invoiceAgg._sum.totalAmount?.toNumber() || 0
    const totalCollected = invoiceAgg._sum.paidAmount?.toNumber() || 0
    const totalCogs = cogsAgg._sum.rawMaterialsCost?.toNumber() || 0
    const totalLaborCosts = laborAgg._sum.dailyWage?.toNumber() || 0
    const totalExpenses = expenseAgg._sum.amount?.toNumber() || 0
    const grossProfit = totalRevenue - totalCogs
    const netProfit = grossProfit - totalLaborCosts - totalExpenses

    data.financials = {
      totalRevenue,
      totalCollected,
      totalCogs,
      totalLaborCosts,
      totalExpenses,
      grossProfit,
      netProfit,
      recentExpenses,
      recentInvoices,
    }
  }

  // ──────────────────────────────────────────────
  // 3. INVENTORY & WAREHOUSE — ADMIN / MANAGER / STOREKEEPER
  // ──────────────────────────────────────────────
  if (canViewStock) {
    const [stocks, movements, warehouseCount] = await Promise.all([
      prisma.stock.findMany({
        include: {
          warehouse: { select: { id: true, name: true } },
          product: { select: { id: true, name: true, sku: true, type: true, purchaseCost: true } },
        },
      }),
      prisma.stockMovement.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          product: { select: { id: true, name: true } },
          warehouse: { select: { id: true, name: true } },
          createdBy: { select: { id: true, name: true } },
        },
      }),
      prisma.warehouse.count(),
    ])

    const totalStockQuantity = stocks.reduce((s, st) => s + st.quantity.toNumber(), 0)
    const lowStockItems = stocks
      .filter((st) => st.quantity.toNumber() <= 0)
      .map((st) => ({
        id: st.id,
        productId: st.productId,
        productName: st.product.name,
        productSku: st.product.sku,
        warehouseName: st.warehouse.name,
        quantity: st.quantity.toNumber(),
      }))

    data.inventory = {
      totalStockQuantity,
      lowStockAlerts: {
        count: lowStockItems.length,
        items: lowStockItems.slice(0, 10),
      },
      recentMovements: movements.map((m) => ({
        id: m.id,
        productId: m.productId,
        productName: m.product.name,
        warehouseName: m.warehouse.name,
        type: m.type,
        quantity: m.quantity.toNumber(),
        notes: m.notes,
        createdAt: m.createdAt,
        createdByName: m.createdBy.name,
      })),
      warehouseCount,
    }
  }

  return data
})
