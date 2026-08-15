import { d as defineEventHandler, f as getQuery } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { g as getDistributorCustody, s as serializeSettlement } from '../../../_/settlement.mjs';
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
  const auth = event.context.auth;
  await requirePermission(event, "SALES", "READ");
  const query = getQuery(event);
  const distributorId = query.distributorId || auth.userId;
  if (distributorId !== auth.userId) {
    await requirePermission(event, "USERS", "READ");
  }
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const skip = (page - 1) * limit;
  const where = { distributorId };
  if (query.status) {
    const statuses = query.status.split(",");
    where.status = { in: statuses };
  }
  const [settlements, total, custodySummary] = await Promise.all([
    prisma.settlement.findMany({
      where,
      include: {
        distributor: { select: { id: true, name: true } },
        confirmedByUser: { select: { id: true, name: true } }
      },
      orderBy: { submittedAt: "desc" },
      skip,
      take: limit
    }),
    prisma.settlement.count({ where }),
    getDistributorCustody(prisma, distributorId)
  ]);
  return {
    settlements: settlements.map(serializeSettlement),
    total,
    page,
    limit,
    summary: {
      collected: custodySummary.collected,
      confirmed: custodySummary.confirmed,
      custody: custodySummary.custody
    }
  };
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
