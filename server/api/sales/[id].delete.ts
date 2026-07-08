export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'DELETE')
  const id = getRouterParam(event, 'id')
  const existing = await prisma.salesOrder.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Sales order not found' })
  }
  await prisma.salesOrder.delete({ where: { id } })
  return { success: true }
})
