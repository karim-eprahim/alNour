export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PRODUCTS', 'READ')
  const id = getRouterParam(event, 'id')

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      stocks: { include: { warehouse: true } },
      movements: {
        include: { warehouse: true, createdBy: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
    },
  })

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return { product }
})
