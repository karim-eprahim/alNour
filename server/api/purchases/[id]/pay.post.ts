export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PURCHASES', 'EDIT')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!body.amount) {
    throw createError({ statusCode: 400, statusMessage: 'Payment amount is required' })
  }

  const invoice = await prisma.purchaseInvoice.findUnique({ where: { id } })
  if (!invoice) {
    throw createError({ statusCode: 404, statusMessage: 'Purchase invoice not found' })
  }

  await validateWarehouseAccess(event, invoice.warehouseId)

  const paymentAmount = parseFloat(body.amount)
  if (paymentAmount <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Payment amount must be positive' })
  }

  const [updated] = await Promise.all([
    prisma.purchaseInvoice.update({
      where: { id },
      data: { paidAmount: { increment: paymentAmount } },
    }),
    prisma.ledgerEntry.create({
      data: {
        supplierId: invoice.supplierId,
        amount: paymentAmount,
        type: 'CREDIT',
        description: body.description || `Payment on invoice ${invoice.invoiceNumber}`,
      },
    }),
  ])

  return { invoice: updated }
})
