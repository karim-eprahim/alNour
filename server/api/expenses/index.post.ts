export default defineEventHandler(async (event) => {
  await requirePermission(event, 'EXPENSES', 'CREATE')
  const body = await readBody(event)
  const auth = event.context.auth

  if (!body.title || !body.amount || !body.category) {
    throw createError({ statusCode: 400, statusMessage: 'title, amount, and category are required' })
  }

  const expense = await prisma.expense.create({
    data: {
      title: body.title,
      amount: parseFloat(body.amount),
      category: body.category,
      notes: body.notes || null,
      date: body.date ? new Date(body.date) : new Date(),
      createdById: auth.userId,
    },
    include: { createdBy: { select: { id: true, name: true } } },
  })

  return { expense }
})
