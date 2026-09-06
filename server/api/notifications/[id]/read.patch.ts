export default defineEventHandler(async (event) => {
  const userId = event.context.auth?.userId
  const notificationId = getRouterParam(event, 'id')

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const notification = await prisma.notification.findUnique({
    where: { id: notificationId }
  })

  if (!notification || notification.userId !== userId) {
    throw createError({ statusCode: 404, statusMessage: 'Notification not found' })
  }

  const updated = await prisma.notification.update({
    where: { id: notificationId },
    data: { readAt: new Date() }
  })

  return { success: true, notification: updated }
})
