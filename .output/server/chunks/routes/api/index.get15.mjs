import { d as defineEventHandler, g as getQuery } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
import { g as getAccessibleWarehouseIds } from '../../_/warehouse-access.mjs';
import { p as prisma } from '../../_/prisma.mjs';
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
  await requirePermission(event, "WAREHOUSES", "READ");
  const query = getQuery(event);
  const where = {};
  const warehouseIds = await getAccessibleWarehouseIds(event);
  if (warehouseIds !== null) {
    where.id = { in: warehouseIds };
  }
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { location: { contains: query.search, mode: "insensitive" } }
    ];
  }
  const [warehouses, total] = await Promise.all([
    prisma.warehouse.findMany({
      where,
      include: {
        _count: { select: { stocks: true, movements: true } }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.warehouse.count({ where })
  ]);
  return { warehouses, total };
});

export { index_get as default };
//# sourceMappingURL=index.get15.mjs.map
