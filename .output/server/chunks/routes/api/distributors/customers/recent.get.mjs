import { d as defineEventHandler } from '../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../_/permissions.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jsonwebtoken';
import '@prisma/client';
import '@prisma/adapter-pg';
import 'pg';

const recent_get = defineEventHandler(async (event) => {
  const auth = event.context.auth;
  await requirePermission(event, "SALES", "READ");
  const invoices = await prisma.invoice.findMany({
    where: { createdById: auth.userId },
    select: {
      customerId: true,
      createdAt: true,
      totalAmount: true,
      paidAmount: true
    },
    orderBy: { createdAt: "desc" }
  });
  const customerMap = /* @__PURE__ */ new Map();
  for (const inv of invoices) {
    if (!customerMap.has(inv.customerId)) {
      customerMap.set(inv.customerId, {
        lastVisit: inv.createdAt,
        totalAmount: inv.totalAmount.toNumber(),
        paidAmount: inv.paidAmount.toNumber(),
        invoiceCount: 1
      });
    } else {
      const entry = customerMap.get(inv.customerId);
      entry.invoiceCount++;
    }
  }
  const customerIds = [...customerMap.keys()].slice(0, 10);
  if (customerIds.length === 0) {
    return { customers: [] };
  }
  const customers = await prisma.customer.findMany({
    where: { id: { in: customerIds } },
    select: {
      id: true,
      name: true,
      phone: true,
      address: true,
      createdAt: true,
      ledgerEntries: {
        select: { amount: true, type: true }
      }
    }
  });
  const result = customers.map((c) => {
    const stats = customerMap.get(c.id);
    const balance = c.ledgerEntries.reduce((sum, e) => {
      return e.type === "DEBIT" ? sum + e.amount.toNumber() : sum - e.amount.toNumber();
    }, 0);
    const { ledgerEntries, ...rest } = c;
    return {
      ...rest,
      balance,
      lastVisit: stats.lastVisit,
      invoiceCount: stats.invoiceCount
    };
  });
  result.sort((a, b) => b.lastVisit.getTime() - a.lastVisit.getTime());
  return { customers: result };
});

export { recent_get as default };
//# sourceMappingURL=recent.get.mjs.map
