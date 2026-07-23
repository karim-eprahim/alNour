import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
import { v as validateWarehouseAccess } from '../../_/warehouse-access.mjs';
import { p as prisma } from '../../_/prisma.mjs';
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
  var _a, _b;
  await requirePermission(event, "PRODUCTION", "CREATE");
  const body = await readBody(event);
  const auth = event.context.auth;
  await validateWarehouseAccess(event, body.warehouseId);
  if (!body.warehouseId || !((_a = body.consumptions) == null ? void 0 : _a.length) || !((_b = body.outputs) == null ? void 0 : _b.length)) {
    throw createError({ statusCode: 400, statusMessage: "warehouseId, consumptions, and outputs are required" });
  }
  const batch = await prisma.$transaction(async (tx) => {
    const count = await tx.productionBatch.count();
    const batchNumber = `BATCH-${String(count + 1).padStart(6, "0")}`;
    let rawMaterialsCost = 0;
    const consumptionsData = await Promise.all(
      body.consumptions.map(async (c) => {
        const qty = parseFloat(c.quantity) || 0;
        const product = await tx.product.findUnique({ where: { id: c.productId } });
        const unitCost = (product == null ? void 0 : product.purchaseCost) ? product.purchaseCost.toNumber() : 0;
        const totalCost = qty * unitCost;
        rawMaterialsCost += totalCost;
        return { productId: c.productId, quantity: qty, unitCost, totalCost };
      })
    );
    const laborCost = parseFloat(body.laborCost) || 0;
    const otherCosts = parseFloat(body.otherCosts) || 0;
    const totalBatchCost = rawMaterialsCost + laborCost + otherCosts;
    const outputsData = body.outputs.map((o) => {
      const qty = parseFloat(o.quantity) || 0;
      const waste = parseFloat(o.waste) || 0;
      return { productId: o.productId, quantity: qty, waste };
    });
    const totalOutputQty = outputsData.reduce((sum, o) => sum + o.quantity, 0);
    const costPerUnit = totalOutputQty > 0 ? totalBatchCost / totalOutputQty : 0;
    const created = await tx.productionBatch.create({
      data: {
        batchNumber,
        warehouseId: body.warehouseId,
        status: "COMPLETED",
        rawMaterialsCost,
        laborCost,
        otherCosts,
        totalBatchCost,
        notes: body.notes || null,
        consumptions: {
          create: consumptionsData
        },
        outputs: {
          create: outputsData.map((o) => ({
            productId: o.productId,
            quantity: o.quantity,
            waste: o.waste,
            costPerUnit
          }))
        }
      },
      include: {
        warehouse: { select: { id: true, name: true } },
        consumptions: {
          include: { product: { select: { id: true, name: true, sku: true } } }
        },
        outputs: {
          include: { product: { select: { id: true, name: true, sku: true, type: true } } }
        }
      }
    });
    for (const c of consumptionsData) {
      const stock = await tx.stock.findUnique({
        where: {
          warehouseId_productId: {
            warehouseId: body.warehouseId,
            productId: c.productId
          }
        }
      });
      const currentQty = stock ? stock.quantity.toNumber() : 0;
      const newQty = currentQty - c.quantity;
      if (newQty < 0) {
        throw createError({ statusCode: 400, statusMessage: `Insufficient stock for product ${c.productId}` });
      }
      if (stock) {
        await tx.stock.update({ where: { id: stock.id }, data: { quantity: newQty } });
      }
      await tx.stockMovement.create({
        data: {
          productId: c.productId,
          warehouseId: body.warehouseId,
          type: "PRODUCTION_CONSUME",
          quantity: -c.quantity,
          notes: `Production batch ${batchNumber}: ${c.quantity} consumed`,
          referenceId: created.id,
          createdById: auth.userId
        }
      });
    }
    for (const o of outputsData) {
      const stock = await tx.stock.findUnique({
        where: {
          warehouseId_productId: {
            warehouseId: body.warehouseId,
            productId: o.productId
          }
        }
      });
      const currentQty = stock ? stock.quantity.toNumber() : 0;
      const newQty = currentQty + o.quantity;
      if (stock) {
        await tx.stock.update({ where: { id: stock.id }, data: { quantity: newQty } });
      } else {
        await tx.stock.create({
          data: {
            warehouseId: body.warehouseId,
            productId: o.productId,
            quantity: newQty
          }
        });
      }
      await tx.stockMovement.create({
        data: {
          productId: o.productId,
          warehouseId: body.warehouseId,
          type: "PRODUCTION_OUTPUT",
          quantity: o.quantity,
          notes: `Production batch ${batchNumber}: ${o.quantity} produced (waste: ${o.waste})`,
          referenceId: created.id,
          createdById: auth.userId
        }
      });
    }
    return created;
  });
  return { batch };
});

export { index_post as default };
//# sourceMappingURL=index.post4.mjs.map
