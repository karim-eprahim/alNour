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
  await requirePermission(event, "PURCHASES", "READ");
  const id = getRouterParam(event, "id");
  const invoice = await prisma.purchaseInvoice.findUnique({
    where: { id },
    include: {
      supplier: true,
      warehouse: true,
      items: {
        include: { product: true }
      },
      weightTickets: {
        orderBy: { createdAt: "desc" }
      }
    }
  });
  if (!invoice) {
    throw createError({ statusCode: 404, statusMessage: "Purchase invoice not found" });
  }
  await validateWarehouseAccess(event, invoice.warehouseId);
  return { invoice };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
