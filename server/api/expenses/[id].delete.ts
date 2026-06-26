export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const existing = await prisma.expense.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Expense not found' })
  }

  await prisma.expense.delete({ where: { id } })
  return { success: true }
})
