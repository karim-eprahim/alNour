export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: 'Supplier name is required' })
  }

  const supplier = await prisma.supplier.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email,
      address: body.address,
      company: body.company,
    },
  })

  return { supplier }
})
