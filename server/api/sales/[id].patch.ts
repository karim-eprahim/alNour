const STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['ASSIGNED', 'CANCELLED'],
  ASSIGNED: ['ACCEPTED', 'CANCELLED'],
  ACCEPTED: ['OUT_FOR_DELIVERY', 'CANCELLED'],
  OUT_FOR_DELIVERY: ['DELIVERED', 'CANCELLED'],
  DELIVERED: ['COMPLETED', 'CANCELLED'],
  COMPLETED: ['CANCELLED'],
  CANCELLED: [],
}

function isValidTransition(from: string, to: string): boolean {
  const allowed = STATUS_TRANSITIONS[from]
  return allowed ? allowed.includes(to) : false
}

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'UPDATE')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const existing = await prisma.salesOrder.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Sales order not found' })
  }

  await validateWarehouseAccess(event, existing.warehouseId)

  const data: any = {}
  if (body.status) {
    if (!isValidTransition(existing.status, body.status)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid status transition from ${existing.status} to ${body.status}`,
      })
    }
    data.status = body.status
  }
  if (body.assignedDistributorId !== undefined) {
    if (body.assignedDistributorId) {
      const distributor = await prisma.user.findUnique({
        where: { id: body.assignedDistributorId },
        select: { id: true, role: { select: { name: true } } },
      })
      if (!distributor || distributor.role?.name !== 'DISTRIBUTOR') {
        throw createError({ statusCode: 400, statusMessage: 'Invalid distributor' })
      }
    }
    data.assignedDistributorId = body.assignedDistributorId || null
  }
  if (body.saleSource) data.saleSource = body.saleSource

  const order = await prisma.salesOrder.update({
    where: { id },
    data,
    include: {
      customer: { select: { id: true, name: true } },
      warehouse: { select: { id: true, name: true } },
      assignedDistributor: { select: { id: true, name: true } },
      items: { include: { product: { select: { id: true, name: true, sku: true } } } },
    },
  })
  return { order }
})
