import bcrypt from 'bcryptjs'

const ADMIN_ROLE = 'ADMIN'

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

  const isAdmin = role.name === ADMIN_ROLE

  if (body.warehouseIds && body.warehouseIds.length > 0) {
    const existingWarehouses = await prisma.warehouse.count({
      where: { id: { in: body.warehouseIds } },
    })
    if (existingWarehouses !== body.warehouseIds.length) {
      throw createError({ statusCode: 400, statusMessage: 'One or more warehouses not found' })
    }
  }

  if (!isAdmin && (!body.warehouseIds || body.warehouseIds.length === 0)) {
    throw createError({ statusCode: 400, statusMessage: 'At least one warehouse is required for non-admin users' })
  }

  const password = await bcrypt.hash(body.password, 12)

  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        name: body.name,
        email: body.email,
        password,
        phone: body.phone,
        roleId: body.roleId,
      },
      select: { id: true },
    })

    if (!isAdmin && body.warehouseIds && body.warehouseIds.length > 0) {
      await tx.userWarehouse.createMany({
        data: body.warehouseIds.map((warehouseId: string) => ({
          userId: created.id,
          warehouseId,
        })),
      })
    }

    return tx.user.findUnique({
      where: { id: created.id },
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
        userWarehouses: {
          include: { warehouse: { select: { id: true, name: true } } },
        },
      },
    })
  })

  return { user }
})
