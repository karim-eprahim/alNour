export default defineEventHandler(async (event) => {
  const userId = event.context.auth?.userId
  const notificationId = getRouterParam(event, 'id')

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const result = await prisma.notification.deleteMany({
    where: { id: notificationId, userId }
  })

  if (result.count === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Notification not found' })
  }

  return { success: true }
})
