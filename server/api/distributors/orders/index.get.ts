import type { Prisma } from '@prisma/client'

const orderInclude = {
  customer: { select: { id: true, name: true, phone: true, address: true, latitude: true, longitude: true } },
  items: {
    include: { product: { select: { id: true, name: true, sku: true } } },
  },
  invoices: {
    select: { id: true, invoiceNumber: true, status: true, totalAmount: true, paidAmount: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
    take: 1,
  },
  deliveryTracking: {
    include: { locations: { orderBy: { recordedAt: 'desc' }, take: 1 } },
  },
} satisfies Prisma.SalesOrderInclude

function serialize(order: any) {
  const tracking = order.deliveryTracking || null
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    totalAmount: order.totalAmount.toNumber(),
    createdAt: order.createdAt,
    expectedDeliveryDate: order.expectedDeliveryDate,
    priority: order.priority,
    deliveryNotes: order.deliveryNotes,
    deliveryResult: order.deliveryResult,
    partialDeliveryReason: order.partialDeliveryReason,
    cancelReason: order.cancelReason,
    acceptedAt: order.acceptedAt,
    outForDeliveryAt: order.outForDeliveryAt,
    completedAt: order.completedAt,
    customer: order.customer,
    items: order.items.map((item: any) => ({
      product: item.product,
      quantity: item.quantity.toNumber(),
      unitPrice: item.unitPrice.toNumber(),
      totalPrice: item.totalPrice.toNumber(),
    })),
    invoice: order.invoices[0] || null,
    tracking: tracking
      ? {
          id: tracking.id,
          status: tracking.status,
          startedAt: tracking.startedAt,
          endedAt: tracking.endedAt,
          lastUpdatedAt: tracking.lastUpdatedAt,
          location: tracking.locations[0]
            ? {
                latitude: tracking.locations[0].latitude,
                longitude: tracking.locations[0].longitude,
                accuracy: tracking.locations[0].accuracy,
                speed: tracking.locations[0].speed,
                heading: tracking.locations[0].heading,
                recordedAt: tracking.locations[0].recordedAt,
              }
            : null,
        }
      : null,
  }
}

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'SALES', 'READ')

  const query = getQuery(event)
  const distributorId = (query.distributorId as string) || auth.userId

  if (distributorId !== auth.userId) {
    await requirePermission(event, 'USERS', 'READ')
  }

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  const skip = (page - 1) * limit

  const where: any = {
    assignedDistributorId: distributorId,
    status: { not: 'PENDING' },
  }

  if (query.status) {
    const statuses = (query.status as string).split(',')
    where.status = { not: 'PENDING', in: statuses }
  }
  if (query.search) {
    where.OR = [
      { orderNumber: { contains: query.search, mode: 'insensitive' } },
      { customer: { name: { contains: query.search, mode: 'insensitive' } } },
    ]
  }

  const [orders, total, grouped] = await Promise.all([
    prisma.salesOrder.findMany({
      where,
      include: orderInclude,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.salesOrder.count({ where }),
    prisma.salesOrder.groupBy({
      by: ['status'],
      where,
      _count: { _all: true },
    }),
  ])

  const summary: Record<string, number> = {}
  for (const g of grouped) {
    summary[g.status] = g._count._all
  }

  return { orders: orders.map(serialize), total, page, limit, summary }
})
