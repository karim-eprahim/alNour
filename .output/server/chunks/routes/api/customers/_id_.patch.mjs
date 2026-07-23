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
  await requirePermission(event, "CUSTOMERS", "UPDATE");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const existing = await prisma.customer.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Customer not found" });
  }
  const data = {};
  if (body.name !== void 0) data.name = body.name;
  if (body.phone !== void 0) data.phone = body.phone;
  if (body.address !== void 0) data.address = body.address;
  const customer = await prisma.customer.update({ where: { id }, data });
  if (body.linkedSupplierId !== void 0) {
    await prisma.supplier.updateMany({
      where: { linkedCustomerId: id },
      data: { linkedCustomerId: null }
    });
    if (body.linkedSupplierId) {
      const supplier = await prisma.supplier.findUnique({ where: { id: body.linkedSupplierId } });
      if (!supplier) throw createError({ statusCode: 404, statusMessage: "Linked supplier not found" });
      await prisma.supplier.update({
        where: { id: body.linkedSupplierId },
        data: { linkedCustomerId: id }
      }).catch(() => {
        throw createError({ statusCode: 400, statusMessage: "Supplier already linked to another customer" });
      });
    }
  }
  return { customer };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
