import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { p as prisma } from '../../_/prisma.mjs';
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
  const body = await readBody(event);
  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: "Role name is required" });
  }
  const existing = await prisma.role.findUnique({ where: { name: body.name } });
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: "Role already exists" });
  }
  const role = await prisma.role.create({
    data: { name: body.name, label: body.label || body.name }
  });
  return { role };
});

export { index_post as default };
//# sourceMappingURL=index.post7.mjs.map
