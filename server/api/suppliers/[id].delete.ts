export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SUPPLIERS', 'DELETE')
  const id = getRouterParam(event, 'id')

  const existing = await prisma.supplier.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Supplier not found' })
  }

  const invoiceCount = await prisma.purchaseInvoice.count({ where: { supplierId: id } })
  if (invoiceCount > 0) {
    throw createError({ statusCode: 400, statusMessage: 'Cannot delete supplier with existing purchase invoices' })
  }

  await prisma.supplier.delete({ where: { id } })

  return { success: true }
})
