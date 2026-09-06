import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { c as assertExactlyOneOwner, g as getOwnerFilter } from '../../_/ledger.mjs';
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

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  assertExactlyOneOwner(body);
  if (!body.amount || isNaN(Number(body.amount))) {
    throw createError({ statusCode: 400, statusMessage: "Amount is required and must be a number" });
  }
  if (!body.type || !["DEBIT", "CREDIT"].includes(body.type)) {
    throw createError({ statusCode: 400, statusMessage: "Type must be DEBIT or CREDIT" });
  }
  const ownerFilter = getOwnerFilter(body);
  const entry = await prisma.ledgerEntry.create({
    data: {
      ...ownerFilter,
      amount: parseFloat(body.amount),
      type: body.type,
      description: body.description || null
    },
    include: {
      customer: { select: { id: true, name: true } },
      supplier: { select: { id: true, name: true } },
      worker: { select: { id: true, name: true } },
      distributor: { select: { id: true, name: true } }
    }
  });
  return { entry };
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
