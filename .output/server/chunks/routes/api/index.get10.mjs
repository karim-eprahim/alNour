import { d as defineEventHandler, f as getQuery } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
import { v as validateWarehouseAccess, g as getAccessibleWarehouseIds } from '../../_/warehouse-access.mjs';
import { p as prisma } from '../../_/prisma.mjs';
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

const index_get = defineEventHandler(async (event) => {
  await requirePermission(event, "INVENTORY", "READ");
  const query = getQuery(event);
  const where = {};
  if (query.warehouseId) {
    await validateWarehouseAccess(event, query.warehouseId);
    where.warehouseId = query.warehouseId;
  } else {
    const warehouseIds = await getAccessibleWarehouseIds(event);
    if (warehouseIds !== null) {
      where.warehouseId = { in: warehouseIds };
    }
  }
  if (query.productId) where.productId = query.productId;
  if (query.lowStock) {
    where.quantity = { lte: parseFloat(query.lowStock) };
  }
  const [stocks, total] = await Promise.all([
    prisma.stock.findMany({
      where,
      include: {
        product: true,
        warehouse: true
      },
      orderBy: [
        { warehouse: { name: "asc" } },
        { product: { name: "asc" } }
      ]
    }),
    prisma.stock.count({ where })
  ]);
  return { stocks, total };
});

export { index_get as default };
//# sourceMappingURL=index.get10.mjs.map
