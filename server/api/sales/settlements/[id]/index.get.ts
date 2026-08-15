
export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'READ')

  const id = getRouterParam(event, 'id')

  const settlement = await prisma.settlement.findUnique({
    where: { id },
    include: {
      distributor: { select: { id: true, name: true } },
      confirmedByUser: { select: { id: true, name: true } },
    },
  })

  if (!settlement) {
    throw createError({ statusCode: 404, statusMessage: 'Settlement not found' })
  }

  const custodySummary = await getDistributorCustody(prisma, settlement.distributorId)

  return {
    settlement: serializeSettlement(settlement),
    custodySummary,
  }
})
