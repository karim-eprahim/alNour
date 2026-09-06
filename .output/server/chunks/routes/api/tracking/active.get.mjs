import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { s as serializeLocation } from '../../../_/tracking.mjs';
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
import '@prisma/client';
import '@prisma/adapter-pg';
import 'pg';

const sessionInclude = {
  salesOrder: {
    select: {
      id: true,
      orderNumber: true,
      status: true,
      customer: { select: { id: true, name: true, phone: true, address: true, latitude: true, longitude: true } },
      assignedDistributor: { select: { id: true, name: true, phone: true } }
    }
  },
  locations: { orderBy: { recordedAt: "desc" }, take: 1 }
};
const active_get = defineEventHandler(async (event) => {
  await requirePermission(event, "GPS", "READ");
  const sessions = await prisma.deliveryTracking.findMany({
    where: { status: "ACTIVE" },
    include: sessionInclude,
    orderBy: { lastUpdatedAt: "desc" }
  });
  return {
    trackings: sessions.map((session) => {
      var _a, _b, _c;
      const order = session.salesOrder;
      const distributor = order.assignedDistributor;
      const currentLocation = serializeLocation(session.locations[0] || null);
      return {
        trackingId: session.id,
        status: session.status,
        startedAt: session.startedAt,
        lastUpdatedAt: session.lastUpdatedAt,
        distributor: {
          id: (_a = distributor == null ? void 0 : distributor.id) != null ? _a : "",
          name: (_b = distributor == null ? void 0 : distributor.name) != null ? _b : "Distributor",
          phone: (_c = distributor == null ? void 0 : distributor.phone) != null ? _c : null
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
        },
        currentLocation
      };
    })
  };
});

export { active_get as default };
//# sourceMappingURL=active.get.mjs.map
