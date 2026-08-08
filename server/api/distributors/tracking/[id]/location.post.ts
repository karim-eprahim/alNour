import { getActiveTrackingForEvent, validateTrackedLocation, serializeLocation } from '~~/server/utils/tracking'

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'GPS', 'UPDATE')

  const trackingId = getRouterParam(event, 'id')
  const body = await readBody(event)

  const input = validateTrackedLocation(body)
  if (!trackingId) {
    throw createError({ statusCode: 400, statusMessage: 'Tracking id is required' })
  }

  // Enforce distributor ownership + active session + valid order state.
  const tracking = await getActiveTrackingForEvent(event, trackingId)

  if (tracking.status !== 'ACTIVE') {
    throw createError({ statusCode: 400, statusMessage: 'Tracking session is not active' })
  }
  if (tracking.salesOrder.status !== 'OUT_FOR_DELIVERY') {
    throw createError({ statusCode: 400, statusMessage: 'Order is not in a trackable state' })
  }

  const result = await prisma.$transaction(async (tx) => {
    const recordedAt = input.recordedAt || new Date()
    const created = await tx.deliveryLocation.create({
      data: {
        deliveryTrackingId: trackingId,
        latitude: input.latitude,
        longitude: input.longitude,
        accuracy: input.accuracy ?? null,
        speed: input.speed ?? null,
        heading: input.heading ?? null,
        recordedAt,
      },
    })

    // Never let an out-of-order / delayed GPS point move lastUpdatedAt backwards.
    const now = new Date()
    if (now > tracking.lastUpdatedAt) {
      await tx.deliveryTracking.update({
        where: { id: trackingId },
        data: { lastUpdatedAt: now },
      })
    }

    return created
  })

  const lastUpdatedAt = result.recordedAt > tracking.lastUpdatedAt
    ? result.recordedAt
    : tracking.lastUpdatedAt

  return { location: serializeLocation(result), lastUpdatedAt }
})