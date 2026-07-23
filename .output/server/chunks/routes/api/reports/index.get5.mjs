import { d as defineEventHandler, f as getQuery } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { g as getAccessibleWarehouseIds, v as validateWarehouseAccess } from '../../../_/warehouse-access.mjs';
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
  if (query.warehouseId) {
    await validateWarehouseAccess(event, query.warehouseId);
    where.warehouseId = query.warehouseId;
  } else if (warehouseIds !== null) {
    where.warehouseId = { in: warehouseIds };
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
      },
      weightTickets: { select: { id: true, netWeight: true, ticketNumber: true } }
    },
    orderBy: { invoiceDate: "desc" }
  });
  const totalAmount = invoices.reduce((s, i) => s + i.totalAmount.toNumber(), 0);
  const totalPaid = invoices.reduce((s, i) => s + i.paidAmount.toNumber(), 0);
  const totalDue = totalAmount - totalPaid;
  let totalRawQty = 0;
  for (const inv of invoices) {
    for (const item of inv.items) {
      totalRawQty += item.quantity.toNumber();
    }
  }
  const totalWeightReceived = invoices.reduce(
    (s, i) => s + i.weightTickets.reduce((ws, wt) => ws + wt.netWeight.toNumber(), 0),
    0
  );
  const supplierPayables = await prisma.supplier.findMany({
    select: {
      id: true,
      name: true,
      purchaseInvoices: {
        where: {
          ...warehouseIds !== null ? { warehouseId: { in: warehouseIds } } : {},
          ...query.startDate ? { invoiceDate: { gte: new Date(query.startDate) } } : {},
          ...query.endDate ? { invoiceDate: { lte: new Date(query.endDate) } } : {}
        },
        select: { totalAmount: true, paidAmount: true }
      }
    }
  });
  const supplierBalances = supplierPayables.map((s) => {
    const total = s.purchaseInvoices.reduce((sum, i) => sum + i.totalAmount.toNumber(), 0);
    const paid = s.purchaseInvoices.reduce((sum, i) => sum + i.paidAmount.toNumber(), 0);
    return { id: s.id, name: s.name, totalAmount: total, totalPaid: paid, outstanding: total - paid };
  }).filter((s) => s.outstanding > 0).sort((a, b) => b.outstanding - a.outstanding);
  return {
    invoices,
    summary: {
      totalInvoices: invoices.length,
      totalAmount,
      totalPaid,
      totalDue,
      totalRawQty,
      totalWeightReceived
    },
    supplierBalances
  };
});

export { index_get as default };
//# sourceMappingURL=index.get5.mjs.map
