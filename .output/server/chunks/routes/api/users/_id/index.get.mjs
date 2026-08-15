import { d as defineEventHandler, g as getRouterParam } from '../../../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  await requirePermission(event, "USERS", "READ");
  const userId = getRouterParam(event, "id");
  const userPermissions = await prisma.userPermission.findMany({
    where: { userId },
    include: { permission: true }
  });
  return { userPermissions };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
