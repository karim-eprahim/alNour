export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'UPDATE')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const auth = event.context.auth

  if (!body.amount || parseFloat(body.amount) <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Amount must be a positive number' })
  }

  const invoice = await prisma.$transaction(async (tx) => {
    const inv = await tx.invoice.findUnique({
      where: { id },
      include: { salesOrder: { select: { warehouseId: true } } },
    })
    if (!inv) {
      throw createError({ statusCode: 404, statusMessage: 'Invoice not found' })
    }

    await validateWarehouseAccess(event, inv.warehouseId)

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

    const authUser = await tx.user.findUnique({
      where: { id: auth.userId },
      select: { id: true, role: { select: { name: true } } },
    })

    if (authUser?.role?.name === 'DISTRIBUTOR') {
      await tx.user.update({
        where: { id: auth.userId },
        data: { cashOnHand: { increment: amount } },
      })

      await tx.distributorCashMovement.create({
        data: {
          distributorId: auth.userId,
          amount,
          type: 'PAYMENT_COLLECTED',
          referenceId: id,
          notes: `Payment collected for invoice ${inv.invoiceNumber}`,
        },
      })
    }

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
