import type { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'INVENTORY', 'READ')

  const where: Prisma.StockWhereInput = {}
  const warehouseIds = await getAccessibleWarehouseIds(event)
  if (warehouseIds !== null) {
    where.warehouseId = { in: warehouseIds }
  }

  const stocks = await prisma.stock.findMany({
    where,
    select: {
      quantity: true,
      product: { select: { name: true } },
      warehouse: { select: { name: true } },
    },
  })

  const byProduct = new Map<string, number>()
  const byWarehouse = new Map<string, number>()
  for (const s of stocks) {
    const qty = s.quantity.toNumber()
    if (qty <= 0)
      continue
    byProduct.set(s.product.name, (byProduct.get(s.product.name) || 0) + qty)
    byWarehouse.set(s.warehouse.name, (byWarehouse.get(s.warehouse.name) || 0) + qty)
  }

  const data = Array.from(byProduct.entries())
    .map(([product, value]) => ({ product, value }))
    .sort((a, b) => b.value - a.value)

  const warehouseData = Array.from(byWarehouse.entries())
    .map(([warehouse, value]) => ({ warehouse, value }))
    .sort((a, b) => b.value - a.value)

  return { data, warehouseData }
})