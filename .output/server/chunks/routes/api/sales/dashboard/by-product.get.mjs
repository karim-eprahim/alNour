import { d as defineEventHandler, g as getQuery } from '../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../_/permissions.mjs';
import { p as parseDashboardPeriod } from '../../../../_/period.mjs';
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

const byProduct_get = defineEventHandler(async (event) => {
  await requirePermission(event, "SALES", "READ");
  const query = getQuery(event);
  const { start, end } = parseDashboardPeriod(query);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 8, 1), 20);
  const invoiceWhere = {
    status: { not: "CANCELLED" },
    createdAt: { gte: start, lte: end }
  };
  const warehouseIds = await getAccessibleWarehouseIds(event);
  if (warehouseIds !== null) {
    invoiceWhere.warehouseId = { in: warehouseIds };
  }
  const grouped = await prisma.invoiceItem.groupBy({
    by: ["productId"],
    where: { invoice: invoiceWhere },
    _sum: { quantity: true, totalPrice: true },
    orderBy: { _sum: { totalPrice: "desc" } },
    take: limit
  });
  const products = await prisma.product.findMany({
    where: { id: { in: grouped.map((g) => g.productId) } },
    select: { id: true, name: true }
  });
  const nameById = new Map(products.map((p) => [p.id, p.name]));
  const data = grouped.map((g) => {
    var _a, _b;
    return {
      product: nameById.get(g.productId) || g.productId,
      sales: ((_a = g._sum.totalPrice) == null ? void 0 : _a.toNumber()) || 0,
      quantity: ((_b = g._sum.quantity) == null ? void 0 : _b.toNumber()) || 0
    };
  });
  return { data };
});

export { byProduct_get as default };
//# sourceMappingURL=by-product.get.mjs.map
