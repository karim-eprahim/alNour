import { d as defineEventHandler, g as getRouterParam, r as readBody, c as createError } from '../../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../../_/permissions.mjs';
import { p as prisma } from '../../../../../_/prisma.mjs';
import { v as validateTrackedLocation, g as getActiveTrackingForEvent, s as serializeLocation } from '../../../../../_/tracking.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jsonwebtoken';
import '@prisma/client';
import '@prisma/adapter-pg';
import 'pg';

const location_post = defineEventHandler(async (event) => {
  event.context.auth;
  await requirePermission(event, "GPS", "UPDATE");
  const trackingId = getRouterParam(event, "id");
  const body = await readBody(event);
  const input = validateTrackedLocation(body);
  if (!trackingId) {
    throw createError({ statusCode: 400, statusMessage: "Tracking id is required" });
  }
  const tracking = await getActiveTrackingForEvent(event, trackingId);
  if (tracking.status !== "ACTIVE") {
    throw createError({ statusCode: 400, statusMessage: "Tracking session is not active" });
  }
  if (tracking.salesOrder.status !== "OUT_FOR_DELIVERY") {
    throw createError({ statusCode: 400, statusMessage: "Order is not in a trackable state" });
  }
  const result = await prisma.$transaction(async (tx) => {
    var _a, _b, _c;
    const recordedAt = input.recordedAt || /* @__PURE__ */ new Date();
    const created = await tx.deliveryLocation.create({
      data: {
        deliveryTrackingId: trackingId,
        latitude: input.latitude,
        longitude: input.longitude,
        accuracy: (_a = input.accuracy) != null ? _a : null,
        speed: (_b = input.speed) != null ? _b : null,
        heading: (_c = input.heading) != null ? _c : null,
        recordedAt
      }
    });
    const now = /* @__PURE__ */ new Date();
    if (now > tracking.lastUpdatedAt) {
      await tx.deliveryTracking.update({
        where: { id: trackingId },
        data: { lastUpdatedAt: now }
      });
    }
    return created;
  });
  const lastUpdatedAt = result.recordedAt > tracking.lastUpdatedAt ? result.recordedAt : tracking.lastUpdatedAt;
  return { location: serializeLocation(result), lastUpdatedAt };
});

export { location_post as default };
//# sourceMappingURL=location.post.mjs.map
