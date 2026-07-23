import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
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
  var _a, _b, _c, _d, _e, _f;
  const auth = event.context.auth;
  const userRole = auth.role;
  const warehouseIds = await getAccessibleWarehouseIds(event);
  const data = {
    userRole,
    financials: null,
    inventory: null,
    counts: {
      totalCustomers: 0,
      totalSuppliers: 0,
      totalWorkers: 0,
      totalProducts: 0
    }
  };
  const [workerCount, productCount, customerCount, supplierCount] = await Promise.all([
    prisma.worker.count(),
    prisma.product.count(),
    prisma.customer.count(),
    prisma.supplier.count()
  ]);
  data.counts = {
    totalCustomers: customerCount,
    totalSuppliers: supplierCount,
    totalWorkers: workerCount,
    totalProducts: productCount
  };
  {
    const invoiceWhere = { status: { not: "CANCELLED" } };
    const productionWhere = { status: { not: "CANCELLED" } };
    if (warehouseIds !== null) {
      invoiceWhere.salesOrder = { warehouseId: { in: warehouseIds } };
      productionWhere.warehouseId = { in: warehouseIds };
    }
    const [invoiceAgg, cogsAgg, laborAgg, expenseAgg, recentExpenses, recentInvoices] = await Promise.all([
      prisma.invoice.aggregate({
        _sum: { totalAmount: true, paidAmount: true },
        where: invoiceWhere
      }),
      prisma.productionBatch.aggregate({
        _sum: { rawMaterialsCost: true },
        where: productionWhere
      }),
      prisma.workerDailyWage.aggregate({
        _sum: { dailyWage: true }
      }),
      prisma.expense.aggregate({
        _sum: { amount: true }
      }),
      prisma.expense.findMany({
        take: 5,
        orderBy: { date: "desc" },
        select: { id: true, title: true, amount: true, category: true, date: true }
      }),
      prisma.invoice.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        where: invoiceWhere,
        select: {
          id: true,
          invoiceNumber: true,
          totalAmount: true,
          paidAmount: true,
          status: true,
          createdAt: true,
          customer: { select: { id: true, name: true } }
        }
      })
    ]);
    const totalRevenue = ((_a = invoiceAgg._sum.totalAmount) == null ? void 0 : _a.toNumber()) || 0;
    const totalCollected = ((_b = invoiceAgg._sum.paidAmount) == null ? void 0 : _b.toNumber()) || 0;
    const totalCogs = ((_c = cogsAgg._sum.rawMaterialsCost) == null ? void 0 : _c.toNumber()) || 0;
    const totalLaborCosts = ((_d = laborAgg._sum.dailyWage) == null ? void 0 : _d.toNumber()) || 0;
    const totalExpenses = ((_e = expenseAgg._sum.amount) == null ? void 0 : _e.toNumber()) || 0;
    const grossProfit = totalRevenue - totalCogs;
    const netProfit = grossProfit - totalLaborCosts - totalExpenses;
    data.financials = {
      totalRevenue,
      totalCollected,
      totalCogs,
      totalLaborCosts,
      totalExpenses,
      grossProfit,
      netProfit,
      recentExpenses,
      recentInvoices
    };
  }
  {
    const stockWhere = {};
    const movementWhere = {};
    if (warehouseIds !== null) {
      stockWhere.warehouseId = { in: warehouseIds };
      movementWhere.warehouseId = { in: warehouseIds };
    }
    const [stocks, movements, warehouseCount] = await Promise.all([
      prisma.stock.findMany({
        where: stockWhere,
        include: {
          warehouse: { select: { id: true, name: true } },
          product: { select: { id: true, name: true, sku: true, type: true, purchaseCost: true } }
        }
      }),
      prisma.stockMovement.findMany({
        where: movementWhere,
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          product: { select: { id: true, name: true } },
          warehouse: { select: { id: true, name: true } },
          createdBy: { select: { id: true, name: true } }
        }
      }),
      warehouseIds !== null ? prisma.warehouse.count({ where: { id: { in: warehouseIds } } }) : prisma.warehouse.count()
    ]);
    const totalStockQuantity = stocks.reduce((s, st) => s + st.quantity.toNumber(), 0);
    const lowStockItems = stocks.filter((st) => st.quantity.toNumber() <= 0).map((st) => ({
      id: st.id,
      productId: st.productId,
      productName: st.product.name,
      productSku: st.product.sku,
      warehouseName: st.warehouse.name,
      quantity: st.quantity.toNumber()
    }));
    data.inventory = {
      totalStockQuantity,
      lowStockAlerts: {
        count: lowStockItems.length,
        items: lowStockItems.slice(0, 10)
      },
      recentMovements: movements.map((m) => ({
        id: m.id,
        productId: m.productId,
        productName: m.product.name,
        warehouseName: m.warehouse.name,
        type: m.type,
        quantity: m.quantity.toNumber(),
        notes: m.notes,
        createdAt: m.createdAt,
        createdByName: m.createdBy.name
      })),
      warehouseCount
    };
  }
  if (userRole === "DISTRIBUTOR") {
    const todayStart = /* @__PURE__ */ new Date();
    todayStart.setHours(0, 0, 0, 0);
    const [custodies, salesToday, ledgerEntries] = await Promise.all([
      prisma.distributorCustody.findMany({
        where: { distributorId: auth.userId },
        include: {
          product: { select: { id: true, name: true, nameAr: true } }
        }
      }),
      prisma.salesOrder.count({
        where: {
          createdById: auth.userId,
          createdAt: { gte: todayStart }
        }
      }),
      prisma.ledgerEntry.findMany({
        where: { distributorId: auth.userId },
        orderBy: { createdAt: "desc" }
      })
    ]);
    const totalCustody = custodies.reduce((sum, c) => sum + c.quantity.toNumber(), 0);
    const outstanding = ledgerEntries.reduce((sum, e) => {
      return e.type === "DEBIT" ? sum + e.amount.toNumber() : sum - e.amount.toNumber();
    }, 0);
    data.distributor = {
      custodies: custodies.map((c) => ({
        productId: c.productId,
        productName: c.product.name,
        quantity: c.quantity.toNumber()
      })),
      totalCustody,
      salesToday,
      outstanding
    };
  }
  {
    const [custodyAgg, distributorsWithCustody] = await Promise.all([
      prisma.distributorCustody.aggregate({
        _sum: { quantity: true }
      }),
      prisma.distributorCustody.findMany({
        include: {
          distributor: { select: { id: true, name: true } },
          product: { select: { id: true, name: true } }
        }
      })
    ]);
    const byDistributor = {};
    for (const c of distributorsWithCustody) {
      const did = c.distributor.id;
      if (!byDistributor[did]) {
        byDistributor[did] = { name: c.distributor.name, totalQty: 0, products: [] };
      }
      byDistributor[did].totalQty += c.quantity.toNumber();
      byDistributor[did].products.push({ name: c.product.name, qty: c.quantity.toNumber() });
    }
    data.goodsInTransit = {
      totalQuantity: ((_f = custodyAgg._sum.quantity) == null ? void 0 : _f.toNumber()) || 0,
      distributorCount: Object.keys(byDistributor).length,
      byDistributor: Object.values(byDistributor)
    };
  }
  return data;
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
