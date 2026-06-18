import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const existing = await prisma.user.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  const data: any = {}
  if (body.name) data.name = body.name
  if (body.email) data.email = body.email
  if (body.phone !== undefined) data.phone = body.phone
  if (body.avatar !== undefined) data.avatar = body.avatar
  if (body.role) data.role = body.role
  if (body.status) data.status = body.status
  if (body.password) {
    data.password = await bcrypt.hash(body.password, 12)
  }

  if (body.email && body.email !== existing.email) {
    const emailExists = await prisma.user.findUnique({ where: { email: body.email } })
    if (emailExists) {
      throw createError({ statusCode: 409, statusMessage: 'Email already in use' })
    }
  }

  const user = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      role: true,
      status: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return { user }
})
