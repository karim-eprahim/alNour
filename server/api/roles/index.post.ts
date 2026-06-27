export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: 'Role name is required' })
  }

  const existing = await prisma.role.findUnique({ where: { name: body.name } })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Role already exists' })
  }

  const role = await prisma.role.create({
    data: { name: body.name, label: body.label || body.name },
  })
  return { role }
})
