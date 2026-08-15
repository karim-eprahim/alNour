import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  var _a, _b;
  await requirePermission(event, "WORKERS", "READ");
  const id = getRouterParam(event, "id");
  const worker = await prisma.worker.findUnique({
    where: { id },
    include: {
      attendance: { orderBy: { date: "desc" }, take: 90 },
      advances: { orderBy: { date: "desc" } },
      dailyWages: {
        include: { batch: { select: { id: true, batchNumber: true } } },
        orderBy: { date: "desc" }
      }
    }
  });
  if (!worker) {
    throw createError({ statusCode: 404, statusMessage: "Worker not found" });
  }
  const wageAgg = await prisma.workerDailyWage.aggregate({
    where: { workerId: id },
    _sum: { dailyWage: true }
  });
  const advanceAgg = await prisma.workerAdvance.aggregate({
    where: { workerId: id },
    _sum: { amount: true }
  });
  const attendanceCounts = await prisma.attendance.groupBy({
    by: ["status"],
    where: { workerId: id },
    _count: true
  });
  const totalWagesEarned = ((_a = wageAgg._sum.dailyWage) == null ? void 0 : _a.toNumber()) || 0;
  const totalAdvancesTaken = ((_b = advanceAgg._sum.amount) == null ? void 0 : _b.toNumber()) || 0;
  return {
    worker: {
      ...worker,
      totalWagesEarned,
      totalAdvancesTaken,
      netPayout: totalWagesEarned - totalAdvancesTaken,
      attendanceSummary: attendanceCounts.reduce((acc, a) => {
        acc[a.status.toLowerCase()] = a._count;
        return acc;
      }, { present: 0, absent: 0, leave: 0 })
    }
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
