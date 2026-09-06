import type { BatchResponse, MulticastMessage, Message } from 'firebase-admin/messaging'
import prisma from '../utils/prisma'
import { getMessagingInstance } from '../utils/firebase-admin'

export interface PushPayload {
  title: string
  body: string
  data?: Record<string, string>
}

/** FCM `data` payloads only accept string values — coerce defensively. */
function toStringData(data?: Record<string, any>): Record<string, string> {
  if (!data) return {}
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === null || value === undefined ? '' : String(value),
    ]),
  )
}

function buildMulticastMessage(tokens: string[], payload: PushPayload): MulticastMessage {
  const data = toStringData(payload.data)
  return {
    tokens,
    // ⭐ P3: Use data-only to prevent automatic notifications when app is open
    // Remove 'notification' from top level, keep only in webpush
    data, // ⭐ This is the key - data-only payload
    webpush: {
      notification: {
        title: payload.title,
        body: payload.body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        // ⭐ P3: Use tag for collapsing duplicate notifications
        tag: data.notificationId || 'default',
        renotify: false,
        requireInteraction: true,
      },
      fcmOptions: {
        link: data.url || '/',
      },
      headers: {
        'Urgency': 'high',
      },
    },
    apns: {
      payload: {
        aps: {
          alert: {
            title: payload.title,
            body: payload.body,
          },
          badge: 1,
          sound: 'default',
        },
      },
    },
  }
}

async function pruneInvalidTokens(allTokens: string[], response: BatchResponse) {
  const invalidTokens: string[] = []
  response.responses.forEach((resp, idx) => {
    if (!resp.success) {
      const code = resp.error?.code
      if (
        code === 'messaging/registration-token-not-registered' ||
        code === 'messaging/invalid-registration-token' ||
        code === 'messaging/unregistered'
      ) {
        const token = allTokens[idx]
        if (token) invalidTokens.push(token)
      }
    }
  })

  if (invalidTokens.length > 0) {
    console.log('[FCM] Removing invalid tokens:', invalidTokens.length)
    await prisma.deviceToken.deleteMany({
      where: { token: { in: invalidTokens } },
    })
  }
}

/**
 * Spec unified API: send a push to every device registered to a user.
 * Returns the FCM batch response, or null when there is nothing to send
 * (no tokens) or FCM is not configured.
 * 
 * ⭐ Uses data-only payload to prevent automatic notifications when app is open.
 * WebSocket handles the foreground experience.
 */
export async function sendPushToUser(
  userId: string,
  payload: PushPayload,
): Promise<BatchResponse | null> {
  const msg = getMessagingInstance()
  if (!msg) return null

  const tokens = await prisma.deviceToken.findMany({
    where: { userId },
    select: { token: true },
  })
  if (tokens.length === 0) {
    return null
  }

  const fcmTokens = tokens.map(t => t.token)
  try {
    const response = await msg.sendEachForMulticast(
      buildMulticastMessage(fcmTokens, payload),
    )
    await pruneInvalidTokens(fcmTokens, response)
    return response
  }
  catch (error) {
    return null
  }
}

export async function sendPushToUsers(
  userIds: string[],
  payload: PushPayload,
): Promise<void> {
  await Promise.all(userIds.map(id => sendPushToUser(id, payload)))
}

/**
 * Legacy wrapper kept for existing callers: send + boolean outcome.
 */
export async function sendPushNotification(
  payload: PushPayload & { userId: string },
): Promise<boolean> {
  const response = await sendPushToUser(payload.userId, {
    title: payload.title,
    body: payload.body,
    data: payload.data,
  })
  return !!response && response.successCount > 0
}

export async function sendPushToToken(
  token: string,
  payload: Omit<PushPayload, 'data'> & { data?: Record<string, string> },
): Promise<boolean> {
  const msg = getMessagingInstance()
  if (!msg) return false

  const data = toStringData(payload.data)
  const message: Message = {
    token,
    // ⭐ Use data-only for single token too
    data, // ⭐ This is the key
    webpush: {
      notification: {
        title: payload.title,
        body: payload.body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: data.notificationId || 'default',
        renotify: false,
        requireInteraction: true,
      },
      fcmOptions: {
        link: data.url || '/',
      },
    },
    apns: {
      payload: {
        aps: {
          alert: {
            title: payload.title,
            body: payload.body,
          },
          badge: 1,
          sound: 'default',
        },
      },
    },
  }

  try {
    await msg.send(message)
    return true
  }
  catch (error: any) {
    if (
      error?.code === 'messaging/registration-token-not-registered' ||
      error?.code === 'messaging/invalid-registration-token'
    ) {
      await prisma.deviceToken.deleteMany({ where: { token } })
    }
    console.error('[fcm] single send error:', error)
    return false
  }
}

export async function registerDeviceToken(
  userId: string,
  token: string,
  deviceType?: string,
): Promise<void> {
  await prisma.deviceToken.upsert({
    where: { token },
    update: { userId, deviceType, lastUsedAt: new Date() },
    create: { userId, token, deviceType },
  })
}

export async function unregisterDeviceToken(token: string): Promise<void> {
  await prisma.deviceToken.deleteMany({ where: { token } })
}