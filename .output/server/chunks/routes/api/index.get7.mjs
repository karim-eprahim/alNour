import { d as defineEventHandler, f as getQuery } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
import { v as validateWarehouseAccess, g as getAccessibleWarehouseIds } from '../../_/warehouse-access.mjs';
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
  await requirePermission(event, "PURCHASES", "READ");
  const query = getQuery(event);
  const where = {};
  if (query.warehouseId) {
    await validateWarehouseAccess(event, query.warehouseId);
    where.warehouseId = query.warehouseId;
  } else {
    const warehouseIds = await getAccessibleWarehouseIds(event);
    if (warehouseIds !== null) {
      where.warehouseId = { in: warehouseIds };
    }
  }
  if (query.supplierId) where.supplierId = query.supplierId;
  if (query.search) {
    where.OR = [
      { invoiceNumber: { contains: query.search, mode: "insensitive" } },
      { supplier: { name: { contains: query.search, mode: "insensitive" } } }
    ];
  }
  if (query.startDate) {
    where.invoiceDate = { ...where.invoiceDate || {}, gte: new Date(query.startDate) };
  }
  if (query.endDate) {
    where.invoiceDate = { ...where.invoiceDate || {}, lte: new Date(query.endDate) };
  }
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const skip = (page - 1) * limit;
  const [invoices, total] = await Promise.all([
    prisma.purchaseInvoice.findMany({
      where,
      include: {
        supplier: { select: { id: true, name: true, company: true } },
        warehouse: { select: { id: true, name: true } },
        items: {
          include: { product: { select: { id: true, name: true, sku: true } } }
        },
        weightTickets: true,
        _count: { select: { weightTickets: true, items: true } }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),
    prisma.purchaseInvoice.count({ where })
  ]);
  return { invoices, total, page, limit };
});

export { index_get as default };
//# sourceMappingURL=index.get7.mjs.map
