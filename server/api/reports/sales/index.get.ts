export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'READ')
  const query = getQuery(event)
  const where: any = { status: { not: 'CANCELLED' as const } }

  const warehouseIds = await getAccessibleWarehouseIds(event)
  if (warehouseIds !== null) {
    where.salesOrder = { warehouseId: { in: warehouseIds } }
  }

  if (query.startDate) {
    where.createdAt = { ...(where.createdAt || {}), gte: new Date(query.startDate as string) }
  }
  if (query.endDate) {
    where.createdAt = { ...(where.createdAt || {}), lte: new Date(query.endDate as string) }
  }
  if (query.customerId) where.customerId = query.customerId

  const invoices = await prisma.invoice.findMany({
    where,
    include: {
      customer: { select: { id: true, name: true } },
      salesOrder: {
        select: { items: { include: { product: { select: { id: true, name: true, sku: true } } } } },
      },
      payments: { select: { id: true, amount: true, paymentMethod: true, createdAt: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const totalRevenue = invoices.reduce((s, i) => s + i.totalAmount.toNumber(), 0)
  const totalPaid = invoices.reduce((s, i) => s + i.paidAmount.toNumber(), 0)
  const totalDue = totalRevenue - totalPaid

  const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {}
  for (const inv of invoices) {
    for (const item of inv.salesOrder?.items || []) {
      const pid = item.productId
      if (!productSales[pid]) {
        productSales[pid] = { name: item.product?.name || pid, quantity: 0, revenue: 0 }
      }
      productSales[pid].quantity += item.quantity.toNumber()
      productSales[pid].revenue += item.totalPrice.toNumber()
    }
  }

  const topProducts = Object.entries(productSales)
    .map(([id, data]) => ({ productId: id, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10)

  const customerBalances = await prisma.customer.findMany({
    select: {
      id: true,
      name: true,
      invoices: {
        where: { status: { not: 'CANCELLED' } },
        select: { totalAmount: true, paidAmount: true, status: true },
      },
    },
  })

  const customerDues = customerBalances
    .map((c) => {
      const total = c.invoices.reduce((s, i) => s + i.totalAmount.toNumber(), 0)
      const paid = c.invoices.reduce((s, i) => s + i.paidAmount.toNumber(), 0)
      return { id: c.id, name: c.name, totalDue: total, totalPaid: paid, outstanding: total - paid }
    })
    .filter((c) => c.outstanding > 0)
    .sort((a, b) => b.outstanding - a.outstanding)

  return {
    invoices,
    summary: {
      totalInvoices: invoices.length,
      totalRevenue,
      totalPaid,
      totalDue,
    },
    topProducts,
    customerDues,
  }
})
