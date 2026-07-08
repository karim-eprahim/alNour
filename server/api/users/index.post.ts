import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'USERS', 'CREATE')
  const body = await readBody(event)

  if (!body.name || !body.email || !body.password || !body.roleId) {
    throw createError({ statusCode: 400, statusMessage: 'Name, email, password and roleId are required' })
  }

  const existing = await prisma.user.findUnique({ where: { email: body.email } })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Email already in use' })
  }

  const role = await prisma.role.findUnique({ where: { id: body.roleId } })
  if (!role) {
    throw createError({ statusCode: 400, statusMessage: 'Role not found' })
  }

  const password = await bcrypt.hash(body.password, 12)

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password,
      phone: body.phone,
      roleId: body.roleId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      roleId: true,
      role: { select: { id: true, name: true, label: true } },
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return { user }
})
