import { d as defineEventHandler, f as getQuery } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { g as getAccessibleWarehouseIds } from '../../../_/warehouse-access.mjs';
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
  await requirePermission(event, "PURCHASES", "READ");
  const query = getQuery(event);
  const where = {};
  const warehouseIds = await getAccessibleWarehouseIds(event);
  if (warehouseIds !== null) {
    where.purchaseInvoice = {
      warehouseId: { in: warehouseIds }
    };
  }
  if (query.purchaseInvoiceId) where.purchaseInvoiceId = query.purchaseInvoiceId;
  const limit = parseInt(query.limit) || 50;
  const page = parseInt(query.page) || 1;
  const skip = (page - 1) * limit;
  const [tickets, total] = await Promise.all([
    prisma.weightTicket.findMany({
      where,
      include: {
        purchaseInvoice: {
          select: {
            invoiceNumber: true,
            warehouseId: true,
            supplier: { select: { id: true, name: true } }
          }
        }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),
    prisma.weightTicket.count({ where })
  ]);
  return { tickets, total, page, limit };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
