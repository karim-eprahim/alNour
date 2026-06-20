export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const existing = await prisma.productionBatch.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Production batch not found' })
  }

  const data: any = {}
  if (body.status) data.status = body.status
  if (body.laborCost !== undefined) data.laborCost = parseFloat(body.laborCost)
  if (body.otherCosts !== undefined) data.otherCosts = parseFloat(body.otherCosts)
  if (body.notes !== undefined) data.notes = body.notes

  if (data.laborCost !== undefined || data.otherCosts !== undefined) {
    data.rawMaterialsCost = existing.rawMaterialsCost.toNumber()
    data.totalBatchCost = data.rawMaterialsCost + (data.laborCost ?? existing.laborCost.toNumber()) + (data.otherCosts ?? existing.otherCosts.toNumber())
  }

  const batch = await prisma.productionBatch.update({
    where: { id },
    data,
    include: {
      warehouse: { select: { id: true, name: true } },
      consumptions: {
        include: { product: { select: { id: true, name: true, sku: true } } },
      },
      outputs: {
        include: { product: { select: { id: true, name: true, sku: true } } },
      },
    },
  })

  return { batch }
})
