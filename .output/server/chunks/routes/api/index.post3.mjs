import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
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
  await requirePermission(event, "USERS", "CREATE");
  const body = await readBody(event);
  if (!body.moduleId || !body.actionId || !body.label) {
    throw createError({ statusCode: 400, statusMessage: "moduleId, actionId and label are required" });
  }
  const existing = await prisma.permission.findUnique({
    where: { moduleId_actionId: { moduleId: body.moduleId, actionId: body.actionId } }
  });
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: "Permission already exists for this module and action" });
  }
  const permission = await prisma.permission.create({
    data: { moduleId: body.moduleId, actionId: body.actionId, label: body.label },
    include: {
      module: { select: { id: true, name: true, label: true } },
      action: { select: { id: true, name: true, label: true } }
    }
  });
  return { permission };
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
