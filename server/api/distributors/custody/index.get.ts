export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'PRODUCTS', 'READ')

  const custodies = await prisma.distributorCustody.findMany({
    where: { distributorId: auth.userId },
    include: {
      product: {
        select: { id: true, name: true, nameAr: true, sku: true, sellingPrice: true, image: true },
      },
    },
    orderBy: { updatedAt: 'desc' },
  })

  const totalItems = custodies.reduce((sum, c) => sum + c.quantity.toNumber(), 0)
  const totalValue = custodies.reduce((sum, c) => sum + c.quantity.toNumber() * (c.product.sellingPrice?.toNumber() || 0), 0)

  return { custodies, totalItems, totalValue }
})
