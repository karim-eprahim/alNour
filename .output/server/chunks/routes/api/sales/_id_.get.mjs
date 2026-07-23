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
  await requirePermission(event, "SALES", "READ");
  const id = getRouterParam(event, "id");
  const order = await prisma.salesOrder.findUnique({
    where: { id },
    include: {
      customer: { select: { id: true, name: true, phone: true, address: true } },
      warehouse: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
      assignedDistributor: { select: { id: true, name: true, phone: true } },
      items: { include: { product: { select: { id: true, name: true, sku: true, image: true } } } },
      invoices: {
        include: {
          payments: {
            include: { createdBy: { select: { id: true, name: true } } },
            orderBy: { createdAt: "desc" }
          }
        },
        orderBy: { createdAt: "desc" }
      }
    }
  });
  if (!order) {
    throw createError({ statusCode: 404, statusMessage: "Sales order not found" });
  }
  await validateWarehouseAccess(event, order.warehouseId);
  return { order };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
