import type { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'READ')
  const query = getQuery(event)
  const { start, end } = parseDashboardPeriod(query)
  const limit = Math.min(Math.max(parseInt(query.limit as string, 10) || 8, 1), 20)

  const invoiceWhere: Prisma.InvoiceWhereInput = {
    status: { not: 'CANCELLED' },
    createdAt: { gte: start, lte: end },
  }

  const warehouseIds = await getAccessibleWarehouseIds(event)
  if (warehouseIds !== null) {
    invoiceWhere.warehouseId = { in: warehouseIds }
  }

  const grouped = await prisma.invoiceItem.groupBy({
    by: ['productId'],
    where: { invoice: invoiceWhere },
    _sum: { quantity: true, totalPrice: true },
    orderBy: { _sum: { totalPrice: 'desc' } },
    take: limit,
  })

  const products = await prisma.product.findMany({
    where: { id: { in: grouped.map(g => g.productId) } },
    select: { id: true, name: true },
  })
  const nameById = new Map(products.map(p => [p.id, p.name]))

  const data = grouped.map(g => ({
    product: nameById.get(g.productId) || g.productId,
    sales: g._sum.totalPrice?.toNumber() || 0,
    quantity: g._sum.quantity?.toNumber() || 0,
  }))

  return { data }
})
