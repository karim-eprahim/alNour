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
  await requirePermission(event, "PRODUCTS", "READ");
  const query = getQuery(event);
  const where = {};
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { nameAr: { contains: query.search, mode: "insensitive" } },
      { sku: { contains: query.search, mode: "insensitive" } }
    ];
  }
  if (query.type) where.type = query.type;
  if (query.warehouseId) {
    await validateWarehouseAccess(event, query.warehouseId);
    where.stocks = { some: { warehouseId: query.warehouseId } };
  } else {
    const warehouseIds = await getAccessibleWarehouseIds(event);
    if (warehouseIds !== null) {
      where.stocks = { some: { warehouseId: { in: warehouseIds } } };
    }
  }
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        stocks: { include: { warehouse: true } },
        _count: { select: { movements: true } }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.product.count({ where })
  ]);
  return { products, total };
});

export { index_get as default };
//# sourceMappingURL=index.get6.mjs.map
