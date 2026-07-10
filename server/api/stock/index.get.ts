export default defineEventHandler(async (event) => {
  await requirePermission(event, 'INVENTORY', 'READ')
  const query = getQuery(event)
  const where: any = {}

  if (query.warehouseId) where.warehouseId = query.warehouseId
  if (query.productId) where.productId = query.productId
  if (query.lowStock) {
    where.quantity = { lte: parseFloat(query.lowStock as string) }
  }

  const [stocks, total] = await Promise.all([
    prisma.stock.findMany({
      where,
      include: {
        product: true,
        warehouse: true,
      },
      orderBy: [
        { warehouse: { name: 'asc' } },
        { product: { name: 'asc' } },
      ],
    }),
    prisma.stock.count({ where }),
  ])

  return { stocks, total }
})
