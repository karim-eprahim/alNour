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
  await requirePermission(event, "SUPPLIERS", "READ");
  const id = getRouterParam(event, "id");
  const supplier = await prisma.supplier.findUnique({
    where: { id },
    include: {
      purchaseInvoices: {
        include: {
          items: { include: { product: true } },
          weightTickets: true,
          warehouse: true
        },
        orderBy: { createdAt: "desc" }
      },
      ledgerEntries: {
        orderBy: { createdAt: "desc" },
        take: 100
      },
      linkedCustomer: {
        include: {
          ledgerEntries: { select: { amount: true, type: true } }
        }
      }
    }
  });
  if (!supplier) {
    throw createError({ statusCode: 404, statusMessage: "Supplier not found" });
  }
  const balance = supplier.ledgerEntries.reduce((acc, entry) => {
    return entry.type === "DEBIT" ? acc + Number(entry.amount) : acc - Number(entry.amount);
  }, 0);
  let linkedCustomerBalance = 0;
  let netBalance = balance;
  if (supplier.linkedCustomer) {
    linkedCustomerBalance = supplier.linkedCustomer.ledgerEntries.reduce((acc, entry) => {
      return entry.type === "DEBIT" ? acc + Number(entry.amount) : acc - Number(entry.amount);
    }, 0);
    netBalance = balance - linkedCustomerBalance;
  }
  const { linkedCustomer, ...rest } = supplier;
  return {
    supplier: {
      ...rest,
      balance,
      linkedCustomer: linkedCustomer ? { id: linkedCustomer.id, name: linkedCustomer.name, balance: linkedCustomerBalance } : null,
      netBalance
    }
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
