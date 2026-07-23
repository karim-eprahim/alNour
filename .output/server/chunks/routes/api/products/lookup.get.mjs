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
  await requirePermission(event, "PRODUCTS", "READ");
  const { q, cursor, take, warehouseId } = parseLookupQuery(event);
  const where = {};
  Object.assign(where, buildSearchWhere(q, ["name", "nameAr", "sku"]));
  if (warehouseId) {
    await validateWarehouseAccess(event, warehouseId);
    where.stocks = { some: { warehouseId } };
  } else {
    const warehouseIds = await getAccessibleWarehouseIds(event);
    if (warehouseIds !== null) {
      where.stocks = { some: { warehouseId: { in: warehouseIds } } };
    }
  }
  const result = await paginatedLookup(prisma.product, {
    where,
    take,
    cursor,
    select: { id: true, name: true, nameAr: true },
    orderBy: { name: "asc" }
  });
  return {
    items: result.items.map((i) => ({
      value: i.id,
      label: i.name,
      subtitle: i.nameAr || void 0
    })),
    nextCursor: result.nextCursor
  };
});

export { lookup_get as default };
//# sourceMappingURL=lookup.get.mjs.map
