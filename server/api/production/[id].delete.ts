export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const existing = await prisma.productionBatch.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Production batch not found' })
  }
  await prisma.productionBatch.delete({ where: { id } })
  return { success: true }
})
