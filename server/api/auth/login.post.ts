import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<{ email: string; password: string }>(event)

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: { select: { id: true, name: true } } },
  })

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  if (user.status !== 'ACTIVE') {
    throw createError({ statusCode: 403, statusMessage: 'Account is inactive or blocked' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  })

  const payload = { userId: user.id, email: user.email, role: user.role.name }
  const token = signToken(payload)

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role.name,
      roleId: user.roleId,
    },
  }
})
