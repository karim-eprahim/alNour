export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const existing = await prisma.role.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Role not found' })
  }

  const userCount = await prisma.user.count({ where: { roleId: id } })
  if (userCount > 0) {
    throw createError({ statusCode: 400, statusMessage: `Cannot delete role: ${userCount} user(s) are assigned to it` })
  }

  await prisma.role.delete({ where: { id } })
  return { success: true }
})
