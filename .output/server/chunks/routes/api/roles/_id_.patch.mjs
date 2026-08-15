import { d as defineEventHandler, g as getRouterParam, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
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

const _id__patch = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const existing = await prisma.role.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Role not found" });
  }
  if (body.name && body.name !== existing.name) {
    const duplicate = await prisma.role.findUnique({ where: { name: body.name } });
    if (duplicate) {
      throw createError({ statusCode: 409, statusMessage: "Role name already taken" });
    }
  }
  const role = await prisma.role.update({
    where: { id },
    data: { name: body.name, label: body.label }
  });
  return { role };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
