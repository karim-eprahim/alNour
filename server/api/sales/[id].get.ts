export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const order = await prisma.salesOrder.findUnique({
    where: { id },
    include: {
      customer: { select: { id: true, name: true, phone: true, address: true } },
      warehouse: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
      items: { include: { product: { select: { id: true, name: true, sku: true, image: true } } } },
      invoices: {
        include: {
          payments: {
            include: { createdBy: { select: { id: true, name: true } } },
            orderBy: { createdAt: 'desc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Sales order not found' })
  }
  return { order }
})
