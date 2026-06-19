export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const where: any = {}

  if (query.status) where.status = query.status

  const [transfers, total] = await Promise.all([
    prisma.stockTransfer.findMany({
      where,
      include: {
        fromWarehouse: { select: { id: true, name: true } },
        toWarehouse: { select: { id: true, name: true } },
        items: { include: { product: { select: { id: true, name: true, sku: true } } } },
        createdBy: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.stockTransfer.count({ where }),
  ])

  return { transfers, total }
})
