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

  realtime.broadcastToUser(input.userId, 'NOTIFICATION_CREATED', payload)
  console.log("paylllllllod",payload)

  if (input.sendPush !== false) {
    sendPushNotification({
      userId: input.userId,
      title: input.title,
      body: input.message,
      data: {
        notificationId: notification.id,
        type: input.type,
        ...input.data,
      }
    }).catch(console.error)
  }

  return notification
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

    const payload = {
      ...notification,
      data: notification.data as Record<string, any> | null
    }

    realtime.broadcastToUser(notification.userId, 'NOTIFICATION_CREATED', payload)

    if (input.sendPush !== false) {
      sendPushNotification({
        userId: notification.userId,
        title: input.title,
        body: input.message,
        data: {
          notificationId: notification.id,
          type: input.type,
          ...input.data,
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