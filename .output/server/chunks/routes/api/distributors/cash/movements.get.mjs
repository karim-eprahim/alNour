import { d as defineEventHandler, f as getQuery } from '../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../_/permissions.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
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

const movements_get = defineEventHandler(async (event) => {
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
  if (query.type) where.type = query.type;
  const [movements, total] = await Promise.all([
    prisma.distributorCashMovement.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),
    prisma.distributorCashMovement.count({ where })
  ]);
  return { movements, total, page, limit };
});

export { movements_get as default };
//# sourceMappingURL=movements.get.mjs.map
