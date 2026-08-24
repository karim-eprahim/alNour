import type { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'SALES', 'READ')
  const query = getQuery(event)
  const { start, end } = parseDashboardPeriod(query)

  const distributorId = (query.distributorId as string) || auth.userId
  if (distributorId !== auth.userId) {
    await requirePermission(event, 'USERS', 'READ')
  }

  const orderWhere: Prisma.SalesOrderWhereInput = {
    assignedDistributorId: distributorId,
    createdAt: { gte: start, lte: end },
  }

  const [statusGroups, orderCount, deliveredCount, invoiceAgg, completedOrders] = await Promise.all([
    prisma.salesOrder.groupBy({
      by: ['status'],
      where: orderWhere,
      _count: { _all: true },
    }),
    prisma.salesOrder.count({ where: orderWhere }),
    prisma.salesOrder.count({ where: { ...orderWhere, status: 'COMPLETED' } }),
    prisma.invoice.aggregate({
      _sum: { totalAmount: true },
      where: {
        createdById: distributorId,
        status: { not: 'CANCELLED' },
        createdAt: { gte: start, lte: end },
      },
    }),
    prisma.salesOrder.findMany({
      where: { ...orderWhere, status: 'COMPLETED' },
      select: { completedAt: true },
    }),
  ])

  const byDay = new Map<string, number>()
  for (const order of completedOrders) {
    if (!order.completedAt)
      continue
    const key = dayKey(order.completedAt)
    byDay.set(key, (byDay.get(key) || 0) + 1)
  }

  const deliveries: { date: string; delivered: number }[] = []
  const cursor = new Date(start)
  while (cursor <= end) {
    const key = dayKey(cursor)
    deliveries.push({ date: key, delivered: byDay.get(key) || 0 })
    cursor.setDate(cursor.getDate() + 1)
  }

  const salesAmount = invoiceAgg._sum.totalAmount?.toNumber() || 0

  return {
    orderStatus: statusGroups.map((group) => ({
      status: group.status,
      count: group._count._all,
    })),
    performance: {
      orders: orderCount,
      delivered: deliveredCount,
      salesAmount,
      deliveredRate: orderCount > 0 ? Math.round((deliveredCount / orderCount) * 100) : 0,
    },
    deliveries,
  }
})