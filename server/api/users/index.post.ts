import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.email || !body.password || !body.role) {
    throw createError({ statusCode: 400, statusMessage: 'Name, email, password and role are required' })
  }

  const existing = await prisma.user.findUnique({ where: { email: body.email } })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Email already in use' })
  }

  const password = await bcrypt.hash(body.password, 12)

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password,
      phone: body.phone,
      role: body.role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return { user }
})
