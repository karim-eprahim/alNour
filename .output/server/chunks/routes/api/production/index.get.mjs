import { d as defineEventHandler, f as getQuery } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { v as validateWarehouseAccess, g as getAccessibleWarehouseIds } from '../../../_/warehouse-access.mjs';
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

const index_get = defineEventHandler(async (event) => {
  await requirePermission(event, "PRODUCTION", "READ");
  const query = getQuery(event);
  const where = { status: "COMPLETED" };
  if (query.warehouseId) {
    await validateWarehouseAccess(event, query.warehouseId);
    where.warehouseId = query.warehouseId;
  } else {
    const warehouseIds = await getAccessibleWarehouseIds(event);
    if (warehouseIds !== null) {
      where.warehouseId = { in: warehouseIds };
    }
  }
  if (query.startDate) {
    where.createdAt = { ...where.createdAt || {}, gte: new Date(query.startDate) };
  }
  if (query.endDate) {
    where.createdAt = { ...where.createdAt || {}, lte: new Date(query.endDate) };
  }
  const batches = await prisma.productionBatch.findMany({
    where,
    include: {
      warehouse: { select: { id: true, name: true } },
      consumptions: {
        include: { product: { select: { id: true, name: true, sku: true } } }
      },
      outputs: {
        include: { product: { select: { id: true, name: true, sku: true, type: true } } }
      }
    },
    orderBy: { createdAt: "desc" }
  });
  let totalConsumption = 0;
  let totalOutput = 0;
  let totalWaste = 0;
  let totalCost = 0;
  for (const b of batches) {
    for (const c of b.consumptions) {
      totalConsumption += c.quantity.toNumber();
    }
    for (const o of b.outputs) {
      totalOutput += o.quantity.toNumber();
      totalWaste += o.waste.toNumber();
    }
    totalCost += b.totalBatchCost.toNumber();
  }
  const wastePercentage = totalOutput > 0 ? totalWaste / (totalOutput + totalWaste) * 100 : 0;
  const averageCostPerUnit = totalOutput > 0 ? totalCost / totalOutput : 0;
  return {
    batches,
    summary: {
      totalBatches: batches.length,
      totalOutput,
      totalConsumption,
      totalWaste,
      wastePercentage,
      totalCost,
      averageCostPerUnit
    }
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
