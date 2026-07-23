import { d as defineEventHandler, f as getQuery } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
import { g as getAccessibleWarehouseIds } from '../../_/warehouse-access.mjs';
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
  await requirePermission(event, "SALES", "READ");
  const query = getQuery(event);
  const where = {};
  const warehouseIds = await getAccessibleWarehouseIds(event);
  if (warehouseIds !== null) {
    where.warehouseId = { in: warehouseIds };
  }
  if (query.customerId) where.customerId = query.customerId;
  if (query.status) where.status = query.status;
  if (query.saleSource) where.saleSource = query.saleSource;
  if (query.warehouseId) where.warehouseId = query.warehouseId;
  if (query.search) {
    where.OR = [
      { invoiceNumber: { contains: query.search, mode: "insensitive" } },
      { customer: { name: { contains: query.search, mode: "insensitive" } } }
    ];
  }
  if (query.startDate) {
    where.createdAt = { ...where.createdAt || {}, gte: new Date(query.startDate) };
  }
  if (query.endDate) {
    where.createdAt = { ...where.createdAt || {}, lte: new Date(query.endDate) };
  }
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const skip = (page - 1) * limit;
  const [invoices, total] = await Promise.all([
    prisma.invoice.findMany({
      where,
      include: {
        customer: { select: { id: true, name: true } },
        warehouse: { select: { id: true, name: true } },
        salesOrder: { select: { id: true, orderNumber: true } },
        createdBy: { select: { id: true, name: true } },
        items: {
          include: { product: { select: { id: true, name: true, sku: true } } }
        },
        payments: {
          select: { id: true, amount: true, paymentMethod: true, createdAt: true },
          orderBy: { createdAt: "desc" }
        },
        _count: { select: { payments: true, items: true } }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),
    prisma.invoice.count({ where })
  ]);
  return { invoices, total, page, limit };
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
