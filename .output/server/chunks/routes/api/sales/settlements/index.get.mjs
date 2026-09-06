import { d as defineEventHandler, f as getRouterParam, c as createError } from '../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../_/permissions.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
import { g as getDistributorCustody, s as serializeSettlement } from '../../../../_/settlement.mjs';
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
  await requirePermission(event, "SALES", "READ");
  const id = getRouterParam(event, "id");
  const settlement = await prisma.settlement.findUnique({
    where: { id },
    include: {
      distributor: { select: { id: true, name: true } },
      confirmedByUser: { select: { id: true, name: true } }
    }
  });
  if (!settlement) {
    throw createError({ statusCode: 404, statusMessage: "Settlement not found" });
  }
  const custodySummary = await getDistributorCustody(prisma, settlement.distributorId);
  return {
    settlement: serializeSettlement(settlement),
    custodySummary
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
