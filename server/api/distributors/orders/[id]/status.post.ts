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

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const targetStatus = body.status as string

  if (!VALID_TARGETS.has(targetStatus)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid target status' })
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

  const updated = await prisma.salesOrder.update({ where: { id }, data })

  return { order: { id: updated.id, status: updated.status } }
})
