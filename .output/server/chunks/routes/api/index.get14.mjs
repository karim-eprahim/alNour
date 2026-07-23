import { d as defineEventHandler, f as getQuery } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
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

const index_get = defineEventHandler(async (event) => {
  await requirePermission(event, "WORKERS", "READ");
  const query = getQuery(event);
  const where = {};
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { phone: { contains: query.search, mode: "insensitive" } }
    ];
  }
  if (query.isActive !== void 0) where.isActive = query.isActive === "true";
  if (query.role) where.role = query.role;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const skip = (page - 1) * limit;
  const [workers, total] = await Promise.all([
    prisma.worker.findMany({
      where,
      include: {
        _count: { select: { attendance: true, advances: true, dailyWages: true } }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),
    prisma.worker.count({ where })
  ]);
  const workersWithSummary = await Promise.all(
    workers.map(async (w) => {
      var _a, _b, _c, _d;
      const wageAgg = await prisma.workerDailyWage.aggregate({
        where: { workerId: w.id },
        _sum: { dailyWage: true }
      });
      const advanceAgg = await prisma.workerAdvance.aggregate({
        where: { workerId: w.id },
        _sum: { amount: true }
      });
      return {
        ...w,
        totalWagesEarned: ((_a = wageAgg._sum.dailyWage) == null ? void 0 : _a.toNumber()) || 0,
        totalAdvancesTaken: ((_b = advanceAgg._sum.amount) == null ? void 0 : _b.toNumber()) || 0,
        netPayout: (((_c = wageAgg._sum.dailyWage) == null ? void 0 : _c.toNumber()) || 0) - (((_d = advanceAgg._sum.amount) == null ? void 0 : _d.toNumber()) || 0)
      };
    })
  );
  return { workers: workersWithSummary, total, page, limit };
});

export { index_get as default };
//# sourceMappingURL=index.get14.mjs.map
