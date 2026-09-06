import { registerDeviceToken } from '~~/server/services/fcm.service'

export default defineEventHandler(async (event) => {
  const userId = event.context.auth?.userId
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const { token, deviceType } = await readBody<{ token: string; deviceType?: string }>(event)
  if (!token) {
    throw createError({ statusCode: 400, statusMessage: 'Token is required' })
  }

  await registerDeviceToken(userId, token, deviceType || 'web')

  return { success: true }
})