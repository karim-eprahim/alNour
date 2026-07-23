import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
import { p as prisma } from '../../_/prisma.mjs';
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
  const permissions = await prisma.permission.findMany({
    include: {
      module: { select: { id: true, name: true, label: true } },
      action: { select: { id: true, name: true, label: true } }
    },
    orderBy: [{ module: { name: "asc" } }, { action: { name: "asc" } }]
  });
  return { permissions };
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
