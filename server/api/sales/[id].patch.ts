export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const existing = await prisma.salesOrder.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Sales order not found' })
  }
  const data: any = {}
  if (body.status) data.status = body.status
  const order = await prisma.salesOrder.update({
    where: { id },
    data,
    include: {
      customer: { select: { id: true, name: true } },
      warehouse: { select: { id: true, name: true } },
      items: { include: { product: { select: { id: true, name: true, sku: true } } } },
    },
  })
  return { order }
})
