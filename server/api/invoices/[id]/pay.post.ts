export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'UPDATE')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const auth = event.context.auth

  if (!body.amount || parseFloat(body.amount) <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Amount must be a positive number' })
  }

  const invoice = await prisma.$transaction(async (tx) => {
    const inv = await tx.invoice.findUnique({ where: { id } })
    if (!inv) {
      throw createError({ statusCode: 404, statusMessage: 'Invoice not found' })
    }

    const amount = parseFloat(body.amount)
    const newPaid = inv.paidAmount.toNumber() + amount

    const payment = await tx.payment.create({
      data: {
        invoiceId: id,
        createdById: auth.userId,
        amount,
        paymentMethod: body.paymentMethod || 'CASH',
        notes: body.notes || null,
      },
    })

    const newStatus = newPaid >= inv.totalAmount.toNumber() ? 'PAID' : 'PARTIAL'
    await tx.invoice.update({
      where: { id },
      data: { paidAmount: newPaid, status: newStatus },
    })

    await tx.ledgerEntry.create({
      data: {
        customerId: inv.customerId,
        amount,
        type: 'CREDIT',
        description: `Payment for invoice ${inv.invoiceNumber}`,
      },
    })

    return payment
  })

  return { payment: invoice }
})
