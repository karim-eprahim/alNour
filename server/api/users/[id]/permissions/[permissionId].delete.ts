export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id')
  const permissionId = getRouterParam(event, 'permissionId')
  if (!userId) throw createError({ statusCode: 400, statusMessage: 'User ID is required' })
  if (!permissionId) throw createError({ statusCode: 400, statusMessage: 'Permission ID is required' })

  const existing = await prisma.userPermission.findUnique({
    where: { userId_permissionId: { userId, permissionId } },
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'User permission not found' })
  }

  await prisma.userPermission.delete({
    where: { userId_permissionId: { userId, permissionId } },
  })

  return { success: true }
})
