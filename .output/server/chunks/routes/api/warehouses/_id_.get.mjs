import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { v as validateWarehouseAccess } from '../../../_/warehouse-access.mjs';
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
  await requirePermission(event, "WAREHOUSES", "READ");
  const id = getRouterParam(event, "id");
  await validateWarehouseAccess(event, id);
  const warehouse = await prisma.warehouse.findUnique({
    where: { id },
    include: {
      stocks: {
        include: { product: true },
        orderBy: { product: { name: "asc" } }
      }
    }
  });
  if (!warehouse) {
    throw createError({ statusCode: 404, statusMessage: "Warehouse not found" });
  }
  return { warehouse };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
