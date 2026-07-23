import { d as defineEventHandler, f as getQuery } from '../../../nitro/nitro.mjs';
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
  var _a, _b, _c, _d;
  const query = getQuery(event);
  const startDate = query.startDate ? new Date(query.startDate) : new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1);
  const endDate = query.endDate ? new Date(query.endDate) : /* @__PURE__ */ new Date();
  const dateFilter = { gte: startDate, lte: endDate };
  const warehouseIds = await getAccessibleWarehouseIds(event);
  const invoiceWhere = { createdAt: dateFilter, status: { not: "CANCELLED" } };
  const productionWhere = { createdAt: dateFilter, status: { not: "CANCELLED" } };
  const purchaseWhere = { invoiceDate: dateFilter };
  if (warehouseIds !== null) {
    invoiceWhere.salesOrder = { warehouseId: { in: warehouseIds } };
    productionWhere.warehouseId = { in: warehouseIds };
    purchaseWhere.warehouseId = { in: warehouseIds };
  }
  const invoices = await prisma.invoice.findMany({
    where: invoiceWhere,
    select: { totalAmount: true, paidAmount: true }
  });
  const totalRevenue = invoices.reduce((s, i) => s + i.totalAmount.toNumber(), 0);
  const totalRevenueCollected = invoices.reduce((s, i) => s + i.paidAmount.toNumber(), 0);
  const outstandingRevenue = totalRevenue - totalRevenueCollected;
  const batches = await prisma.productionBatch.findMany({
    where: productionWhere,
    select: { rawMaterialsCost: true, laborCost: true, otherCosts: true, totalBatchCost: true }
  });
  const totalRawMaterialsCost = batches.reduce((s, b) => s + b.rawMaterialsCost.toNumber(), 0);
  const wageAgg = await prisma.workerDailyWage.aggregate({
    where: { date: dateFilter },
    _sum: { dailyWage: true }
  });
  const totalLaborCost = ((_a = wageAgg._sum.dailyWage) == null ? void 0 : _a.toNumber()) || 0;
  const expenseAgg = await prisma.expense.aggregate({
    where: { date: dateFilter },
    _sum: { amount: true }
  });
  const totalExpenses = ((_b = expenseAgg._sum.amount) == null ? void 0 : _b.toNumber()) || 0;
  const purchaseAgg = await prisma.purchaseInvoice.aggregate({
    where: purchaseWhere,
    _sum: { totalAmount: true, paidAmount: true }
  });
  const totalPurchaseCost = ((_c = purchaseAgg._sum.totalAmount) == null ? void 0 : _c.toNumber()) || 0;
  const totalPurchasePaid = ((_d = purchaseAgg._sum.paidAmount) == null ? void 0 : _d.toNumber()) || 0;
  const grossProfit = totalRevenue - totalRawMaterialsCost;
  const netProfit = grossProfit - totalLaborCost - totalExpenses;
  const expenseByCategory = await prisma.expense.groupBy({
    by: ["category"],
    where: { date: dateFilter },
    _sum: { amount: true }
  });
  return {
    summary: {
      period: { startDate, endDate },
      revenue: {
        totalRevenue,
        totalRevenueCollected,
        outstandingRevenue
      },
      costOfGoodsSold: {
        rawMaterialsCost: totalRawMaterialsCost,
        purchaseCost: totalPurchaseCost,
        purchasePaid: totalPurchasePaid
      },
      laborCost: totalLaborCost,
      operatingExpenses: totalExpenses,
      grossProfit,
      netProfit,
      expenseByCategory: expenseByCategory.map((e) => {
        var _a2;
        return {
          category: e.category,
          amount: ((_a2 = e._sum.amount) == null ? void 0 : _a2.toNumber()) || 0
        };
      })
    }
  };
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
