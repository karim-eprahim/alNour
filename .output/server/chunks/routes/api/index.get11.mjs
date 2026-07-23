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
  await requirePermission(event, "SUPPLIERS", "READ");
  const query = getQuery(event);
  const where = {};
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { company: { contains: query.search, mode: "insensitive" } },
      { phone: { contains: query.search, mode: "insensitive" } }
    ];
  }
  const [suppliers, total] = await Promise.all([
    prisma.supplier.findMany({
      where,
      include: {
        _count: { select: { purchaseInvoices: true, ledgerEntries: true } },
        ledgerEntries: { select: { amount: true, type: true } },
        linkedCustomer: {
          select: { id: true, name: true }
        }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.supplier.count({ where })
  ]);
  const suppliersWithBalance = suppliers.map((s) => {
    const balance = s.ledgerEntries.reduce((acc, entry) => {
      return entry.type === "DEBIT" ? acc + Number(entry.amount) : acc - Number(entry.amount);
    }, 0);
    const { ledgerEntries, ...rest } = s;
    return { ...rest, balance };
  });
  return { suppliers: suppliersWithBalance, total };
});

export { index_get as default };
//# sourceMappingURL=index.get11.mjs.map
