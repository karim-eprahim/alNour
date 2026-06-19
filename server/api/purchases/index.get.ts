export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const where: any = {}

  if (query.supplierId) where.supplierId = query.supplierId
  if (query.warehouseId) where.warehouseId = query.warehouseId
  if (query.search) {
    where.OR = [
      { invoiceNumber: { contains: query.search, mode: 'insensitive' } },
      { supplier: { name: { contains: query.search, mode: 'insensitive' } } },
    ]
  }
  if (query.startDate) {
    where.invoiceDate = { ...(where.invoiceDate || {}), gte: new Date(query.startDate as string) }
  }
  if (query.endDate) {
    where.invoiceDate = { ...(where.invoiceDate || {}), lte: new Date(query.endDate as string) }
  }

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 20
  const skip = (page - 1) * limit

  const [invoices, total] = await Promise.all([
    prisma.purchaseInvoice.findMany({
      where,
      include: {
        supplier: { select: { id: true, name: true, company: true } },
        warehouse: { select: { id: true, name: true } },
        items: {
          include: { product: { select: { id: true, name: true, sku: true } } },
        },
        weightTickets: true,
        _count: { select: { weightTickets: true, items: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.purchaseInvoice.count({ where }),
  ])

  return { invoices, total, page, limit }
})
