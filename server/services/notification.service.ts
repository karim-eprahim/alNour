import prisma from '../utils/prisma'
import type { NotificationType, Prisma, Notification } from '@prisma/client'
import { realtime } from '../routes/_ws'
import { sendPushNotification } from './fcm.service'

export interface CreateNotificationInput {
  userId: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, any>
  sendPush?: boolean
}

/**
 * Spec unified API payload. `body` maps to the Notification `message` column.
 * `type` must be a valid NotificationType (e.g. 'ORDER_ASSIGNED').
 */
export interface NotifyPayload {
  type: NotificationType | string
  title: string
  message: string
  body: string
  data?: Record<string, any>
}

/**
 * Creates a single notification record in PostgreSQL and emits realtime events.
 */
export async function createNotification(input: CreateNotificationInput): Promise<Notification> {
  const notification = await prisma.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      data: (input.data as Prisma.InputJsonValue) ?? {}
    }
  })

  const payload = {
    ...notification,
    data: notification.data as Record<string, any> | null
  }

  // ✅ WebSocket: realtime delivery (app is open)
  // The notification ID is included for dedupe on the client.
  // Field names must match the client `Notification` type (message, not body).
  realtime.broadcastToUser(input.userId, 'NOTIFICATION_CREATED', {
    id: notification.id,
    userId: notification.userId,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    body: notification.message, // kept for backward compatibility
    data: notification.data as Record<string, any> | null,
    createdAt: notification.createdAt,
    readAt: notification.readAt,
  })

  // ✅ FCM: push delivery (app is background/closed)
  if (input.sendPush !== false) {
    sendPushNotification({
      userId: input.userId,
      title: input.title,
      body: input.message,
      data: {
        notificationId: notification.id, // ⭐ Critical for dedupe
        type: input.type,
        url: input.data?.url || '/',
        ...toStringMap(input.data),
      }
    }).catch(console.error)
  }

  return notification
}

export async function notifyUser(userId: string, payload: NotifyPayload): Promise<Notification> {
  return createNotification({
    userId,
    type: payload.type as NotificationType,
    title: payload.title,
    message: payload.message,
    data: payload.data ?? {},
    sendPush: true,
  })
}

export async function notifyUsers(userIds: string[], payload: NotifyPayload): Promise<Notification[]> {
  return Promise.all(userIds.map(id => notifyUser(id, payload)))
}

function toStringMap(data?: Record<string, any>): Record<string, string> {
  if (!data) return {}
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === null || value === undefined ? '' : String(value),
    ]),
  )
}

/**
 * Creates bulk notifications for multiple recipients (e.g., all admins or managers).
 */
export async function createBulkNotifications(inputs: CreateNotificationInput[]): Promise<Notification[]> {
  const notifications = await prisma.notification.createManyAndReturn({
    data: inputs.map((input) => ({
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      data: (input.data as Prisma.InputJsonValue) ?? {}
    }))
  })

  for (const notification of notifications) {
    const input = inputs.find(i => i.userId === notification.userId)
    if (!input) continue

    // ✅ WebSocket: broadcast to each user
    realtime.broadcastToUser(notification.userId, 'NOTIFICATION_CREATED', {
      id: notification.id,
      userId: notification.userId,
      type: notification.type,
      title: notification.title,
      body: notification.message,
      message: notification.message,
      data: notification.data as Record<string, any> | null,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    })

    // ✅ FCM: send push to each user
    if (input.sendPush !== false) {
      sendPushNotification({
        userId: notification.userId,
        title: input.title,
        body: input.message,
        data: {
          notificationId: notification.id, // ⭐ Critical for dedupe
          type: input.type,
          url: input.data?.url || '/',
          ...toStringMap(input.data),
        }
      }).catch(console.error)
    }
  }

  return notifications
}

export async function emitOrderStatusUpdate(orderId: string, data: any) {
  realtime.broadcastToRoom(`order:${orderId}`, 'ORDER_STATUS_UPDATED', data)
  // realtime.broadcastToRole('ADMIN', 'ORDER_STATUS_UPDATED', data)
  // realtime.broadcastToRole('MANAGER', 'ORDER_STATUS_UPDATED', data)
}