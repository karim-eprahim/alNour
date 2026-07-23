import { d as defineEventHandler, f as getQuery } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { g as getAccessibleWarehouseIds } from '../../../_/warehouse-access.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
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
  const warehouseIds = await getAccessibleWarehouseIds(event);
  if (warehouseIds !== null) {
    where.OR = [
      { fromWarehouseId: { in: warehouseIds } },
      { toWarehouseId: { in: warehouseIds } }
    ];
  }
  if (query.status) where.status = query.status;
  const [transfers, total] = await Promise.all([
    prisma.stockTransfer.findMany({
      where,
      include: {
        fromWarehouse: { select: { id: true, name: true } },
        toWarehouse: { select: { id: true, name: true } },
        items: { include: { product: { select: { id: true, name: true, sku: true } } } },
        createdBy: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.stockTransfer.count({ where })
  ]);
  return { transfers, total };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
