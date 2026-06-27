export default defineEventHandler(async (event) => {
  const roleId = getRouterParam(event, 'id')
  const rolePerms = await prisma.rolePermission.findMany({
    where: { roleId },
    select: { permissionId: true },
  })
  return { permissionIds: rolePerms.map((rp) => rp.permissionId) }
})
