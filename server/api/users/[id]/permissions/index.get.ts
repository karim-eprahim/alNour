export default defineEventHandler(async (event) => {
  await requirePermission(event, 'USERS', 'READ')
  const userId = getRouterParam(event, 'id')

  const userPermissions = await prisma.userPermission.findMany({
    where: { userId },
    include: { permission: true },
  })

  return { userPermissions }
})
