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

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const role = await prisma.role.findUnique({
    where: { id },
    include: {
      permissions: {
        include: {
          permission: { include: { module: true, action: true } }
        }
      },
      _count: { select: { users: true } }
    }
  });
  if (!role) {
    throw createError({ statusCode: 404, statusMessage: "Role not found" });
  }
  return { role };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
