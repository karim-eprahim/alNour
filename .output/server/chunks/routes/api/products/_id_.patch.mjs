import { d as defineEventHandler, g as getRouterParam, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
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

const _id__patch = defineEventHandler(async (event) => {
  await requirePermission(event, "PRODUCTS", "UPDATE");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  }
  const data = {};
  if (body.name) data.name = body.name;
  if (body.nameAr) data.nameAr = body.nameAr;
  if (body.type) data.type = body.type;
  if (body.image !== void 0) data.image = body.image;
  if (body.weight !== void 0) data.weight = body.weight ? parseFloat(body.weight) : null;
  if (body.purchaseCost !== void 0) data.purchaseCost = body.purchaseCost ? parseFloat(body.purchaseCost) : null;
  if (body.sellingPrice !== void 0) data.sellingPrice = body.sellingPrice ? parseFloat(body.sellingPrice) : null;
  const product = await prisma.product.update({
    where: { id },
    data,
    include: {
      stocks: { include: { warehouse: true } }
    }
  });
  return { product };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
