export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const existing = await prisma.weightTicket.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Weight ticket not found' })
  }

  await prisma.weightTicket.delete({ where: { id } })

  return { success: true }
})
