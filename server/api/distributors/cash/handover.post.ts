export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'INVENTORY', 'UPDATE')

  const body = await readBody(event)
  const distributorId = body.distributorId || auth.userId

  if (!body.amount || parseFloat(body.amount) <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Amount must be a positive number' })
  }

  const amount = parseFloat(body.amount)

  const result = await prisma.$transaction(async (tx) => {
    const distributor = await tx.user.findUnique({
      where: { id: distributorId },
      select: { id: true, cashOnHand: true },
    })

    if (!distributor) {
      throw createError({ statusCode: 404, statusMessage: 'Distributor not found' })
    }

    const currentCash = distributor.cashOnHand.toNumber()
    if (currentCash < amount) {
      throw createError({
        statusCode: 400,
        statusMessage: `Insufficient cash on hand. Have ${currentCash}, need ${amount}`,
      })
    }

      await tx.user.update({
        where: { id: distributorId },
        data: { cashOnHand: { increment: -amount } },
      })

    const movement = await tx.distributorCashMovement.create({
      data: {
        distributorId,
        amount,
        type: 'CASH_HANDOVER',
        referenceId: body.referenceId || null,
        notes: body.notes || 'Cash handover to office',
      },
    })

    return { movement }
  })

  return result
})
