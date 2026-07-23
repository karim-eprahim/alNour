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
  var _a, _b;
  await requirePermission(event, "PRODUCTION", "UPDATE");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const existing = await prisma.productionBatch.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Production batch not found" });
  }
  await validateWarehouseAccess(event, existing.warehouseId);
  const data = {};
  if (body.status) data.status = body.status;
  if (body.laborCost !== void 0) data.laborCost = parseFloat(body.laborCost);
  if (body.otherCosts !== void 0) data.otherCosts = parseFloat(body.otherCosts);
  if (body.notes !== void 0) data.notes = body.notes;
  if (data.laborCost !== void 0 || data.otherCosts !== void 0) {
    data.rawMaterialsCost = existing.rawMaterialsCost.toNumber();
    data.totalBatchCost = data.rawMaterialsCost + ((_a = data.laborCost) != null ? _a : existing.laborCost.toNumber()) + ((_b = data.otherCosts) != null ? _b : existing.otherCosts.toNumber());
  }
  const batch = await prisma.productionBatch.update({
    where: { id },
    data,
    include: {
      warehouse: { select: { id: true, name: true } },
      consumptions: {
        include: { product: { select: { id: true, name: true, sku: true } } }
      },
      outputs: {
        include: { product: { select: { id: true, name: true, sku: true } } }
      }
    }
  });
  return { batch };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
