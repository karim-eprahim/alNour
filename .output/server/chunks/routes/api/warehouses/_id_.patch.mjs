import { d as defineEventHandler, g as getRouterParam, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { v as validateWarehouseAccess } from '../../../_/warehouse-access.mjs';
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
  await requirePermission(event, "WAREHOUSES", "UPDATE");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const existing = await prisma.warehouse.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Warehouse not found" });
  }
  await validateWarehouseAccess(event, id);
  const data = {};
  if (body.name) data.name = body.name;
  if (body.location !== void 0) data.location = body.location;
  const warehouse = await prisma.warehouse.update({
    where: { id },
    data
  });
  return { warehouse };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
