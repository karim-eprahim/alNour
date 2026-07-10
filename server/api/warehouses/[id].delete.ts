export default defineEventHandler(async (event) => {
  await requirePermission(event, 'WAREHOUSES', 'DELETE')
  const id = getRouterParam(event, 'id')

  const existing = await prisma.warehouse.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Warehouse not found' })
  }

  const stockCount = await prisma.stock.count({ where: { warehouseId: id } })
  if (stockCount > 0) {
    throw createError({ statusCode: 400, statusMessage: 'Cannot delete warehouse with existing stock. Transfer or remove stock first.' })
  }

  await prisma.warehouse.delete({ where: { id } })

  return { success: true }
})
