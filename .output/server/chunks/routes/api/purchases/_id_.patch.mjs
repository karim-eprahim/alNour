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
  await requirePermission(event, "PURCHASES", "EDIT");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const existing = await prisma.purchaseInvoice.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Purchase invoice not found" });
  }
  await validateWarehouseAccess(event, existing.warehouseId);
  const data = {};
  if (body.invoiceDate) data.invoiceDate = new Date(body.invoiceDate);
  const invoice = await prisma.purchaseInvoice.update({
    where: { id },
    data,
    include: {
      supplier: true,
      warehouse: true,
      items: { include: { product: true } },
      weightTickets: true
    }
  });
  return { invoice };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
