export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: 'Supplier name is required' })
  }

  if (body.linkedCustomerId) {
    const customer = await prisma.customer.findUnique({ where: { id: body.linkedCustomerId } })
    if (!customer) throw createError({ statusCode: 404, statusMessage: 'Linked customer not found' })
  }

  const supplier = await prisma.supplier.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email,
      address: body.address,
      company: body.company,
      linkedCustomerId: body.linkedCustomerId || null,
    },
  })

  return { supplier }
})
