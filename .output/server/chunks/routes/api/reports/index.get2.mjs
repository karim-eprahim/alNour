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
  var _a;
  await requirePermission(event, "INVENTORY", "READ");
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
  if (query.productType) {
    const products = await prisma.product.findMany({
      where: { type: query.productType },
      select: { id: true }
    });
    where.productId = { in: products.map((p) => p.id) };
  }
  const stocks = await prisma.stock.findMany({
    where,
    include: {
      warehouse: { select: { id: true, name: true } },
      product: { select: { id: true, name: true, sku: true, type: true, purchaseCost: true, sellingPrice: true } }
    },
    orderBy: [{ warehouse: { name: "asc" } }, { product: { name: "asc" } }]
  });
  let totalQty = 0;
  let totalValuation = 0;
  for (const s of stocks) {
    const qty = s.quantity.toNumber();
    totalQty += qty;
    totalValuation += qty * (((_a = s.product.purchaseCost) == null ? void 0 : _a.toNumber()) || 0);
  }
  const productTypes = await prisma.product.groupBy({
    by: ["type"],
    _count: true
  });
  const movementCount = await prisma.stockMovement.count({ where });
  return {
    stocks,
    summary: {
      totalProducts: stocks.length,
      totalQuantity: totalQty,
      totalValuation,
      movementCount,
      productTypes
    }
  };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
