export default defineEventHandler(async (event) => {
  const userId = event.context.auth?.userId
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const { ids } = await readBody<{ ids?: string[] }>(event)
  if (!Array.isArray(ids) || ids.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'ids must be a non-empty array' })
  }

  const result = await prisma.notification.deleteMany({
    where: { id: { in: ids }, userId }
  })

  return { success: true, deletedCount: result.count }
})
