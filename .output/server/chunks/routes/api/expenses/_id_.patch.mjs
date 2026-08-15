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
  await requirePermission(event, "EXPENSES", "UPDATE");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const existing = await prisma.expense.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Expense not found" });
  }
  const data = {};
  if (body.title !== void 0) data.title = body.title;
  if (body.amount !== void 0) data.amount = parseFloat(body.amount);
  if (body.category !== void 0) data.category = body.category;
  if (body.notes !== void 0) data.notes = body.notes;
  if (body.date !== void 0) data.date = new Date(body.date);
  const expense = await prisma.expense.update({
    where: { id },
    data,
    include: { createdBy: { select: { id: true, name: true } } }
  });
  return { expense };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
