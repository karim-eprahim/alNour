export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      roleId: true,
      role: { select: { id: true, name: true, label: true } },
      status: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
      permissions: {
        include: { permission: { include: { module: true, action: true } } },
      },
    },
  })

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  return { user }
})
