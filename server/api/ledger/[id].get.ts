export default defineEventHandler(async (event) => {
  // await requirePermission(event, 'LEDGER', 'READ')
  const id = getRouterParam(event, 'id')

  const entry = await prisma.ledgerEntry.findUnique({
    where: { id },
    include: {
      customer: { select: { id: true, name: true } },
      supplier: { select: { id: true, name: true } },
      worker: { select: { id: true, name: true } },
      distributor: { select: { id: true, name: true } },
    },
  })

  if (!entry) {
    throw createError({ statusCode: 404, statusMessage: 'Ledger entry not found' })
  }

  return { entry }
})
