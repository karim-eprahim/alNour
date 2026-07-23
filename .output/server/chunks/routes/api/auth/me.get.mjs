import { d as defineEventHandler, e as extractToken, c as createError, v as verifyToken } from '../../../nitro/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { g as getUserPermissions } from '../../../_/permissions.mjs';
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

const me_get = defineEventHandler(async (event) => {
  const token = extractToken(event);
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }
  const payload = verifyToken(token);
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: "Invalid or expired token" });
  }
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      roleId: true,
      role: { select: { id: true, name: true } },
      status: true,
      lastLogin: true,
      createdAt: true
    }
  });
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" });
  }
  const permissions = await getUserPermissions(user.id, user.roleId);
  return {
    user: {
      ...user,
      role: user.role.name
    },
    permissions
  };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
