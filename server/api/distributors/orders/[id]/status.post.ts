const TRANSITIONS: Record<string, string> = {
  ASSIGNED: 'ACCEPTED',
  ACCEPTED: 'OUT_FOR_DELIVERY',
}

const VALID_TARGETS = new Set(Object.values(TRANSITIONS))

const TIMESTAMPS: Record<string, string> = {
  ACCEPTED: 'acceptedAt',
  OUT_FOR_DELIVERY: 'outForDeliveryAt',
}

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'SALES', 'UPDATE')

  let id = getRouterParam(event, 'id') || ''
  const body = await readBody(event)
  const targetStatus = body.status as string

  if (!VALID_TARGETS.has(targetStatus)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid target status' })
  }
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Order id is required' })
  }

  const order = await prisma.salesOrder.findFirst({
    where: { id, assignedDistributorId: auth.userId, status: { not: 'PENDING' } },
  })

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Order not found' })
  }

  if (TRANSITIONS[order.status] !== targetStatus) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid status transition from ${order.status} to ${targetStatus}`,
    })
  }

  const timestampField = TIMESTAMPS[targetStatus]
  const data: any = { status: targetStatus }
  if (timestampField) data[timestampField] = new Date()

  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.salesOrder.update({ where: { id }, data })

    let tracking: any = null
    if (targetStatus === 'OUT_FOR_DELIVERY') {
      const existing = await tx.deliveryTracking.findFirst({
        where: { salesOrderId: id, status: 'ACTIVE' },
      })
      if (existing) {
        throw createError({ statusCode: 409, statusMessage: 'A tracking session is already active for this order' })
      }
      tracking = await tx.deliveryTracking.create({
        data: {
          salesOrderId: id,
          distributorId: auth.userId,
          status: 'ACTIVE',
          startedAt: new Date(),
          lastUpdatedAt: new Date(),
        },
      })
    }

    return { updated, tracking }
  })

  return {
    order: { id: result.updated.id, status: result.updated.status },
    tracking: result.tracking
      ? { id: result.tracking.id, status: result.tracking.status }
      : null,
  }
})