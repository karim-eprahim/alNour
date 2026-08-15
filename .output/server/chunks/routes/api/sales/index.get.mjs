import { d as defineEventHandler, f as getQuery } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { s as serializeSettlement } from '../../../_/settlement.mjs';
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
  await requirePermission(event, "SALES", "READ");
  const query = getQuery(event);
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const skip = (page - 1) * limit;
  const where = {};
  if (query.distributorId) {
    where.distributorId = query.distributorId;
  }
  if (query.status) {
    where.status = query.status;
  }
  if (query.paymentMethod) {
    where.paymentMethod = query.paymentMethod;
  }
  if (query.dateFrom || query.dateTo) {
    where.submittedAt = {};
    if (query.dateFrom) {
      where.submittedAt.gte = new Date(query.dateFrom);
    }
    if (query.dateTo) {
      where.submittedAt.lte = new Date(query.dateTo);
    }
  }
  if (query.search) {
    where.OR = [
      { settlementNumber: { contains: query.search, mode: "insensitive" } },
      { distributor: { name: { contains: query.search, mode: "insensitive" } } }
    ];
  }
  const [settlements, total, statusGroups] = await Promise.all([
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
    prisma.settlement.groupBy({ by: ["status"], _count: { _all: true } })
  ]);
  const summary = {};
  for (const g of statusGroups) {
    summary[g.status] = g._count._all;
  }
  return {
    settlements: settlements.map(serializeSettlement),
    total,
    page,
    limit,
    summary
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
