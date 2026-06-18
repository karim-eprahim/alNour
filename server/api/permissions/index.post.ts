export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.role || !body.module || !body.action) {
    throw createError({ statusCode: 400, statusMessage: 'Role, module and action are required' })
  }

  const existing = await prisma.permission.findUnique({
    where: { role_module_action: { role: body.role, module: body.module, action: body.action } },
  })

  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Permission already exists for this role' })
  }

  const permission = await prisma.permission.create({
    data: { role: body.role, module: body.module, action: body.action },
  })

  return { permission }
})
