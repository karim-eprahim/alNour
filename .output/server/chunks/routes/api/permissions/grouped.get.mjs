import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
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

const grouped_get = defineEventHandler(async (event) => {
  await requirePermission(event, "USERS", "READ");
  const modules = await prisma.module.findMany({
    include: {
      permissions: {
        include: { action: true },
        orderBy: { action: { name: "asc" } }
      }
    },
    orderBy: { name: "asc" }
  });
  const result = modules.map((m) => ({
    id: m.id,
    name: m.name,
    label: m.label,
    permissions: m.permissions.map((p) => ({
      id: p.id,
      actionId: p.actionId,
      action: p.action.name,
      actionLabel: p.action.label,
      label: p.label
    }))
  }));
  return { modules: result };
});

export { grouped_get as default };
//# sourceMappingURL=grouped.get.mjs.map
