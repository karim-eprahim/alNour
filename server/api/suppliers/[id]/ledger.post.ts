export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!body.amount || !body.type) {
    throw createError({ statusCode: 400, statusMessage: 'Amount and type (DEBIT/CREDIT) are required' })
  }

  const supplier = await prisma.supplier.findUnique({ where: { id } })
  if (!supplier) {
    throw createError({ statusCode: 404, statusMessage: 'Supplier not found' })
  }

  const entry = await prisma.ledgerEntry.create({
    data: {
      supplierId: id,
      amount: parseFloat(body.amount),
      type: body.type,
      description: body.description,
    },
  })

  return { entry }
})
