import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
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
  const auth = event.context.auth;
  await requirePermission(event, "PRODUCTS", "READ");
  const custodies = await prisma.distributorCustody.findMany({
    where: { distributorId: auth.userId },
    include: {
      product: {
        select: { id: true, name: true, nameAr: true, sku: true, sellingPrice: true, image: true }
      }
    },
    orderBy: { updatedAt: "desc" }
  });
  const totalItems = custodies.reduce((sum, c) => sum + c.quantity.toNumber(), 0);
  const totalValue = custodies.reduce((sum, c) => {
    var _a;
    return sum + c.quantity.toNumber() * (((_a = c.product.sellingPrice) == null ? void 0 : _a.toNumber()) || 0);
  }, 0);
  return { custodies, totalItems, totalValue };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
