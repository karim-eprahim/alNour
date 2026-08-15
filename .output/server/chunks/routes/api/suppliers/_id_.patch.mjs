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
  await requirePermission(event, "SUPPLIERS", "UPDATE");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const existing = await prisma.supplier.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Supplier not found" });
  }
  const data = {};
  if (body.name) data.name = body.name;
  if (body.phone !== void 0) data.phone = body.phone;
  if (body.email !== void 0) data.email = body.email;
  if (body.address !== void 0) data.address = body.address;
  if (body.company !== void 0) data.company = body.company;
  if (body.linkedCustomerId !== void 0) data.linkedCustomerId = body.linkedCustomerId || null;
  const supplier = await prisma.supplier.update({
    where: { id },
    data
  }).catch(() => {
    throw createError({ statusCode: 400, statusMessage: "Customer already linked to another supplier" });
  });
  return { supplier };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
