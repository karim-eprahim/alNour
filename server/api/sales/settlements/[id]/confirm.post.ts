
export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'SALES', 'UPDATE')

  const id = getRouterParam(event, 'id')

  const settlement = await prisma.$transaction(async (tx) => {
    const existing = await tx.settlement.findUnique({ where: { id } })

    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: 'Settlement not found' })
    }

    if (existing.status !== 'SUBMITTED') {
      throw createError({
        statusCode: 400,
        statusMessage: `Settlement cannot be confirmed from status ${existing.status}`,
      })
    }

    const amount = existing.amount.toNumber()
    if (amount <= 0) {
      throw createError({ statusCode: 400, statusMessage: 'Settlement amount is invalid' })
    }

    // Validate custody BEFORE claiming so this settlement is not yet counted as confirmed.
    const custodySummary = await getDistributorCustody(tx, existing.distributorId)
    if (custodySummary.custody < amount) {
      throw createError({
        statusCode: 400,
        statusMessage: `Distributor does not have enough custody. Available to settle: ${custodySummary.custody.toFixed(2)}`,
      })
    }

    // Atomic conditional update guards against double confirmation even when
    // two admins confirm the same settlement concurrently.
    const claimed = await tx.settlement.updateMany({
      where: { id, status: 'SUBMITTED' },
      data: {
        status: 'CONFIRMED',
        confirmedAt: new Date(),
        confirmedBy: auth.userId,
      },
    })

    if (claimed.count === 0) {
      throw createError({ statusCode: 400, statusMessage: 'Settlement has already been processed' })
    }

    // Transfer custody: the distributor physically handed the money to the company.
    await tx.user.update({
      where: { id: existing.distributorId },
      data: { cashOnHand: { decrement: amount } },
    })

    await tx.distributorCashMovement.create({
      data: {
        distributorId: existing.distributorId,
        amount,
        type: 'CASH_HANDOVER',
        referenceId: existing.id,
        notes: `Settlement ${existing.settlementNumber} confirmed`,
      },
    })

    await tx.ledgerEntry.create({
      data: {
        distributorId: existing.distributorId,
        amount,
        type: 'CREDIT',
        description: `Settlement ${existing.settlementNumber} confirmed`,
      },
    })

    return tx.settlement.findUnique({
      where: { id },
      include: {
        distributor: { select: { id: true, name: true } },
        confirmedByUser: { select: { id: true, name: true } },
      },
    })
  })

  return { settlement: serializeSettlement(settlement!) }
})
