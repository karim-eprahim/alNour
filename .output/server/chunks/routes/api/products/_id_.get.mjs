import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  await requirePermission(event, "PRODUCTS", "READ");
  const id = getRouterParam(event, "id");
  const warehouseIds = await getAccessibleWarehouseIds(event);
  const stockWhere = {};
  const movementWhere = {};
  if (warehouseIds !== null) {
    stockWhere.warehouseId = { in: warehouseIds };
    movementWhere.warehouseId = { in: warehouseIds };
  }
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      stocks: {
        where: stockWhere,
        include: { warehouse: true }
      },
      movements: {
        where: movementWhere,
        include: { warehouse: true, createdBy: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
        take: 50
      }
    }
  });
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  }
  return { product };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
