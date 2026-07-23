import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
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

const users_get = defineEventHandler(async () => {
  const distributors = await prisma.user.findMany({
    where: { role: { name: "DISTRIBUTOR" }, status: "ACTIVE" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      roleId: true,
      role: { select: { id: true, name: true } },
      status: true,
      cashOnHand: true,
      createdAt: true,
      custodies: {
        include: {
          product: { select: { id: true, name: true, nameAr: true, sku: true, sellingPrice: true } }
        }
      },
      ledgerEntries: {
        orderBy: { createdAt: "desc" },
        take: 1
      }
    },
    orderBy: { name: "asc" }
  });
  const result = distributors.map((d) => {
    const totalCustody = d.custodies.reduce((sum, c) => sum + c.quantity.toNumber(), 0);
    const balance = d.ledgerEntries.reduce((sum, e) => {
      return e.type === "DEBIT" ? sum + e.amount.toNumber() : sum - e.amount.toNumber();
    }, 0);
    const { ledgerEntries, ...rest } = d;
    return { ...rest, totalCustody, balance };
  });
  return { distributors: result };
});

export { users_get as default };
//# sourceMappingURL=users.get.mjs.map
