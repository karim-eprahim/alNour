export default defineEventHandler(async (event) => {
  await requirePermission(event, 'INVENTORY', 'READ')
  const query = getQuery(event)
  const where: any = {}

  if (query.warehouseId) {
    await validateWarehouseAccess(event, query.warehouseId as string)
    where.warehouseId = query.warehouseId
  } else {
    const warehouseIds = await getAccessibleWarehouseIds(event)
    if (warehouseIds !== null) {
      where.warehouseId = { in: warehouseIds }
    }
  }
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

  const movementCount = await prisma.stockMovement.count({ where })

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
