export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const where: any = {}

  if (query.warehouseId) where.warehouseId = query.warehouseId
  if (query.productType) {
    const products = await prisma.product.findMany({
      where: { type: query.productType as any },
      select: { id: true },
    })
    where.productId = { in: products.map((p) => p.id) }
  }

  const stocks = await prisma.stock.findMany({
    where,
    include: {
      warehouse: { select: { id: true, name: true } },
      product: { select: { id: true, name: true, sku: true, type: true, purchaseCost: true, sellingPrice: true } },
    },
    orderBy: [{ warehouse: { name: 'asc' } }, { product: { name: 'asc' } }],
  })

  let totalQty = 0
  let totalValuation = 0
  for (const s of stocks) {
    const qty = s.quantity.toNumber()
    totalQty += qty
    totalValuation += qty * (s.product.purchaseCost?.toNumber() || 0)
  }

  const productTypes = await prisma.product.groupBy({
    by: ['type'],
    _count: true,
  })

  const movementCount = await prisma.stockMovement.count({
    where: query.warehouseId ? { warehouseId: query.warehouseId as string } : {},
  })

  return {
    stocks,
    summary: {
      totalProducts: stocks.length,
      totalQuantity: totalQty,
      totalValuation,
      movementCount,
      productTypes,
    },
  }
})
