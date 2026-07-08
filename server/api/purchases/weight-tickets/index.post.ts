export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PURCHASES', 'CREATE')
  const body = await readBody(event)

  if (!body.purchaseInvoiceId || !body.grossWeight || !body.tareWeight || !body.ticketNumber) {
    throw createError({ statusCode: 400, statusMessage: 'purchaseInvoiceId, ticketNumber, grossWeight, and tareWeight are required' })
  }

  const invoice = await prisma.purchaseInvoice.findUnique({ where: { id: body.purchaseInvoiceId } })
  if (!invoice) {
    throw createError({ statusCode: 404, statusMessage: 'Purchase invoice not found' })
  }

  const netWeight = parseFloat(body.grossWeight) - parseFloat(body.tareWeight)

  const ticket = await prisma.weightTicket.create({
    data: {
      ticketNumber: body.ticketNumber,
      purchaseInvoiceId: body.purchaseInvoiceId,
      grossWeight: parseFloat(body.grossWeight),
      tareWeight: parseFloat(body.tareWeight),
      netWeight,
      carNumber: body.carNumber,
    },
  })

  return { ticket }
})
