import { d as defineEventHandler, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  var _a;
  await requirePermission(event, "INVENTORY", "CREATE");
  const body = await readBody(event);
  const auth = event.context.auth;
  await validateWarehouseAccess(event, body.fromWarehouseId);
  await validateWarehouseAccess(event, body.toWarehouseId);
  if (!body.fromWarehouseId || !body.toWarehouseId || !((_a = body.items) == null ? void 0 : _a.length)) {
    throw createError({ statusCode: 400, statusMessage: "fromWarehouseId, toWarehouseId, and items are required" });
  }
  if (body.fromWarehouseId === body.toWarehouseId) {
    throw createError({ statusCode: 400, statusMessage: "Source and destination warehouses must be different" });
  }
  const transfer = await prisma.$transaction(async (tx) => {
    const count = await tx.stockTransfer.count();
    const transferNumber = `TRF-${String(count + 1).padStart(6, "0")}`;
    for (const item of body.items) {
      const stock = await tx.stock.findUnique({
        where: {
          warehouseId_productId: {
            warehouseId: body.fromWarehouseId,
            productId: item.productId
          }
        }
      });
      const qty = parseFloat(item.quantity);
      if (!stock || stock.quantity.toNumber() < qty) {
        throw createError({ statusCode: 400, statusMessage: `Insufficient stock for product ${item.productId}` });
      }
    }
    const created = await tx.stockTransfer.create({
      data: {
        transferNumber,
        fromWarehouseId: body.fromWarehouseId,
        toWarehouseId: body.toWarehouseId,
        createdById: auth.userId,
        status: body.status || "PENDING",
        items: {
          create: body.items.map((item) => ({
            productId: item.productId,
            quantity: parseFloat(item.quantity)
          }))
        }
      },
      include: {
        fromWarehouse: true,
        toWarehouse: true,
        items: { include: { product: true } }
      }
    });
    return created;
  });
  return { transfer };
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
