
export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'UPDATE')

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const rejectionReason = (body.rejectionReason || '').trim()

  if (!rejectionReason) {
    throw createError({ statusCode: 400, statusMessage: 'Rejection reason is required' })
  }

  const settlement = await prisma.$transaction(async (tx) => {
    const existing = await tx.settlement.findUnique({ where: { id } })

    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: 'Settlement not found' })
    }

    if (existing.status !== 'SUBMITTED') {
      throw createError({
        statusCode: 400,
        statusMessage: `Settlement cannot be rejected from status ${existing.status}`,
      })
    }

    // Atomic conditional update guards against double processing.
    const claimed = await tx.settlement.updateMany({
      where: { id, status: 'SUBMITTED' },
      data: {
        status: 'REJECTED',
        rejectionReason,
      },
    })

    if (claimed.count === 0) {
      throw createError({ statusCode: 400, statusMessage: 'Settlement has already been processed' })
    }

    return tx.settlement.findUnique({
      where: { id },
      include: {
        distributor: { select: { id: true, name: true } },
        confirmedByUser: { select: { id: true, name: true } },
      },
    })
  })

  return { settlement: serializeSettlement(settlement!) }
})
