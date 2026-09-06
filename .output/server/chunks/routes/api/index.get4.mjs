import { d as defineEventHandler, g as getQuery } from '../../nitro/nitro.mjs';
import { b as buildLedgerWhere, p as parsePagination, a as parseSort } from '../../_/ledger.mjs';
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
  const query = getQuery(event);
  const where = buildLedgerWhere(query);
  const { page, limit, skip } = parsePagination(query);
  const orderBy = parseSort(query);
  const [entries, total] = await Promise.all([
    prisma.ledgerEntry.findMany({
      where,
      include: {
        customer: { select: { id: true, name: true } },
        supplier: { select: { id: true, name: true } },
        worker: { select: { id: true, name: true } },
        distributor: { select: { id: true, name: true } }
      },
      orderBy,
      skip,
      take: limit
    }),
    prisma.ledgerEntry.count({ where })
  ]);
  return { entries, total, page, limit };
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
