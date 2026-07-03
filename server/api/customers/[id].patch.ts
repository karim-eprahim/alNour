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

  if (body.linkedSupplierId !== undefined) {
    await prisma.supplier.updateMany({
      where: { linkedCustomerId: id },
      data: { linkedCustomerId: null },
    })
    if (body.linkedSupplierId) {
      const supplier = await prisma.supplier.findUnique({ where: { id: body.linkedSupplierId } })
      if (!supplier) throw createError({ statusCode: 404, statusMessage: 'Linked supplier not found' })
      await prisma.supplier.update({
        where: { id: body.linkedSupplierId },
        data: { linkedCustomerId: id },
      }).catch(() => {
        throw createError({ statusCode: 400, statusMessage: 'Supplier already linked to another customer' })
      })
    }
  }

  return { customer }
})
