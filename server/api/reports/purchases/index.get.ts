export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PURCHASES', 'READ')
  const query = getQuery(event)
  const where: any = {}

  const warehouseIds = await getAccessibleWarehouseIds(event)
  if (query.warehouseId) {
    await validateWarehouseAccess(event, query.warehouseId as string)
    where.warehouseId = query.warehouseId
  } else if (warehouseIds !== null) {
    where.warehouseId = { in: warehouseIds }
  }
  if (query.supplierId) where.supplierId = query.supplierId
  if (query.startDate) {
    where.invoiceDate = { ...(where.invoiceDate || {}), gte: new Date(query.startDate as string) }
  }
  if (query.endDate) {
    where.invoiceDate = { ...(where.invoiceDate || {}), lte: new Date(query.endDate as string) }
  }

  const invoices = await prisma.purchaseInvoice.findMany({
    where,
    include: {
      supplier: { select: { id: true, name: true, company: true } },
      warehouse: { select: { id: true, name: true } },
      items: {
        include: { product: { select: { id: true, name: true, sku: true, type: true } } },
      },
      weightTickets: { select: { id: true, netWeight: true, ticketNumber: true } },
    },
    orderBy: { invoiceDate: 'desc' },
  })

  const totalAmount = invoices.reduce((s, i) => s + i.totalAmount.toNumber(), 0)
  const totalPaid = invoices.reduce((s, i) => s + i.paidAmount.toNumber(), 0)
  const totalDue = totalAmount - totalPaid

  let totalRawQty = 0
  for (const inv of invoices) {
    for (const item of inv.items) {
      totalRawQty += item.quantity.toNumber()
    }
  }

  const totalWeightReceived = invoices.reduce(
    (s, i) => s + i.weightTickets.reduce((ws, wt) => ws + wt.netWeight.toNumber(), 0),
    0,
  )

  const supplierPayables = await prisma.supplier.findMany({
    select: {
      id: true,
      name: true,
      purchaseInvoices: {
        where: {
          ...(warehouseIds !== null ? { warehouseId: { in: warehouseIds } } : {}),
          ...(query.startDate ? { invoiceDate: { gte: new Date(query.startDate as string) } } : {}),
          ...(query.endDate ? { invoiceDate: { lte: new Date(query.endDate as string) } } : {}),
        },
        select: { totalAmount: true, paidAmount: true },
      },
    },
  })

  const supplierBalances = supplierPayables
    .map((s) => {
      const total = s.purchaseInvoices.reduce((sum, i) => sum + i.totalAmount.toNumber(), 0)
      const paid = s.purchaseInvoices.reduce((sum, i) => sum + i.paidAmount.toNumber(), 0)
      return { id: s.id, name: s.name, totalAmount: total, totalPaid: paid, outstanding: total - paid }
    })
    .filter((s) => s.outstanding > 0)
    .sort((a, b) => b.outstanding - a.outstanding)

  return {
    invoices,
    summary: {
      totalInvoices: invoices.length,
      totalAmount,
      totalPaid,
      totalDue,
      totalRawQty,
      totalWeightReceived,
    },
    supplierBalances,
  }
})
