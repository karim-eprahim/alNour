import { serializeLocation } from '~~/server/utils/tracking'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'GPS', 'READ')

  const id = getRouterParam(event, 'id')
  const query = getQuery(event)
  const limit = Math.min(parseInt(query.limit as string) || 2000, 5000)

  const tracking = await prisma.deliveryTracking.findUnique({
    where: { id },
    include: {
      salesOrder: {
        select: {
          id: true,
          orderNumber: true,
          status: true,
          customer: { select: { id: true, name: true, phone: true, address: true, latitude: true, longitude: true } },
          assignedDistributor: { select: { id: true, name: true } },
        },
      },
    },
  })

  if (!tracking) {
    throw createError({ statusCode: 404, statusMessage: 'Tracking session not found' })
  }

  const locations = await prisma.deliveryLocation.findMany({
    where: { deliveryTrackingId: id },
    orderBy: { recordedAt: 'asc' },
    take: limit,
  })

  const order = tracking.salesOrder
  return {
    tracking: {
      id: tracking.id,
      status: tracking.status,
      startedAt: tracking.startedAt,
      endedAt: tracking.endedAt,
      lastUpdatedAt: tracking.lastUpdatedAt,
      distributor: {
        id: order.assignedDistributor?.id ?? '',
        name: order.assignedDistributor?.name ?? 'Distributor',
      },
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
      },
      customer: {
        id: order.customer.id,
        name: order.customer.name,
        phone: order.customer.phone,
        address: order.customer.address,
        latitude: order.customer.latitude,
        longitude: order.customer.longitude,
      },
    },
    locations: locations.map(serializeLocation),
    total: locations.length,
    limit,
  }
})