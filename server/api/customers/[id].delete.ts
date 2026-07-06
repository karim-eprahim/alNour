export default defineEventHandler(async (event) => {
  await requirePermission(event, 'CUSTOMERS', 'DELETE')

  const id = getRouterParam(event, 'id')
  const existing = await prisma.customer.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Customer not found' })
  }
  await prisma.customer.delete({ where: { id } })
  return { success: true }
})
