import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { p as parseLookupQuery, b as buildSearchWhere, a as paginatedLookup, t as toLookupItem } from '../../../_/lookup.mjs';
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
  await requirePermission(event, "WORKERS", "READ");
  const { q, cursor, take, includeInactive } = parseLookupQuery(event);
  const where = {};
  if (!includeInactive) {
    where.isActive = true;
  }
  Object.assign(where, buildSearchWhere(q, ["name", "phone"]));
  const result = await paginatedLookup(prisma.worker, {
    where,
    take,
    cursor,
    select: { id: true, name: true, phone: true },
    orderBy: { name: "asc" }
  });
  return {
    items: result.items.map((i) => toLookupItem(i, "name", "id", "phone")),
    nextCursor: result.nextCursor
  };
});

export { lookup_get as default };
//# sourceMappingURL=lookup.get.mjs.map
