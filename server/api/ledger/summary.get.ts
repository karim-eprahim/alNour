export default defineEventHandler(async (event) => {
  // await requirePermission(event, 'LEDGER', 'READ')
  const query = getQuery(event)

  const where = buildLedgerWhere(query)

  const entries = await prisma.ledgerEntry.findMany({
    where,
    select: { amount: true, type: true },
  })

  const totalDebit = entries
    .filter((e) => e.type === 'DEBIT')
    .reduce((sum, e) => sum + e.amount.toNumber(), 0)

  const totalCredit = entries
    .filter((e) => e.type === 'CREDIT')
    .reduce((sum, e) => sum + e.amount.toNumber(), 0)

  return {
    totalDebit,
    totalCredit,
    balance: totalDebit - totalCredit,
    totalEntries: entries.length,
  }
})
