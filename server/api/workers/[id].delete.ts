export default defineEventHandler(async (event) => {
  await requirePermission(event, 'WORKERS', 'DELETE')
  const id = getRouterParam(event, 'id')

  const existing = await prisma.worker.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Worker not found' })
  }

  await prisma.worker.delete({ where: { id } })

  return { success: true }
})
