export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'READ')
  const id = getRouterParam(event, 'id')
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      customer: { select: { id: true, name: true, phone: true } },
      salesOrder: {
        select: { id: true, orderNumber: true, warehouseId: true, items: { include: { product: { select: { id: true, name: true, sku: true } } } } },
      },
      createdBy: { select: { id: true, name: true } },
      payments: {
        include: { createdBy: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
  if (!invoice) {
    throw createError({ statusCode: 404, statusMessage: 'Invoice not found' })
  }

  if (invoice.salesOrder?.warehouseId) {
    await validateWarehouseAccess(event, invoice.salesOrder.warehouseId)
  }

  return { invoice }
})
