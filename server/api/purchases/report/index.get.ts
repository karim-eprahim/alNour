export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const where: any = {}

  if (query.supplierId) where.supplierId = query.supplierId
  if (query.warehouseId) where.warehouseId = query.warehouseId
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
    },
    orderBy: { invoiceDate: 'desc' },
  })

  const summary = {
    totalInvoices: invoices.length,
    totalAmount: invoices.reduce((s, i) => s + Number(i.totalAmount), 0),
    totalPaid: invoices.reduce((s, i) => s + Number(i.paidAmount), 0),
    totalDue: invoices.reduce((s, i) => s + Number(i.totalAmount) - Number(i.paidAmount), 0),
    totalItems: invoices.reduce((s, i) => s + i.items.reduce((si, item) => si + Number(item.quantity), 0), 0),
  }

  return { invoices, summary }
})
