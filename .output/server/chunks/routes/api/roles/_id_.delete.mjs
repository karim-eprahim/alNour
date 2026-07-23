import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const existing = await prisma.role.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Role not found" });
  }
  const userCount = await prisma.user.count({ where: { roleId: id } });
  if (userCount > 0) {
    throw createError({ statusCode: 400, statusMessage: `Cannot delete role: ${userCount} user(s) are assigned to it` });
  }
  await prisma.role.delete({ where: { id } });
  return { success: true };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
