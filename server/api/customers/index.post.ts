export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: 'name is required' })
  }
  const customer = await prisma.customer.create({
    data: { name: body.name, phone: body.phone || null, address: body.address || null },
  })
  return { customer }
})
