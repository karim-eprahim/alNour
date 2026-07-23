import { d as defineEventHandler, f as getQuery } from '../../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  await requirePermission(event, "ATTENDANCE", "READ");
  const query = getQuery(event);
  const where = {};
  if (query.workerId) where.workerId = query.workerId;
  if (query.status) where.status = query.status;
  if (query.startDate) {
    where.date = { ...where.date || {}, gte: new Date(query.startDate) };
  }
  if (query.endDate) {
    where.date = { ...where.date || {}, lte: new Date(query.endDate) };
  }
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 50;
  const skip = (page - 1) * limit;
  const [attendance, total] = await Promise.all([
    prisma.attendance.findMany({
      where,
      include: { worker: { select: { id: true, name: true, role: true } } },
      orderBy: { date: "desc" },
      skip,
      take: limit
    }),
    prisma.attendance.count({ where })
  ]);
  return { attendance, total, page, limit };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
