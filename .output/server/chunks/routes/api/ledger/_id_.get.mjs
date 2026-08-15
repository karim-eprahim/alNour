import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const entry = await prisma.ledgerEntry.findUnique({
    where: { id },
    include: {
      customer: { select: { id: true, name: true } },
      supplier: { select: { id: true, name: true } },
      worker: { select: { id: true, name: true } },
      distributor: { select: { id: true, name: true } }
    }
  });
  if (!entry) {
    throw createError({ statusCode: 404, statusMessage: "Ledger entry not found" });
  }
  return { entry };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
