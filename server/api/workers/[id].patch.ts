export default defineEventHandler(async (event) => {
  await requirePermission(event, 'WORKERS', 'UPDATE')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const existing = await prisma.worker.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Worker not found' })
  }

  const data: any = {}
  if (body.name !== undefined) data.name = body.name
  if (body.phone !== undefined) data.phone = body.phone
  if (body.role !== undefined) data.role = body.role
  if (body.defaultDailyWage !== undefined) data.defaultDailyWage = parseFloat(body.defaultDailyWage)
  if (body.isActive !== undefined) data.isActive = body.isActive

  const worker = await prisma.worker.update({
    where: { id },
    data,
  })

  return { worker }
})
