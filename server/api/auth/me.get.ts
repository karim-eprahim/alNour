export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const payload = verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      roleId: true,
      role: { select: { id: true, name: true } },
      status: true,
      lastLogin: true,
      createdAt: true,
    },
  })

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  return {
    user: {
      ...user,
      role: user.role.name,
    },
  }
})
