export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id')

  const userPermissions = await prisma.userPermission.findMany({
    where: { userId },
    include: { permission: true },
  })

  return { userPermissions }
})
