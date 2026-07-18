export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PURCHASES', 'DELETE')
  const id = getRouterParam(event, 'id')

  const existing = await prisma.weightTicket.findUnique({
    where: { id },
    include: { purchaseInvoice: { select: { warehouseId: true } } },
  })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Weight ticket not found' })
  }

  await validateWarehouseAccess(event, existing.purchaseInvoice.warehouseId)

  await prisma.weightTicket.delete({ where: { id } })

  return { success: true }
})
