import { p as prisma } from './prisma.mjs';
import { realtime } from '../routes/_ws.mjs';
import { s as sendPushNotification } from './fcm.service.mjs';

async function createNotification(input) {
  var _a, _b;
  const notification = await prisma.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      data: (_a = input.data) != null ? _a : {}
    }
  });
  ({
    ...notification,
    data: notification.data
  });
  realtime.broadcastToUser(input.userId, "NOTIFICATION_CREATED", {
    id: notification.id,
    userId: notification.userId,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    body: notification.message,
    // kept for backward compatibility
    data: notification.data,
    createdAt: notification.createdAt,
    readAt: notification.readAt
  });
  if (input.sendPush !== false) {
    sendPushNotification({
      userId: input.userId,
      title: input.title,
      body: input.message,
      data: {
        notificationId: notification.id,
        // ⭐ Critical for dedupe
        type: input.type,
        url: ((_b = input.data) == null ? void 0 : _b.url) || "/",
        ...toStringMap(input.data)
      }
    }).catch(console.error);
  }
  return notification;
}
async function notifyUser(userId, payload) {
  var _a;
  return createNotification({
    userId,
    type: payload.type,
    title: payload.title,
    message: payload.message,
    data: (_a = payload.data) != null ? _a : {},
    sendPush: true
  });
}
function toStringMap(data) {
  if (!data) return {};
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === null || value === void 0 ? "" : String(value)
    ])
  );
}
async function emitOrderStatusUpdate(orderId, data) {
  realtime.broadcastToRoom(`order:${orderId}`, "ORDER_STATUS_UPDATED", data);
}

export { createNotification as c, emitOrderStatusUpdate as e, notifyUser as n };
//# sourceMappingURL=notification.service.mjs.map
