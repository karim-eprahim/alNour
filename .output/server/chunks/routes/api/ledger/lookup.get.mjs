import { d as defineEventHandler, g as getQuery } from '../../../nitro/nitro.mjs';
import { p as parseLookupQuery, a as paginatedLookup } from '../../../_/lookup.mjs';
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

const lookup_get = defineEventHandler(async (event) => {
  const { q, cursor, take } = parseLookupQuery(event);
  const query = getQuery(event);
  const where = {};
  if (q && q.length >= 2) {
    where.description = { contains: q, mode: "insensitive" };
  }
  for (const field of ["customerId", "supplierId", "workerId", "distributorId"]) {
    if (query[field]) {
      where[field] = query[field];
    }
  }
  if (query.type) {
    where.type = query.type;
  }
  const result = await paginatedLookup(prisma.ledgerEntry, {
    where,
    take,
    cursor,
    orderBy: { createdAt: "desc" },
    select: { id: true, description: true, amount: true, type: true, createdAt: true }
  });
  return {
    items: result.items.map((i) => ({
      value: i.id,
      label: i.description || `Ledger #${i.id.slice(0, 8)}`,
      subtitle: `${i.type} ${Number(i.amount).toFixed(2)}`
    })),
    nextCursor: result.nextCursor
  };
});

export { lookup_get as default };
//# sourceMappingURL=lookup.get.mjs.map
