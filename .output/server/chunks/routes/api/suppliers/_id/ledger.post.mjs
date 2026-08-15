import { d as defineEventHandler, g as getRouterParam, r as readBody, c as createError } from '../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../_/permissions.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
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

const ledger_post = defineEventHandler(async (event) => {
  await requirePermission(event, "SUPPLIERS", "UPDATE");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  if (!body.amount || !body.type) {
    throw createError({ statusCode: 400, statusMessage: "Amount and type (DEBIT/CREDIT) are required" });
  }
  const supplier = await prisma.supplier.findUnique({ where: { id } });
  if (!supplier) {
    throw createError({ statusCode: 404, statusMessage: "Supplier not found" });
  }
  const entry = await prisma.ledgerEntry.create({
    data: {
      supplierId: id,
      amount: parseFloat(body.amount),
      type: body.type,
      description: body.description
    }
  });
  return { entry };
});

export { ledger_post as default };
//# sourceMappingURL=ledger.post.mjs.map
