import { d as defineEventHandler, g as getRouterParam, c as createError, r as readBody } from '../../../../nitro/nitro.mjs';
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

const index_put = defineEventHandler(async (event) => {
  const roleId = getRouterParam(event, "id");
  if (!roleId) throw createError({ statusCode: 400, statusMessage: "Role ID is required" });
  const body = await readBody(event);
  const role = await prisma.role.findUnique({ where: { id: roleId } });
  if (!role) {
    throw createError({ statusCode: 404, statusMessage: "Role not found" });
  }
  const permissionIds = body.permissionIds || [];
  const validPermissions = await prisma.permission.findMany({
    where: { id: { in: permissionIds } },
    select: { id: true }
  });
  const validIds = new Set(validPermissions.map((p) => p.id));
  for (const pid of permissionIds) {
    if (!validIds.has(pid)) {
      throw createError({ statusCode: 400, statusMessage: `Permission ${pid} not found` });
    }
  }
  await prisma.$transaction([
    prisma.rolePermission.deleteMany({ where: { roleId } }),
    ...permissionIds.map(
      (permissionId) => prisma.rolePermission.create({ data: { roleId, permissionId } })
    )
  ]);
  return { success: true, permissionIds };
});

export { index_put as default };
//# sourceMappingURL=index.put.mjs.map
