
const PAYMENT_METHODS = ['CASH', 'BANK_TRANSFER', 'CHECK']

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'SALES', 'CREATE')

  const body = await readBody(event)
  const amount = parseFloat(body.amount)
  const paymentMethod = body.paymentMethod || 'CASH'

  if (!amount || amount <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Amount must be a positive number' })
  }

  if (!PAYMENT_METHODS.includes(paymentMethod)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payment method' })
  }

  const settlement = await prisma.$transaction(async (tx) => {
    const custodySummary = await getDistributorCustody(tx, auth.userId)

    if (custodySummary.custody < amount) {
      throw createError({
        statusCode: 400,
        statusMessage: `Insufficient custody. Available to settle: ${custodySummary.custody.toFixed(2)}`,
      })
    }

    const count = await tx.settlement.count()
    const settlementNumber = `SET-${String(count + 1).padStart(6, '0')}`

    return tx.settlement.create({
      data: {
        settlementNumber,
        distributorId: auth.userId,
        amount,
        paymentMethod,
        notes: body.notes || null,
      },
      include: {
        distributor: { select: { id: true, name: true } },
      },
    })
  })

  return { settlement: serializeSettlement(settlement) }
})
