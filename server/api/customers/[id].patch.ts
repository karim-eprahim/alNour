export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const existing = await prisma.customer.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Customer not found' })
  }
  const data: any = {}
  if (body.name !== undefined) data.name = body.name
  if (body.phone !== undefined) data.phone = body.phone
  if (body.address !== undefined) data.address = body.address
  const customer = await prisma.customer.update({ where: { id }, data })
  return { customer }
})
