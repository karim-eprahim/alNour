export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const existing = await prisma.supplier.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Supplier not found' })
  }

  const data: any = {}
  if (body.name) data.name = body.name
  if (body.phone !== undefined) data.phone = body.phone
  if (body.email !== undefined) data.email = body.email
  if (body.address !== undefined) data.address = body.address
  if (body.company !== undefined) data.company = body.company
  if (body.linkedCustomerId !== undefined) data.linkedCustomerId = body.linkedCustomerId || null

  const supplier = await prisma.supplier.update({
    where: { id }, data,
  }).catch(() => { throw createError({ statusCode: 400, statusMessage: 'Customer already linked to another supplier' }) })

  return { supplier }
})
