export default defineEventHandler(async (event) => {
  const userId = event.context.auth?.userId
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  await prisma.notification.updateMany({
    where: { userId, readAt: null },
    data: { readAt: new Date() }
  })

  return { success: true }
})
