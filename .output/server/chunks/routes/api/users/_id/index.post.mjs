import { d as defineEventHandler, g as getRouterParam, c as createError, r as readBody } from '../../../../nitro/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  await requirePermission(event, "USERS", "UPDATE");
  const userId = getRouterParam(event, "id");
  if (!userId) throw createError({ statusCode: 400, statusMessage: "User ID is required" });
  const { permissionId } = await readBody(event);
  if (!permissionId) throw createError({ statusCode: 400, statusMessage: "permissionId is required" });
  const existing = await prisma.userPermission.findUnique({
    where: { userId_permissionId: { userId, permissionId } }
  });
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: "Permission already assigned to this user" });
  }
  const userPermission = await prisma.userPermission.create({
    data: { userId, permissionId },
    include: { permission: true }
  });
  return { userPermission };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
