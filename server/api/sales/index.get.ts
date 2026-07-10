export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'READ')
  const query = getQuery(event)
  const where: any = {}

  if (query.warehouseId) {
    await validateWarehouseAccess(event, query.warehouseId as string)
    where.warehouseId = query.warehouseId
  } else {
    const warehouseIds = await getAccessibleWarehouseIds(event)
    if (warehouseIds !== null) {
      where.warehouseId = { in: warehouseIds }
    }
  }
  if (query.customerId) where.customerId = query.customerId
  if (query.status) where.status = query.status
  if (query.search) {
    where.OR = [
      { orderNumber: { contains: query.search, mode: 'insensitive' } },
      { customer: { name: { contains: query.search, mode: 'insensitive' } } },
    ]
  }
  if (query.startDate) {
    where.createdAt = { ...(where.createdAt || {}), gte: new Date(query.startDate as string) }
  }
  if (query.endDate) {
    where.createdAt = { ...(where.createdAt || {}), lte: new Date(query.endDate as string) }
  }

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 20
  const skip = (page - 1) * limit

  const [orders, total] = await Promise.all([
    prisma.salesOrder.findMany({
      where,
      include: {
        customer: { select: { id: true, name: true } },
        warehouse: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true } },
        items: {
          include: { product: { select: { id: true, name: true, sku: true } } },
        },
        invoices: { select: { id: true, invoiceNumber: true, status: true, paidAmount: true, totalAmount: true } },
        _count: { select: { items: true, invoices: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.salesOrder.count({ where }),
  ])

  return { orders, total, page, limit }
})
