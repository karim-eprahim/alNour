export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PRODUCTION', 'READ')
  const id = getRouterParam(event, 'id')
  const batch = await prisma.productionBatch.findUnique({
    where: { id },
    include: {
      warehouse: { select: { id: true, name: true } },
      consumptions: {
        include: { product: { select: { id: true, name: true, sku: true, type: true, purchaseCost: true } } },
      },
      outputs: {
        include: { product: { select: { id: true, name: true, sku: true, type: true, purchaseCost: true } } },
      },
      workerDailyWages: {
        include: { worker: { select: { id: true, name: true, role: true } } },
        orderBy: { date: 'desc' },
      },
    },
  })
  if (!batch) {
    throw createError({ statusCode: 404, statusMessage: 'Production batch not found' })
  }
  return { batch }
})
