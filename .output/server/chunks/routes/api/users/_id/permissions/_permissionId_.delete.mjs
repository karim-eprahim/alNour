import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../../_/permissions.mjs';
import { p as prisma } from '../../../../../_/prisma.mjs';
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

const _permissionId__delete = defineEventHandler(async (event) => {
  await requirePermission(event, "USERS", "UPDATE");
  const userId = getRouterParam(event, "id");
  const permissionId = getRouterParam(event, "permissionId");
  if (!userId) throw createError({ statusCode: 400, statusMessage: "User ID is required" });
  if (!permissionId) throw createError({ statusCode: 400, statusMessage: "Permission ID is required" });
  const existing = await prisma.userPermission.findUnique({
    where: { userId_permissionId: { userId, permissionId } }
  });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "User permission not found" });
  }
  await prisma.userPermission.delete({
    where: { userId_permissionId: { userId, permissionId } }
  });
  return { success: true };
});

export { _permissionId__delete as default };
//# sourceMappingURL=_permissionId_.delete.mjs.map
