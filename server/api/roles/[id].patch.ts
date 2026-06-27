export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const existing = await prisma.role.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Role not found' })
  }

  if (body.name && body.name !== existing.name) {
    const duplicate = await prisma.role.findUnique({ where: { name: body.name } })
    if (duplicate) {
      throw createError({ statusCode: 409, statusMessage: 'Role name already taken' })
    }
  }

  const role = await prisma.role.update({
    where: { id },
    data: { name: body.name, label: body.label },
  })
  return { role }
})
