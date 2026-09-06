import { d as defineEventHandler, f as getRouterParam, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { g as getOwnerFilter } from '../../../_/ledger.mjs';
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

const _id__patch = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const existing = await prisma.ledgerEntry.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Ledger entry not found" });
  }
  const data = {};
  if (body.amount !== void 0) {
    data.amount = parseFloat(body.amount);
  }
  if (body.type !== void 0) {
    if (!["DEBIT", "CREDIT"].includes(body.type)) {
      throw createError({ statusCode: 400, statusMessage: "Type must be DEBIT or CREDIT" });
    }
    data.type = body.type;
  }
  if (body.description !== void 0) {
    data.description = body.description;
  }
  if (body.customerId || body.supplierId || body.workerId || body.distributorId) {
    const ownerFilter = getOwnerFilter(body);
    Object.assign(data, ownerFilter);
  }
  const entry = await prisma.ledgerEntry.update({
    where: { id },
    data,
    include: {
      customer: { select: { id: true, name: true } },
      supplier: { select: { id: true, name: true } },
      worker: { select: { id: true, name: true } },
      distributor: { select: { id: true, name: true } }
    }
  });
  return { entry };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
