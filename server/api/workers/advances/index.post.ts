export default defineEventHandler(async (event) => {
  await requirePermission(event, 'WORKERS', 'CREATE')
  const body = await readBody(event)

  if (!body.workerId || !body.amount) {
    throw createError({ statusCode: 400, statusMessage: 'workerId and amount are required' })
  }

  const worker = await prisma.worker.findUnique({ where: { id: body.workerId } })
  if (!worker) {
    throw createError({ statusCode: 404, statusMessage: 'Worker not found' })
  }

  const advance = await prisma.workerAdvance.create({
    data: {
      workerId: body.workerId,
      amount: parseFloat(body.amount),
      date: body.date ? new Date(body.date) : new Date(),
      notes: body.notes || null,
    },
    include: { worker: { select: { id: true, name: true } } },
  })

  return { advance }
})
