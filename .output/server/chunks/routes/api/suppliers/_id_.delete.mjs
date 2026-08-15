import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  await requirePermission(event, "SUPPLIERS", "DELETE");
  const id = getRouterParam(event, "id");
  const existing = await prisma.supplier.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Supplier not found" });
  }
  const invoiceCount = await prisma.purchaseInvoice.count({ where: { supplierId: id } });
  if (invoiceCount > 0) {
    throw createError({ statusCode: 400, statusMessage: "Cannot delete supplier with existing purchase invoices" });
  }
  await prisma.supplier.delete({ where: { id } });
  return { success: true };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
