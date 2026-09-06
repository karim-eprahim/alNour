export default defineEventHandler(async (event) => {
  const userId = event.context.auth?.userId
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const result = await prisma.notification.deleteMany({
    where: { userId }
  })

  return { success: true, deletedCount: result.count }
})
