import { d as defineEventHandler, f as getRouterParam, r as readBody, c as createError } from '../../../../nitro/nitro.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
import { OrderStatus } from '@prisma/client';
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

const status_patch = defineEventHandler(async (event) => {
  const auth = event.context.auth;
  const orderId = getRouterParam(event, "id");
  const body = await readBody(event);
  const { status, cancelReason, deliveryResult } = body;
  if (!(auth == null ? void 0 : auth.userId)) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }
  const result = await prisma.$transaction(async (tx) => {
    const existingOrder = await tx.salesOrder.findUnique({
      where: { id: orderId },
      include: { customer: true, assignedDistributor: true }
    });
    if (!existingOrder) {
      throw createError({ statusCode: 404, statusMessage: "Order not found" });
    }
    const updateData = { status };
    if (status === OrderStatus.ACCEPTED) updateData.acceptedAt = /* @__PURE__ */ new Date();
    if (status === OrderStatus.OUT_FOR_DELIVERY) updateData.outForDeliveryAt = /* @__PURE__ */ new Date();
    if (status === OrderStatus.COMPLETED) updateData.completedAt = /* @__PURE__ */ new Date();
    if (status === OrderStatus.CANCELLED) updateData.cancelReason = cancelReason;
    if (deliveryResult) updateData.deliveryResult = deliveryResult;
    const updatedOrder = await tx.salesOrder.update({
      where: { id: orderId },
      data: updateData
    });
    let recipientId = existingOrder.createdById;
    let notificationTitle = `Order #${existingOrder.orderNumber} Updated`;
    let notificationMessage = `Status changed to ${status}`;
    if (status === OrderStatus.ASSIGNED && existingOrder.assignedDistributorId) {
      recipientId = existingOrder.assignedDistributorId;
      notificationTitle = "New Order Assigned";
      notificationMessage = `You have been assigned order #${existingOrder.orderNumber}`;
    } else if (status === OrderStatus.ACCEPTED) {
      notificationTitle = "Order Accepted";
      notificationMessage = `${auth.email} accepted order #${existingOrder.orderNumber}`;
    } else if (status === OrderStatus.CANCELLED) {
      notificationTitle = "Order Cancelled";
      notificationMessage = `Order #${existingOrder.orderNumber} was cancelled. Reason: ${cancelReason || "N/A"}`;
    }
    const notification = await tx.notification.create({
      data: {
        userId: recipientId,
        type: status === OrderStatus.ASSIGNED ? "ORDER_ASSIGNED" : status === OrderStatus.CANCELLED ? "ORDER_CANCELLED" : "ORDER_STATUS_UPDATED",
        title: notificationTitle,
        message: notificationMessage,
        data: {
          salesOrderId: updatedOrder.id,
          orderNumber: updatedOrder.orderNumber,
          previousStatus: existingOrder.status,
          newStatus: status
        }
      }
    });
    return { updatedOrder, notification };
  });
  return {
    success: true,
    data: result.updatedOrder,
    notification: result.notification
  };
});

export { status_patch as default };
//# sourceMappingURL=status.patch.mjs.map
