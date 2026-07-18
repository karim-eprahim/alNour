export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PURCHASES', 'READ')
  const query = getQuery(event)
  const where: any = {}

  const warehouseIds = await getAccessibleWarehouseIds(event)
  if (warehouseIds !== null) {
    where.purchaseInvoice = {
      warehouseId: { in: warehouseIds },
    }
  }

  if (query.purchaseInvoiceId) where.purchaseInvoiceId = query.purchaseInvoiceId

  const limit = parseInt(query.limit as string) || 50
  const page = parseInt(query.page as string) || 1
  const skip = (page - 1) * limit

  const [tickets, total] = await Promise.all([
    prisma.weightTicket.findMany({
      where,
      include: {
        purchaseInvoice: {
          select: {
            invoiceNumber: true,
            warehouseId: true,
            supplier: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.weightTicket.count({ where }),
  ])

  return { tickets, total, page, limit }
})
