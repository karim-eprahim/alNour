import { d as defineEventHandler, g as getRouterParam, f as getQuery, c as createError } from '../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../_/permissions.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
import { s as serializeLocation } from '../../../../_/tracking.mjs';
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

const locations_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  await requirePermission(event, "GPS", "READ");
  const id = getRouterParam(event, "id");
  const query = getQuery(event);
  const limit = Math.min(parseInt(query.limit) || 2e3, 5e3);
  const tracking = await prisma.deliveryTracking.findUnique({
    where: { id },
    include: {
      salesOrder: {
        select: {
          id: true,
          orderNumber: true,
          status: true,
          customer: { select: { id: true, name: true, phone: true, address: true, latitude: true, longitude: true } },
          assignedDistributor: { select: { id: true, name: true } }
        }
      }
    }
  });
  if (!tracking) {
    throw createError({ statusCode: 404, statusMessage: "Tracking session not found" });
  }
  const locations = await prisma.deliveryLocation.findMany({
    where: { deliveryTrackingId: id },
    orderBy: { recordedAt: "asc" },
    take: limit
  });
  const order = tracking.salesOrder;
  return {
    tracking: {
      id: tracking.id,
      status: tracking.status,
      startedAt: tracking.startedAt,
      endedAt: tracking.endedAt,
      lastUpdatedAt: tracking.lastUpdatedAt,
      distributor: {
        id: (_b = (_a = order.assignedDistributor) == null ? void 0 : _a.id) != null ? _b : "",
        name: (_d = (_c = order.assignedDistributor) == null ? void 0 : _c.name) != null ? _d : "Distributor"
      },
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status
      },
      customer: {
        id: order.customer.id,
        name: order.customer.name,
        phone: order.customer.phone,
        address: order.customer.address,
        latitude: order.customer.latitude,
        longitude: order.customer.longitude
      }
    },
    locations: locations.map(serializeLocation),
    total: locations.length,
    limit
  };
});

export { locations_get as default };
//# sourceMappingURL=locations.get.mjs.map
