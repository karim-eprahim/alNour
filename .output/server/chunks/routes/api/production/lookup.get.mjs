import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { p as parseLookupQuery, b as buildSearchWhere, a as paginatedLookup } from '../../../_/lookup.mjs';
import { v as validateWarehouseAccess, g as getAccessibleWarehouseIds } from '../../../_/warehouse-access.mjs';
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

const lookup_get = defineEventHandler(async (event) => {
  await requirePermission(event, "PRODUCTION", "READ");
  const { q, cursor, take, warehouseId } = parseLookupQuery(event);
  const where = {};
  Object.assign(where, buildSearchWhere(q, ["batchNumber"]));
  if (warehouseId) {
    await validateWarehouseAccess(event, warehouseId);
    where.warehouseId = warehouseId;
  } else {
    const warehouseIds = await getAccessibleWarehouseIds(event);
    if (warehouseIds !== null) {
      where.warehouseId = { in: warehouseIds };
    }
  }
  const result = await paginatedLookup(prisma.productionBatch, {
    where,
    take,
    cursor,
    select: { id: true, batchNumber: true },
    orderBy: { createdAt: "desc" }
  });
  return {
    items: result.items.map((i) => ({ value: i.id, label: i.batchNumber })),
    nextCursor: result.nextCursor
  };
});

export { lookup_get as default };
//# sourceMappingURL=lookup.get.mjs.map
