import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  await requirePermission(event, "SALES", "DELETE");
  const id = getRouterParam(event, "id");
  const existing = await prisma.salesOrder.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Sales order not found" });
  }
  await validateWarehouseAccess(event, existing.warehouseId);
  await prisma.salesOrder.delete({ where: { id } });
  return { success: true };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
