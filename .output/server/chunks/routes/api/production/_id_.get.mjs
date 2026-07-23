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

const _id__get = defineEventHandler(async (event) => {
  await requirePermission(event, "PRODUCTION", "READ");
  const id = getRouterParam(event, "id");
  const batch = await prisma.productionBatch.findUnique({
    where: { id },
    include: {
      warehouse: { select: { id: true, name: true } },
      consumptions: {
        include: { product: { select: { id: true, name: true, sku: true, type: true, purchaseCost: true } } }
      },
      outputs: {
        include: { product: { select: { id: true, name: true, sku: true, type: true, purchaseCost: true } } }
      },
      workerDailyWages: {
        include: { worker: { select: { id: true, name: true, role: true } } },
        orderBy: { date: "desc" }
      }
    }
  });
  if (!batch) {
    throw createError({ statusCode: 404, statusMessage: "Production batch not found" });
  }
  await validateWarehouseAccess(event, batch.warehouseId);
  return { batch };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
