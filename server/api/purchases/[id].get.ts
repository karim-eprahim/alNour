export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const invoice = await prisma.purchaseInvoice.findUnique({
    where: { id },
    include: {
      supplier: true,
      warehouse: true,
      items: {
        include: { product: true },
      },
      weightTickets: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!invoice) {
    throw createError({ statusCode: 404, statusMessage: 'Purchase invoice not found' })
  }

  return { invoice }
})
