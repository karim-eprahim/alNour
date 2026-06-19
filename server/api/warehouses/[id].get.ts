export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const warehouse = await prisma.warehouse.findUnique({
    where: { id },
    include: {
      stocks: {
        include: { product: true },
        orderBy: { product: { name: 'asc' } },
      },
    },
  })

  if (!warehouse) {
    throw createError({ statusCode: 404, statusMessage: 'Warehouse not found' })
  }

  return { warehouse }
})
