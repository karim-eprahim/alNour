import { d as defineEventHandler, f as getRouterParam } from '../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../_/permissions.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
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
