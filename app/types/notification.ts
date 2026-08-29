export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  data: Record<string, any> | null
  readAt: string | null
  createdAt: string
}

export type NotificationType =
  | 'ORDER_ASSIGNED'
  | 'ORDER_STATUS_UPDATED'
  | 'ORDER_CANCELLED'
  | 'SETTLEMENT_SUBMITTED'
  | 'STOCK_ALERT'
  | 'SYSTEM_ALERT'

export interface NotificationPayload {
  items: Notification[]
  total: number
  unreadCount: number
  page: number
  totalPages: number
}

export interface CreateNotificationInput {
  userId: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, any>
  sendPush?: boolean
}

export interface DeviceToken {
  id: string
  userId: string
  token: string
  deviceType: string | null
  createdAt: string
}