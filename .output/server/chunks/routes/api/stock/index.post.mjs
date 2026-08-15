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
  await requirePermission(event, "INVENTORY", "CREATE");
  const body = await readBody(event);
  const auth = event.context.auth;
  await validateWarehouseAccess(event, body.warehouseId);
  if (!body.productId || !body.warehouseId || !body.type || !body.quantity) {
    throw createError({ statusCode: 400, statusMessage: "productId, warehouseId, type, and quantity are required" });
  }
  const quantity = parseFloat(body.quantity);
  if (isNaN(quantity) || quantity <= 0) {
    throw createError({ statusCode: 400, statusMessage: "Quantity must be a positive number" });
  }
  const movement = await prisma.$transaction(async (tx) => {
    const stock = await tx.stock.findUnique({
      where: {
        warehouseId_productId: {
          warehouseId: body.warehouseId,
          productId: body.productId
        }
      }
    });
    const adjustmentTypes = ["PURCHASE", "PRODUCTION_OUTPUT", "TRANSFER_IN"];
    const isIncrease = adjustmentTypes.includes(body.type);
    const newQuantity = stock ? isIncrease ? stock.quantity.toNumber() + quantity : stock.quantity.toNumber() - quantity : isIncrease ? quantity : -quantity;
    if (newQuantity < 0) {
      throw createError({ statusCode: 400, statusMessage: "Insufficient stock" });
    }
    if (stock) {
      await tx.stock.update({
        where: { id: stock.id },
        data: { quantity: newQuantity }
      });
    } else {
      await tx.stock.create({
        data: {
          warehouseId: body.warehouseId,
          productId: body.productId,
          quantity: newQuantity
        }
      });
    }
    return tx.stockMovement.create({
      data: {
        productId: body.productId,
        warehouseId: body.warehouseId,
        type: body.type,
        quantity: isIncrease ? quantity : -quantity,
        referenceId: body.referenceId,
        createdById: auth.userId
      },
      include: {
        product: { select: { id: true, name: true, sku: true } },
        warehouse: { select: { id: true, name: true } }
      }
    });
  });
  return { movement };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
