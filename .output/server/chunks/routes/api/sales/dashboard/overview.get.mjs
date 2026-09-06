import { d as defineEventHandler, g as getQuery } from '../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../_/permissions.mjs';
import { p as parseDashboardPeriod, d as dayKey } from '../../../../_/period.mjs';
import { g as getAccessibleWarehouseIds } from '../../../../_/warehouse-access.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
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

const overview_get = defineEventHandler(async (event) => {
  await requirePermission(event, "SALES", "READ");
  const query = getQuery(event);
  const { start, end } = parseDashboardPeriod(query);
  const invoiceWhere = {
    status: { not: "CANCELLED" },
    createdAt: { gte: start, lte: end }
  };
  const warehouseIds = await getAccessibleWarehouseIds(event);
  if (warehouseIds !== null) {
    invoiceWhere.warehouseId = { in: warehouseIds };
  }
  const invoices = await prisma.invoice.findMany({
    where: invoiceWhere,
    select: { createdAt: true, totalAmount: true }
  });
  const byDay = /* @__PURE__ */ new Map();
  for (const inv of invoices) {
    const key = dayKey(inv.createdAt);
    byDay.set(key, (byDay.get(key) || 0) + inv.totalAmount.toNumber());
  }
  const data = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    const key = dayKey(cursor);
    data.push({ date: key, sales: byDay.get(key) || 0 });
    cursor.setDate(cursor.getDate() + 1);
  }
  return { data };
});

export { overview_get as default };
//# sourceMappingURL=overview.get.mjs.map
