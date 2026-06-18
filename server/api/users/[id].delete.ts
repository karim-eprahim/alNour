export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const existing = await prisma.user.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  await prisma.user.delete({ where: { id } })

  return { success: true }
})
