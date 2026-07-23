import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
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

const options_get = defineEventHandler(async (event) => {
  await requirePermission(event, "USERS", "READ");
  const modules = await prisma.module.findMany({
    orderBy: { name: "asc" }
  });
  const actions = await prisma.permissionAction.findMany({
    orderBy: { name: "asc" }
  });
  return { modules, actions };
});

export { options_get as default };
//# sourceMappingURL=options.get.mjs.map
