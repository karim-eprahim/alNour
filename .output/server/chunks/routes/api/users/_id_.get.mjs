import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  await requirePermission(event, "USERS", "READ");
  const id = getRouterParam(event, "id");
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      roleId: true,
      role: { select: { id: true, name: true, label: true } },
      status: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
      userWarehouses: {
        include: { warehouse: { select: { id: true, name: true } } }
      },
      permissions: {
        include: { permission: { include: { module: true, action: true } } }
      }
    }
  });
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" });
  }
  return { user };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
