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
  await requirePermission(event, "CUSTOMERS", "READ");
  const query = getQuery(event);
  const where = {};
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { phone: { contains: query.search, mode: "insensitive" } }
    ];
  }
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 50;
  const skip = (page - 1) * limit;
  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      include: {
        _count: { select: { salesOrders: true, invoices: true } },
        ledgerEntries: {
          orderBy: { createdAt: "desc" },
          take: 1
        },
        linkedSupplier: {
          select: { id: true, name: true }
        }
      },
      orderBy: { name: "asc" },
      skip,
      take: limit
    }),
    prisma.customer.count({ where })
  ]);
  const customersWithBalance = customers.map((c) => {
    const balance = c.ledgerEntries.reduce((sum, e) => {
      return e.type === "DEBIT" ? sum + e.amount.toNumber() : sum - e.amount.toNumber();
    }, 0);
    const { ledgerEntries, ...rest } = c;
    return { ...rest, balance };
  });
  return { customers: customersWithBalance, total, page, limit };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
