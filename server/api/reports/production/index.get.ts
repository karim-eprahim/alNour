export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const where: any = {}

  if (query.warehouseId) where.warehouseId = query.warehouseId
  if (query.status) where.status = query.status
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
  let totalRawMaterialsCost = 0
  let totalLaborCost = 0
  let totalOtherCosts = 0
  let totalCost = 0

  const statusCounts: Record<string, number> = {}

  for (const b of batches) {
    statusCounts[b.status] = (statusCounts[b.status] || 0) + 1
    for (const c of b.consumptions) {
      totalConsumption += c.quantity.toNumber()
    }
    for (const o of b.outputs) {
      totalOutput += o.quantity.toNumber()
      totalWaste += o.waste.toNumber()
    }
    totalRawMaterialsCost += b.rawMaterialsCost.toNumber()
    totalLaborCost += b.laborCost.toNumber()
    totalOtherCosts += b.otherCosts.toNumber()
    totalCost += b.totalBatchCost.toNumber()
  }

  const wastePercentage = (totalOutput + totalWaste) > 0 ? (totalWaste / (totalOutput + totalWaste)) * 100 : 0
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
      totalRawMaterialsCost,
      totalLaborCost,
      totalOtherCosts,
      averageCostPerUnit,
      statusCounts,
    },
  }
})
