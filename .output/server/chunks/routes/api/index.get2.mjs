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
  await requirePermission(event, "EXPENSES", "READ");
  const query = getQuery(event);
  const where = {};
  if (query.category) where.category = query.category;
  if (query.startDate) {
    where.date = { ...where.date || {}, gte: new Date(query.startDate) };
  }
  if (query.endDate) {
    where.date = { ...where.date || {}, lte: new Date(query.endDate) };
  }
  if (query.search) {
    where.title = { contains: query.search, mode: "insensitive" };
  }
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const skip = (page - 1) * limit;
  const [expenses, total] = await Promise.all([
    prisma.expense.findMany({
      where,
      include: { createdBy: { select: { id: true, name: true } } },
      orderBy: { date: "desc" },
      skip,
      take: limit
    }),
    prisma.expense.count({ where })
  ]);
  const categories = await prisma.expense.groupBy({
    by: ["category"],
    _sum: { amount: true },
    _count: true
  });
  return { expenses, total, page, limit, categories };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
