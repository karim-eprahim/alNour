export default defineEventHandler(async (event) => {
  await requirePermission(event, 'EXPENSES', 'UPDATE')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const existing = await prisma.expense.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Expense not found' })
  }

  const data: any = {}
  if (body.title !== undefined) data.title = body.title
  if (body.amount !== undefined) data.amount = parseFloat(body.amount)
  if (body.category !== undefined) data.category = body.category
  if (body.notes !== undefined) data.notes = body.notes
  if (body.date !== undefined) data.date = new Date(body.date)

  const expense = await prisma.expense.update({
    where: { id },
    data,
    include: { createdBy: { select: { id: true, name: true } } },
  })

  return { expense }
})
