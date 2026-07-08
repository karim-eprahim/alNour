export default defineEventHandler(async (event) => {
  await requirePermission(event, 'USERS', 'UPDATE')
  const userId = getRouterParam(event, 'id')
  if (!userId) throw createError({ statusCode: 400, statusMessage: 'User ID is required' })

  const { permissionId } = await readBody(event)
  if (!permissionId) throw createError({ statusCode: 400, statusMessage: 'permissionId is required' })

  const existing = await prisma.userPermission.findUnique({
    where: { userId_permissionId: { userId, permissionId } },
  })

  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Permission already assigned to this user' })
  }

  const userPermission = await prisma.userPermission.create({
    data: { userId, permissionId },
    include: { permission: true },
  })

  return { userPermission }
})
