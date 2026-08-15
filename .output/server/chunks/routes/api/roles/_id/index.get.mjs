import { d as defineEventHandler, g as getRouterParam } from '../../../../nitro/nitro.mjs';
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
  const roleId = getRouterParam(event, "id");
  const rolePerms = await prisma.rolePermission.findMany({
    where: { roleId },
    select: { permissionId: true }
  });
  return { permissionIds: rolePerms.map((rp) => rp.permissionId) };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
