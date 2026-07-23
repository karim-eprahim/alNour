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
  var _a, _b;
  await requirePermission(event, "SALES", "READ");
  const query = getQuery(event);
  const where = { status: { not: "CANCELLED" } };
  const warehouseIds = await getAccessibleWarehouseIds(event);
  if (warehouseIds !== null) {
    where.salesOrder = { warehouseId: { in: warehouseIds } };
  }
  if (query.startDate) {
    where.createdAt = { ...where.createdAt || {}, gte: new Date(query.startDate) };
  }
  if (query.endDate) {
    where.createdAt = { ...where.createdAt || {}, lte: new Date(query.endDate) };
  }
  if (query.customerId) where.customerId = query.customerId;
  const invoices = await prisma.invoice.findMany({
    where,
    include: {
      customer: { select: { id: true, name: true } },
      salesOrder: {
        select: { items: { include: { product: { select: { id: true, name: true, sku: true } } } } }
      },
      payments: { select: { id: true, amount: true, paymentMethod: true, createdAt: true } }
    },
    orderBy: { createdAt: "desc" }
  });
  const totalRevenue = invoices.reduce((s, i) => s + i.totalAmount.toNumber(), 0);
  const totalPaid = invoices.reduce((s, i) => s + i.paidAmount.toNumber(), 0);
  const totalDue = totalRevenue - totalPaid;
  const productSales = {};
  for (const inv of invoices) {
    for (const item of ((_a = inv.salesOrder) == null ? void 0 : _a.items) || []) {
      const pid = item.productId;
      if (!productSales[pid]) {
        productSales[pid] = { name: ((_b = item.product) == null ? void 0 : _b.name) || pid, quantity: 0, revenue: 0 };
      }
      productSales[pid].quantity += item.quantity.toNumber();
      productSales[pid].revenue += item.totalPrice.toNumber();
    }
  }
  const topProducts = Object.entries(productSales).map(([id, data]) => ({ productId: id, ...data })).sort((a, b) => b.revenue - a.revenue).slice(0, 10);
  const customerBalances = await prisma.customer.findMany({
    select: {
      id: true,
      name: true,
      invoices: {
        where: { status: { not: "CANCELLED" } },
        select: { totalAmount: true, paidAmount: true, status: true }
      }
    }
  });
  const customerDues = customerBalances.map((c) => {
    const total = c.invoices.reduce((s, i) => s + i.totalAmount.toNumber(), 0);
    const paid = c.invoices.reduce((s, i) => s + i.paidAmount.toNumber(), 0);
    return { id: c.id, name: c.name, totalDue: total, totalPaid: paid, outstanding: total - paid };
  }).filter((c) => c.outstanding > 0).sort((a, b) => b.outstanding - a.outstanding);
  return {
    invoices,
    summary: {
      totalInvoices: invoices.length,
      totalRevenue,
      totalPaid,
      totalDue
    },
    topProducts,
    customerDues
  };
});

export { index_get as default };
//# sourceMappingURL=index.get6.mjs.map
