export default defineEventHandler(async (event) => {
  await requirePermission(event, 'USERS', 'CREATE')
  const body = await readBody(event)

  if (!body.moduleId || !body.actionId || !body.label) {
    throw createError({ statusCode: 400, statusMessage: 'moduleId, actionId and label are required' })
  }

  const existing = await prisma.permission.findUnique({
    where: { moduleId_actionId: { moduleId: body.moduleId, actionId: body.actionId } },
  })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Permission already exists for this module and action' })
  }

  const permission = await prisma.permission.create({
    data: { moduleId: body.moduleId, actionId: body.actionId, label: body.label },
    include: {
      module: { select: { id: true, name: true, label: true } },
      action: { select: { id: true, name: true, label: true } },
    },
  })
  return { permission }
})
