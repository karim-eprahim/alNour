export default defineEventHandler(async (event) => {
  // await requirePermission(event, 'LEDGER', 'UPDATE')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const existing = await prisma.ledgerEntry.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Ledger entry not found' })
  }

  const data: any = {}

  if (body.amount !== undefined) {
    data.amount = parseFloat(body.amount)
  }
  if (body.type !== undefined) {
    if (!['DEBIT', 'CREDIT'].includes(body.type)) {
      throw createError({ statusCode: 400, statusMessage: 'Type must be DEBIT or CREDIT' })
    }
    data.type = body.type
  }
  if (body.description !== undefined) {
    data.description = body.description
  }

  if (body.customerId || body.supplierId || body.workerId || body.distributorId) {
    const ownerFilter = getOwnerFilter(body)
    Object.assign(data, ownerFilter)
  }

  const entry = await prisma.ledgerEntry.update({
    where: { id },
    data,
    include: {
      customer: { select: { id: true, name: true } },
      supplier: { select: { id: true, name: true } },
      worker: { select: { id: true, name: true } },
      distributor: { select: { id: true, name: true } },
    },
  })

  return { entry }
})
