import { d as defineEventHandler, f as getQuery } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { v as validateWarehouseAccess, g as getAccessibleWarehouseIds } from '../../../_/warehouse-access.mjs';
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
  if (query.startDate) {
    where.invoiceDate = { ...where.invoiceDate || {}, gte: new Date(query.startDate) };
  }
  if (query.endDate) {
    where.invoiceDate = { ...where.invoiceDate || {}, lte: new Date(query.endDate) };
  }
  const invoices = await prisma.purchaseInvoice.findMany({
    where,
    include: {
      supplier: { select: { id: true, name: true, company: true } },
      warehouse: { select: { id: true, name: true } },
      items: {
        include: { product: { select: { id: true, name: true, sku: true, type: true } } }
      }
    },
    orderBy: { invoiceDate: "desc" }
  });
  const summary = {
    totalInvoices: invoices.length,
    totalAmount: invoices.reduce((s, i) => s + Number(i.totalAmount), 0),
    totalPaid: invoices.reduce((s, i) => s + Number(i.paidAmount), 0),
    totalDue: invoices.reduce((s, i) => s + Number(i.totalAmount) - Number(i.paidAmount), 0),
    totalItems: invoices.reduce((s, i) => s + i.items.reduce((si, item) => si + Number(item.quantity), 0), 0)
  };
  return { invoices, summary };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
