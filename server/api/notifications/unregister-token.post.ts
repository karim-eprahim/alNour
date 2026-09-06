import { unregisterDeviceToken } from '~~/server/services/fcm.service'

export default defineEventHandler(async (event) => {
  const { token } = await readBody<{ token?: string }>(event)
  if (token) await unregisterDeviceToken(token)
  return { success: true }
})
