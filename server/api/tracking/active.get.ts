import { serializeLocation } from '~~/server/utils/tracking'

const sessionInclude = {
  salesOrder: {
    select: {
      id: true,
      orderNumber: true,
      status: true,
      customer: { select: { id: true, name: true, phone: true, address: true, latitude: true, longitude: true } },
      assignedDistributor: { select: { id: true, name: true, phone: true } },
    },
  },
  locations: { orderBy: { recordedAt: 'desc' }, take: 1 },
} as const

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'GPS', 'READ')

  const sessions = await prisma.deliveryTracking.findMany({
    where: { status: 'ACTIVE' },
    include: sessionInclude,
    orderBy: { lastUpdatedAt: 'desc' },
  })

  return {
    trackings: sessions.map((session) => {
      const order = session.salesOrder
      const distributor = order.assignedDistributor
      const currentLocation = serializeLocation(session.locations[0] || null)

      return {
        trackingId: session.id,
        status: session.status,
        startedAt: session.startedAt,
        lastUpdatedAt: session.lastUpdatedAt,
        distributor: {
          id: distributor?.id ?? '',
          name: distributor?.name ?? 'Distributor',
          phone: distributor?.phone ?? null,
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
        currentLocation: currentLocation,
      }
    }),
  }
})