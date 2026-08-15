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
  await requirePermission(event, "EXPENSES", "CREATE");
  const body = await readBody(event);
  const auth = event.context.auth;
  if (!body.title || !body.amount || !body.category) {
    throw createError({ statusCode: 400, statusMessage: "title, amount, and category are required" });
  }
  const expense = await prisma.expense.create({
    data: {
      title: body.title,
      amount: parseFloat(body.amount),
      category: body.category,
      notes: body.notes || null,
      date: body.date ? new Date(body.date) : /* @__PURE__ */ new Date(),
      createdById: auth.userId
    },
    include: { createdBy: { select: { id: true, name: true } } }
  });
  return { expense };
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
