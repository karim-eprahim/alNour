import { d as defineEventHandler } from '../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../_/permissions.mjs';
import { g as getAccessibleWarehouseIds } from '../../../../_/warehouse-access.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jsonwebtoken';
import '@prisma/client';
import '@prisma/adapter-pg';
import 'pg';

const distribution_get = defineEventHandler(async (event) => {
  await requirePermission(event, "INVENTORY", "READ");
  const where = {};
  const warehouseIds = await getAccessibleWarehouseIds(event);
  if (warehouseIds !== null) {
    where.warehouseId = { in: warehouseIds };
  }
  const stocks = await prisma.stock.findMany({
    where,
    select: {
      quantity: true,
      product: { select: { name: true } },
      warehouse: { select: { name: true } }
    }
  });
  const byProduct = /* @__PURE__ */ new Map();
  const byWarehouse = /* @__PURE__ */ new Map();
  for (const s of stocks) {
    const qty = s.quantity.toNumber();
    if (qty <= 0)
      continue;
    byProduct.set(s.product.name, (byProduct.get(s.product.name) || 0) + qty);
    byWarehouse.set(s.warehouse.name, (byWarehouse.get(s.warehouse.name) || 0) + qty);
  }
  const data = Array.from(byProduct.entries()).map(([product, value]) => ({ product, value })).sort((a, b) => b.value - a.value);
  const warehouseData = Array.from(byWarehouse.entries()).map(([warehouse, value]) => ({ warehouse, value })).sort((a, b) => b.value - a.value);
  return { data, warehouseData };
});

export { distribution_get as default };
//# sourceMappingURL=distribution.get.mjs.map
