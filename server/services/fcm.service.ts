import { getApp, getApps, initializeApp, type App } from 'firebase-admin/app'
import { getMessaging, type Messaging, type MulticastMessage, type Message } from 'firebase-admin/messaging'
import { cert } from 'firebase-admin/app'
import prisma from '../utils/prisma'

let messaging: Messaging | null = null
let app: App | null = null

function initFirebase(): Messaging | null {
  if (messaging) return messaging
  
  if (getApps().length === 0) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    if (serviceAccount) {
      try {
        const credentials = JSON.parse(serviceAccount)
        app = initializeApp({
          credential: cert({
            projectId: credentials.project_id,
            clientEmail: credentials.client_email,
            privateKey: credentials.private_key,
          }),
        })
      } catch (e) {
        console.error('Failed to initialize Firebase Admin:', e)
        return null
      }
    } else {
      console.warn('FIREBASE_SERVICE_ACCOUNT not configured, FCM disabled')
      return null
    }
  } else {
    app = getApp()
  }
  
  messaging = getMessaging(app)
  return messaging
}

interface PushPayload {
  title: string
  body: string
  data?: Record<string, string>
  userId: string
}

export async function sendPushNotification(payload: PushPayload): Promise<boolean> {
  const msg = initFirebase()
  if (!msg) return false

  const tokens = await prisma.deviceToken.findMany({
    where: { userId: payload.userId },
    select: { token: true },
  })

  if (tokens.length === 0) return false

  const fcmTokens = tokens.map((t) => t.token)
  const message: MulticastMessage = {
    tokens: fcmTokens,
    notification: {
      title: payload.title,
      body: payload.body,
    },
    data: {
      ...payload.data,
      click_action: 'FLUTTER_NOTIFICATION_CLICK',
    },
    webpush: {
      notification: {
        title: payload.title,
        body: payload.body,
        icon: '/icons/icon-192x192.png',
      },
      fcmOptions: {
        link: payload.data?.url || '/',
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
    const response = await msg.sendEachForMulticast(message)
    
    const failedTokens: string[] = []
    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        const error = resp.error
        if (error?.code === 'messaging/registration-token-not-registered' ||
            error?.code === 'messaging/invalid-registration-token' ||
            error?.code === 'messaging/unregistered') {
          const token = fcmTokens[idx]
          if (token) failedTokens.push(token)
        }
      }
    })

    if (failedTokens.length > 0) {
      await prisma.deviceToken.deleteMany({
        where: { token: { in: failedTokens } }
      })
    }

    return response.successCount > 0
  } catch (error) {
    console.error('FCM send error:', error)
    return false
  }
}

export async function sendPushToToken(token: string, payload: Omit<PushPayload, 'userId'>): Promise<boolean> {
  const msg = initFirebase()
  if (!msg) return false

  const message: Message = {
    token,
    notification: {
      title: payload.title,
      body: payload.body,
    },
    data: payload.data,
  }

  try {
    await msg.send(message)
    return true
  } catch (error: any) {
    if (error.code === 'messaging/registration-token-not-registered' ||
        error.code === 'messaging/invalid-registration-token') {
      await prisma.deviceToken.deleteMany({ where: { token } })
    }
    console.error('FCM single send error:', error)
    return false
  }
}

export async function registerDeviceToken(
  userId: string,
  token: string,
  deviceType?: string
): Promise<void> {
  await prisma.deviceToken.upsert({
    where: { token },
    update: { userId, deviceType, createdAt: new Date() },
    create: { userId, token, deviceType },
  })
}

export async function unregisterDeviceToken(token: string): Promise<void> {
  await prisma.deviceToken.deleteMany({ where: { token } })
}