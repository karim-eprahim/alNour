import { d as defineEventHandler, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  var _a;
  await requirePermission(event, "WORKERS", "CREATE");
  const body = await readBody(event);
  if (!body.productionBatchId || !((_a = body.records) == null ? void 0 : _a.length)) {
    throw createError({ statusCode: 400, statusMessage: "productionBatchId and records array are required" });
  }
  const batch = await prisma.productionBatch.findUnique({ where: { id: body.productionBatchId } });
  if (!batch) {
    throw createError({ statusCode: 404, statusMessage: "Production batch not found" });
  }
  await validateWarehouseAccess(event, batch.warehouseId);
  const date = body.date ? new Date(body.date) : /* @__PURE__ */ new Date();
  date.setHours(0, 0, 0, 0);
  const dailyWages = await prisma.$transaction(async (tx) => {
    var _a2;
    for (const record of body.records) {
      const existing = await tx.workerDailyWage.findFirst({
        where: {
          workerId: record.workerId,
          productionBatchId: body.productionBatchId,
          date
        }
      });
      if (existing) {
        await tx.workerDailyWage.update({
          where: { id: existing.id },
          data: { dailyWage: parseFloat(record.dailyWage), notes: record.notes || null }
        });
      } else {
        await tx.workerDailyWage.create({
          data: {
            workerId: record.workerId,
            productionBatchId: body.productionBatchId,
            dailyWage: parseFloat(record.dailyWage),
            notes: record.notes || null,
            date
          }
        });
      }
    }
    const agg = await tx.workerDailyWage.aggregate({
      where: { productionBatchId: body.productionBatchId },
      _sum: { dailyWage: true }
    });
    const totalLabor = ((_a2 = agg._sum.dailyWage) == null ? void 0 : _a2.toNumber()) || 0;
    await tx.productionBatch.update({
      where: { id: body.productionBatchId },
      data: {
        laborCost: totalLabor,
        totalBatchCost: batch.rawMaterialsCost.toNumber() + totalLabor + batch.otherCosts.toNumber()
      }
    });
    return tx.workerDailyWage.findMany({
      where: { productionBatchId: body.productionBatchId },
      include: { worker: { select: { id: true, name: true, role: true } } }
    });
  });
  return { dailyWages };
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
