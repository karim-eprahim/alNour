export default defineEventHandler(async (event) => {
  const roleId = getRouterParam(event, 'id')
  if (!roleId) throw createError({ statusCode: 400, statusMessage: 'Role ID is required' })
  const body = await readBody(event)

  const role = await prisma.role.findUnique({ where: { id: roleId } })
  if (!role) {
    throw createError({ statusCode: 404, statusMessage: 'Role not found' })
  }

  const permissionIds: string[] = body.permissionIds || []

  const validPermissions = await prisma.permission.findMany({
    where: { id: { in: permissionIds } },
    select: { id: true },
  })
  const validIds = new Set(validPermissions.map((p) => p.id))

  for (const pid of permissionIds) {
    if (!validIds.has(pid)) {
      throw createError({ statusCode: 400, statusMessage: `Permission ${pid} not found` })
    }
  }

  await prisma.$transaction([
    prisma.rolePermission.deleteMany({ where: { roleId } }),
    ...permissionIds.map((permissionId) =>
      prisma.rolePermission.create({ data: { roleId, permissionId } })
    ),
  ])

  return { success: true, permissionIds }
})
