import { d as defineEventHandler, g as getQuery } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { p as parseDashboardPeriod, d as dayKey } from '../../../_/period.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
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

const index_get = defineEventHandler(async (event) => {
  var _a;
  const auth = event.context.auth;
  await requirePermission(event, "SALES", "READ");
  const query = getQuery(event);
  const { start, end } = parseDashboardPeriod(query);
  const distributorId = query.distributorId || auth.userId;
  if (distributorId !== auth.userId) {
    await requirePermission(event, "USERS", "READ");
  }
  const orderWhere = {
    assignedDistributorId: distributorId,
    createdAt: { gte: start, lte: end }
  };
  const [statusGroups, orderCount, deliveredCount, invoiceAgg, completedOrders] = await Promise.all([
    prisma.salesOrder.groupBy({
      by: ["status"],
      where: orderWhere,
      _count: { _all: true }
    }),
    prisma.salesOrder.count({ where: orderWhere }),
    prisma.salesOrder.count({ where: { ...orderWhere, status: "COMPLETED" } }),
    prisma.invoice.aggregate({
      _sum: { totalAmount: true },
      where: {
        createdById: distributorId,
        status: { not: "CANCELLED" },
        createdAt: { gte: start, lte: end }
      }
    }),
    prisma.salesOrder.findMany({
      where: { ...orderWhere, status: "COMPLETED" },
      select: { completedAt: true }
    })
  ]);
  const byDay = /* @__PURE__ */ new Map();
  for (const order of completedOrders) {
    if (!order.completedAt)
      continue;
    const key = dayKey(order.completedAt);
    byDay.set(key, (byDay.get(key) || 0) + 1);
  }
  const deliveries = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    const key = dayKey(cursor);
    deliveries.push({ date: key, delivered: byDay.get(key) || 0 });
    cursor.setDate(cursor.getDate() + 1);
  }
  const salesAmount = ((_a = invoiceAgg._sum.totalAmount) == null ? void 0 : _a.toNumber()) || 0;
  return {
    orderStatus: statusGroups.map((group) => ({
      status: group.status,
      count: group._count._all
    })),
    performance: {
      orders: orderCount,
      delivered: deliveredCount,
      salesAmount,
      deliveredRate: orderCount > 0 ? Math.round(deliveredCount / orderCount * 100) : 0
    },
    deliveries
  };
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
