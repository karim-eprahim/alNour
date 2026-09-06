import { d as defineEventHandler, f as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  await requirePermission(event, "CUSTOMERS", "READ");
  const id = getRouterParam(event, "id");
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      _count: { select: { salesOrders: true, invoices: true } },
      linkedSupplier: {
        include: {
          ledgerEntries: { select: { amount: true, type: true } }
        }
      }
    }
  });
  if (!customer) {
    throw createError({ statusCode: 404, statusMessage: "Customer not found" });
  }
  const [debitAgg, creditAgg] = await Promise.all([
    prisma.ledgerEntry.aggregate({ where: { customerId: id, type: "DEBIT" }, _sum: { amount: true } }),
    prisma.ledgerEntry.aggregate({ where: { customerId: id, type: "CREDIT" }, _sum: { amount: true } })
  ]);
  const balance = Number(debitAgg._sum.amount || 0) - Number(creditAgg._sum.amount || 0);
  let linkedSupplierBalance = 0;
  let netBalance = balance;
  if (customer.linkedSupplier) {
    linkedSupplierBalance = customer.linkedSupplier.ledgerEntries.reduce((sum, e) => {
      return e.type === "DEBIT" ? sum + Number(e.amount) : sum - Number(e.amount);
    }, 0);
    netBalance = balance - linkedSupplierBalance;
  }
  const { linkedSupplier, ...rest } = customer;
  return {
    customer: {
      ...rest,
      balance,
      linkedSupplier: linkedSupplier ? { id: linkedSupplier.id, name: linkedSupplier.name, balance: linkedSupplierBalance } : null,
      netBalance
    }
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
