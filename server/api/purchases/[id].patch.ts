export default defineEventHandler(async (event) => {
  await requirePermission(event, 'PURCHASES', 'EDIT')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const existing = await prisma.purchaseInvoice.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Purchase invoice not found' })
  }

  await validateWarehouseAccess(event, existing.warehouseId)

  const data: any = {}
  if (body.invoiceDate) data.invoiceDate = new Date(body.invoiceDate)

  const invoice = await prisma.purchaseInvoice.update({
    where: { id },
    data,
    include: {
      supplier: true,
      warehouse: true,
      items: { include: { product: true } },
      weightTickets: true,
    },
  })

  return { invoice }
})
