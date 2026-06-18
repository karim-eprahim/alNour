export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const existing = await prisma.permission.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Permission not found' })
  }

  await prisma.permission.delete({ where: { id } })
  return { success: true }
})
