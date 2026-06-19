export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const existing = await prisma.product.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  await prisma.product.delete({ where: { id } })

  return { success: true }
})
