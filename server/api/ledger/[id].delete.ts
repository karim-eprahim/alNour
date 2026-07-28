export default defineEventHandler(async (event) => {
  // await requirePermission(event, 'LEDGER', 'DELETE')
  const id = getRouterParam(event, 'id')

  const existing = await prisma.ledgerEntry.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Ledger entry not found' })
  }

  await prisma.ledgerEntry.delete({ where: { id } })

  return { success: true }
})
