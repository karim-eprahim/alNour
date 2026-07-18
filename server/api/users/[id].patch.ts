import bcrypt from 'bcryptjs'

const ADMIN_ROLE = 'ADMIN'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'USERS', 'UPDATE')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const existing = await prisma.user.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  if (body.email && body.email !== existing.email) {
    const emailExists = await prisma.user.findUnique({ where: { email: body.email } })
    if (emailExists) {
      throw createError({ statusCode: 409, statusMessage: 'Email already in use' })
    }
  }

  const data: any = {}
  if (body.name) data.name = body.name
  if (body.email) data.email = body.email
  if (body.phone !== undefined) data.phone = body.phone
  if (body.avatar !== undefined) data.avatar = body.avatar
  if (body.roleId) data.roleId = body.roleId
  if (body.status) data.status = body.status
  if (body.password) {
    data.password = await bcrypt.hash(body.password, 12)
  }

  if (body.warehouseIds) {
    const existingWarehouses = await prisma.warehouse.count({
      where: { id: { in: body.warehouseIds } },
    })
    if (existingWarehouses !== body.warehouseIds.length) {
      throw createError({ statusCode: 400, statusMessage: 'One or more warehouses not found' })
    }
  }

  const roleName = body.roleId
    ? (await prisma.role.findUnique({ where: { id: body.roleId }, select: { name: true } }))?.name
    : null
  const resolvedRoleName = roleName || (await prisma.role.findUnique({ where: { id: existing.roleId }, select: { name: true } }))?.name || ''
  const isAdmin = resolvedRoleName === ADMIN_ROLE

  if (!isAdmin && body.warehouseIds !== undefined && body.warehouseIds.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'At least one warehouse is required for non-admin users' })
  }

  const user = await prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({
      where: { id },
      data,
      select: { id: true, roleId: true },
    })

    if (body.warehouseIds !== undefined) {
      await tx.userWarehouse.deleteMany({ where: { userId: id } })

      if (!isAdmin && body.warehouseIds.length > 0) {
        await tx.userWarehouse.createMany({
          data: body.warehouseIds.map((warehouseId: string) => ({
            userId: id,
            warehouseId,
          })),
        })
      }
    }

    return tx.user.findUnique({
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
        userWarehouses: {
          include: { warehouse: { select: { id: true, name: true } } },
        },
      },
    })
  })

  return { user }
})
