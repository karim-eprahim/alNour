export default defineEventHandler(async (event) => {
  await requirePermission(event, 'USERS', 'READ')
  const modules = await prisma.module.findMany({
    include: {
      permissions: {
        include: { action: true },
        orderBy: { action: { name: 'asc' } },
      },
    },
    orderBy: { name: 'asc' },
  })

  const result = modules.map((m) => ({
    id: m.id,
    name: m.name,
    label: m.label,
    permissions: m.permissions.map((p) => ({
      id: p.id,
      actionId: p.actionId,
      action: p.action.name,
      actionLabel: p.action.label,
      label: p.label,
    })),
  }))

  return { modules: result }
})
