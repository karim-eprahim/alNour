export default defineEventHandler(async (event) => {
  await requirePermission(event, 'LEDGER', 'CREATE')
  const body = await readBody(event)

  assertExactlyOneOwner(body)

  if (!body.amount || isNaN(Number(body.amount))) {
    throw createError({ statusCode: 400, statusMessage: 'Amount is required and must be a number' })
  }

  if (!body.type || !['DEBIT', 'CREDIT'].includes(body.type)) {
    throw createError({ statusCode: 400, statusMessage: 'Type must be DEBIT or CREDIT' })
  }

  const ownerFilter = getOwnerFilter(body)

  const entry = await prisma.ledgerEntry.create({
    data: {
      ...ownerFilter,
      amount: parseFloat(body.amount),
      type: body.type,
      description: body.description || null,
    },
    include: {
      customer: { select: { id: true, name: true } },
      supplier: { select: { id: true, name: true } },
      worker: { select: { id: true, name: true } },
      distributor: { select: { id: true, name: true } },
    },
  })

  return { entry }
})
