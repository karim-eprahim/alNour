export default defineEventHandler(async (event) => {
  await requirePermission(event, 'WORKERS', 'CREATE')
  const body = await readBody(event)

  if (!body.productionBatchId || !body.records?.length) {
    throw createError({ statusCode: 400, statusMessage: 'productionBatchId and records array are required' })
  }

  const batch = await prisma.productionBatch.findUnique({ where: { id: body.productionBatchId } })
  if (!batch) {
    throw createError({ statusCode: 404, statusMessage: 'Production batch not found' })
  }

  await validateWarehouseAccess(event, batch.warehouseId)

  const date = body.date ? new Date(body.date) : new Date()
  date.setHours(0, 0, 0, 0)

  const dailyWages = await prisma.$transaction(async (tx) => {
    for (const record of body.records) {
      const existing = await tx.workerDailyWage.findFirst({
        where: {
          workerId: record.workerId,
          productionBatchId: body.productionBatchId,
          date,
        },
      })
      if (existing) {
        await tx.workerDailyWage.update({
          where: { id: existing.id },
          data: { dailyWage: parseFloat(record.dailyWage), notes: record.notes || null },
        })
      } else {
        await tx.workerDailyWage.create({
          data: {
            workerId: record.workerId,
            productionBatchId: body.productionBatchId,
            dailyWage: parseFloat(record.dailyWage),
            notes: record.notes || null,
            date,
          },
        })
      }
    }

    const agg = await tx.workerDailyWage.aggregate({
      where: { productionBatchId: body.productionBatchId },
      _sum: { dailyWage: true },
    })
    const totalLabor = agg._sum.dailyWage?.toNumber() || 0

    await tx.productionBatch.update({
      where: { id: body.productionBatchId },
      data: {
        laborCost: totalLabor,
        totalBatchCost: batch.rawMaterialsCost.toNumber() + totalLabor + batch.otherCosts.toNumber(),
      },
    })

    return tx.workerDailyWage.findMany({
      where: { productionBatchId: body.productionBatchId },
      include: { worker: { select: { id: true, name: true, role: true } } },
    })
  })

  return { dailyWages }
})
