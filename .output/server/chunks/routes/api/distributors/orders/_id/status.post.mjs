import { d as defineEventHandler, f as getRouterParam, r as readBody, c as createError } from '../../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../../_/permissions.mjs';
import { p as prisma } from '../../../../../_/prisma.mjs';
import { c as createNotification, e as emitOrderStatusUpdate } from '../../../../../_/notification.service.mjs';
import { NotificationType } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jsonwebtoken';
import '@prisma/adapter-pg';
import 'pg';
import '../../../../_ws.mjs';
import '../../../../../_/fcm.service.mjs';
import 'firebase-admin/app';
import 'firebase-admin/messaging';

const TRANSITIONS = {
  ASSIGNED: "ACCEPTED",
  ACCEPTED: "OUT_FOR_DELIVERY"
};
const VALID_TARGETS = new Set(Object.values(TRANSITIONS));
const TIMESTAMPS = {
  ACCEPTED: "acceptedAt",
  OUT_FOR_DELIVERY: "outForDeliveryAt"
};
const status_post = defineEventHandler(async (event) => {
  const auth = event.context.auth;
  await requirePermission(event, "SALES", "UPDATE");
  let id = getRouterParam(event, "id") || "";
  const body = await readBody(event);
  const targetStatus = body.status;
  if (!VALID_TARGETS.has(targetStatus)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid target status" });
  }
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Order id is required" });
  }
  const order = await prisma.salesOrder.findFirst({
    where: { id, assignedDistributorId: auth.userId, status: { not: "PENDING" } },
    include: { createdBy: { select: { id: true, name: true } } }
  });
  if (!order) {
    throw createError({ statusCode: 404, statusMessage: "Order not found" });
  }
  if (TRANSITIONS[order.status] !== targetStatus) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid status transition from ${order.status} to ${targetStatus}`
    });
  }
  const timestampField = TIMESTAMPS[targetStatus];
  const data = { status: targetStatus };
  if (timestampField) data[timestampField] = /* @__PURE__ */ new Date();
  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.salesOrder.update({ where: { id }, data });
    let tracking = null;
    if (targetStatus === "OUT_FOR_DELIVERY") {
      const existing = await tx.deliveryTracking.findFirst({
        where: { salesOrderId: id, status: "ACTIVE" }
      });
      if (existing) {
        throw createError({ statusCode: 409, statusMessage: "A tracking session is already active for this order" });
      }
      tracking = await tx.deliveryTracking.create({
        data: {
          salesOrderId: id,
          distributorId: auth.userId,
          status: "ACTIVE",
          startedAt: /* @__PURE__ */ new Date(),
          lastUpdatedAt: /* @__PURE__ */ new Date()
        }
      });
    }
    await createNotification({
      userId: order.createdById,
      type: NotificationType.ORDER_STATUS_UPDATED,
      title: "Order Status Updated",
      message: `Order #${order.orderNumber} status changed to ${targetStatus} by ${auth.name || "Distributor"}`,
      data: {
        salesOrderId: updated.id,
        orderNumber: updated.orderNumber,
        previousStatus: order.status,
        newStatus: targetStatus,
        updatedBy: auth.userId
      },
      sendPush: true
    });
    return { updated, tracking };
  });
  emitOrderStatusUpdate(id, {
    salesOrderId: result.updated.id,
    orderNumber: order.orderNumber,
    status: result.updated.status,
    updatedBy: auth.userId
  });
  return {
    order: { id: result.updated.id, status: result.updated.status },
    tracking: result.tracking ? { id: result.tracking.id, status: result.tracking.status } : null
  };
});

export { status_post as default };
//# sourceMappingURL=status.post.mjs.map
