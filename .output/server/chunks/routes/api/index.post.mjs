import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
import { p as prisma } from '../../_/prisma.mjs';
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

const index_post = defineEventHandler(async (event) => {
  await requirePermission(event, "CUSTOMERS", "CREATE");
  const body = await readBody(event);
  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: "name is required" });
  }
  const customer = await prisma.customer.create({
    data: { name: body.name, phone: body.phone || null, address: body.address || null }
  });
  if (body.linkedSupplierId) {
    const supplier = await prisma.supplier.findUnique({ where: { id: body.linkedSupplierId } });
    if (!supplier) throw createError({ statusCode: 404, statusMessage: "Linked supplier not found" });
    await prisma.supplier.update({
      where: { id: body.linkedSupplierId },
      data: { linkedCustomerId: customer.id }
    }).catch(() => {
      throw createError({ statusCode: 400, statusMessage: "Supplier already linked to another customer" });
    });
  }
  return { customer };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
