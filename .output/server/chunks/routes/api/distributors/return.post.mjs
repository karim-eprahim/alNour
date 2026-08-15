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

const return_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const auth = event.context.auth;
  if (!body.productId || !body.quantity) {
    throw createError({ statusCode: 400, statusMessage: "productId and quantity are required" });
  }
  if (!body.warehouseId) {
    throw createError({ statusCode: 400, statusMessage: "warehouseId is required" });
  }
  const distributorId = body.distributorId || auth.userId;
  if (distributorId !== auth.userId) {
    await requirePermission(event, "INVENTORY", "UPDATE");
    await validateWarehouseAccess(event, body.warehouseId);
  }
  const quantity = parseFloat(body.quantity);
  if (isNaN(quantity) || quantity <= 0) {
    throw createError({ statusCode: 400, statusMessage: "Quantity must be a positive number" });
  }
  const result = await prisma.$transaction(async (tx) => {
    const custody = await tx.distributorCustody.findUnique({
      where: {
        distributorId_productId: {
          distributorId,
          productId: body.productId
        }
      }
    });
    if (!custody || custody.quantity.toNumber() < quantity) {
      throw createError({ statusCode: 400, statusMessage: "Insufficient custody stock on distributor truck" });
    }
    const newCustodyQty = custody.quantity.toNumber() - quantity;
    if (newCustodyQty <= 0) {
      await tx.distributorCustody.delete({ where: { id: custody.id } });
    } else {
      await tx.distributorCustody.update({
        where: { id: custody.id },
        data: { quantity: newCustodyQty }
      });
    }
    const warehouseStock = await tx.stock.findUnique({
      where: {
        warehouseId_productId: {
          warehouseId: body.warehouseId,
          productId: body.productId
        }
      }
    });
    const newWarehouseQty = ((warehouseStock == null ? void 0 : warehouseStock.quantity.toNumber()) || 0) + quantity;
    if (warehouseStock) {
      await tx.stock.update({
        where: { id: warehouseStock.id },
        data: { quantity: newWarehouseQty }
      });
    } else {
      await tx.stock.create({
        data: {
          warehouseId: body.warehouseId,
          productId: body.productId,
          quantity: newWarehouseQty
        }
      });
    }
    await tx.stockMovement.create({
      data: {
        productId: body.productId,
        warehouseId: body.warehouseId,
        type: "DISTRIBUTOR_RETURN",
        quantity,
        referenceId: distributorId,
        notes: body.notes || `Returned from distributor truck`,
        createdById: auth.userId
      }
    });
    const operation = await tx.distributorOperation.create({
      data: {
        distributorId,
        productId: body.productId,
        quantity,
        type: "RETURN"
      }
    });
    return { operation };
  });
  return result;
});

export { return_post as default };
//# sourceMappingURL=return.post.mjs.map
