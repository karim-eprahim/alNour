export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: 'name is required' })
  }

  const customer = await prisma.customer.create({
    data: { name: body.name, phone: body.phone || null, address: body.address || null },
  })

  if (body.linkedSupplierId) {
    const supplier = await prisma.supplier.findUnique({ where: { id: body.linkedSupplierId } })
    if (!supplier) throw createError({ statusCode: 404, statusMessage: 'Linked supplier not found' })
    await prisma.supplier.update({
      where: { id: body.linkedSupplierId },
      data: { linkedCustomerId: customer.id },
    }).catch(() => {
      throw createError({ statusCode: 400, statusMessage: 'Supplier already linked to another customer' })
    })
  }

  return { customer }
})
