import { d as defineEventHandler, f as getQuery, c as createError } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
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

const index_get = defineEventHandler(async (event) => {
  const auth = event.context.auth;
  await requirePermission(event, "SALES", "READ");
  const query = getQuery(event);
  const distributorId = query.distributorId || auth.userId;
  if (distributorId !== auth.userId) {
    await requirePermission(event, "USERS", "READ");
  }
  const distributor = await prisma.user.findUnique({
    where: { id: distributorId },
    select: {
      id: true,
      name: true,
      cashOnHand: true
    }
  });
  if (!distributor) {
    throw createError({ statusCode: 404, statusMessage: "Distributor not found" });
  }
  return { distributor };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
