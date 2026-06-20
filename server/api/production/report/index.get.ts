export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const where: any = { status: 'COMPLETED' }

  if (query.warehouseId) where.warehouseId = query.warehouseId
  if (query.startDate) {
    where.createdAt = { ...(where.createdAt || {}), gte: new Date(query.startDate as string) }
  }
  if (query.endDate) {
    where.createdAt = { ...(where.createdAt || {}), lte: new Date(query.endDate as string) }
  }

  const batches = await prisma.productionBatch.findMany({
    where,
    include: {
      warehouse: { select: { id: true, name: true } },
      consumptions: {
        include: { product: { select: { id: true, name: true, sku: true } } },
      },
      outputs: {
        include: { product: { select: { id: true, name: true, sku: true, type: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  let totalConsumption = 0
  let totalOutput = 0
  let totalWaste = 0
  let totalCost = 0

  for (const b of batches) {
    for (const c of b.consumptions) {
      totalConsumption += c.quantity.toNumber()
    }
    for (const o of b.outputs) {
      totalOutput += o.quantity.toNumber()
      totalWaste += o.waste.toNumber()
    }
    totalCost += b.totalBatchCost.toNumber()
  }

  const wastePercentage = totalOutput > 0 ? (totalWaste / (totalOutput + totalWaste)) * 100 : 0
  const averageCostPerUnit = totalOutput > 0 ? totalCost / totalOutput : 0

  return {
    batches,
    summary: {
      totalBatches: batches.length,
      totalOutput,
      totalConsumption,
      totalWaste,
      wastePercentage,
      totalCost,
      averageCostPerUnit,
    },
  }
})
