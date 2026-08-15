import { d as defineEventHandler, g as getRouterParam, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
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

const _id__patch = defineEventHandler(async (event) => {
  await requirePermission(event, "WORKERS", "UPDATE");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const existing = await prisma.worker.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Worker not found" });
  }
  const data = {};
  if (body.name !== void 0) data.name = body.name;
  if (body.phone !== void 0) data.phone = body.phone;
  if (body.role !== void 0) data.role = body.role;
  if (body.defaultDailyWage !== void 0) data.defaultDailyWage = parseFloat(body.defaultDailyWage);
  if (body.isActive !== void 0) data.isActive = body.isActive;
  const worker = await prisma.worker.update({
    where: { id },
    data
  });
  return { worker };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
