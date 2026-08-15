import { d as defineEventHandler, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
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

const reconcilePartner_post = defineEventHandler(async (event) => {
  const { supplierId, customerId, amount } = await readBody(event);
  if (!supplierId || !customerId) {
    throw createError({ statusCode: 400, statusMessage: "supplierId and customerId are required" });
  }
  const [supplier, customer] = await Promise.all([
    prisma.supplier.findUnique({
      where: { id: supplierId },
      include: {
        ledgerEntries: { select: { amount: true, type: true } }
      }
    }),
    prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        ledgerEntries: { select: { amount: true, type: true } }
      }
    })
  ]);
  if (!supplier) throw createError({ statusCode: 404, statusMessage: "Supplier not found" });
  if (!customer) throw createError({ statusCode: 404, statusMessage: "Customer not found" });
  if (supplier.linkedCustomerId !== customerId) {
    throw createError({ statusCode: 400, statusMessage: "Supplier and Customer are not linked" });
  }
  const supplierBalance = supplier.ledgerEntries.reduce((acc, e) => {
    return e.type === "DEBIT" ? acc + Number(e.amount) : acc - Number(e.amount);
  }, 0);
  const customerBalance = customer.ledgerEntries.reduce((acc, e) => {
    return e.type === "DEBIT" ? acc + Number(e.amount) : acc - Number(e.amount);
  }, 0);
  if (supplierBalance <= 0 && customerBalance <= 0) {
    throw createError({ statusCode: 400, statusMessage: "Neither side has a positive balance to settle" });
  }
  const settlementAmount = amount ? Math.abs(Number(amount)) : Math.min(Math.max(supplierBalance, 0), Math.max(customerBalance, 0));
  if (settlementAmount <= 0) {
    throw createError({ statusCode: 400, statusMessage: "Settlement amount must be greater than zero" });
  }
  const result = await prisma.$transaction(async (tx) => {
    const supplierEntry = await tx.ledgerEntry.create({
      data: {
        supplierId,
        amount: settlementAmount,
        type: "CREDIT",
        description: `Contra settlement with customer account \u2014 ${customer.name}`
      }
    });
    const customerEntry = await tx.ledgerEntry.create({
      data: {
        customerId,
        amount: settlementAmount,
        type: "CREDIT",
        description: `Contra settlement with supplier account \u2014 ${supplier.name}`
      }
    });
    return { supplierEntry, customerEntry, settlementAmount };
  });
  return result;
});

export { reconcilePartner_post as default };
//# sourceMappingURL=reconcile-partner.post.mjs.map
