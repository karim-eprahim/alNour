export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const role = await prisma.role.findUnique({
    where: { id },
    include: {
      permissions: {
        include: {
          permission: { include: { module: true, action: true } },
        },
      },
      _count: { select: { users: true } },
    },
  })
  if (!role) {
    throw createError({ statusCode: 404, statusMessage: 'Role not found' })
  }
  return { role }
})
