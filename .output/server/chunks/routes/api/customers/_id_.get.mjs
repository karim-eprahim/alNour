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
  await requirePermission(event, "CUSTOMERS", "READ");
  const id = getRouterParam(event, "id");
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      salesOrders: {
        include: {
          items: { include: { product: { select: { id: true, name: true, sku: true } } } },
          warehouse: { select: { id: true, name: true } }
        },
        orderBy: { createdAt: "desc" },
        take: 20
      },
      invoices: {
        include: {
          payments: { orderBy: { createdAt: "desc" } }
        },
        orderBy: { createdAt: "desc" },
        take: 20
      },
      ledgerEntries: { orderBy: { createdAt: "desc" }, take: 50 },
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
  const balance = customer.ledgerEntries.reduce((sum, e) => {
    return e.type === "DEBIT" ? sum + e.amount.toNumber() : sum - e.amount.toNumber();
  }, 0);
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
