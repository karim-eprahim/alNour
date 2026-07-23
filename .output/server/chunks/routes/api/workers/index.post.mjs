import { d as defineEventHandler, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  await requirePermission(event, "WORKERS", "CREATE");
  const body = await readBody(event);
  if (!body.workerId || !body.amount) {
    throw createError({ statusCode: 400, statusMessage: "workerId and amount are required" });
  }
  const worker = await prisma.worker.findUnique({ where: { id: body.workerId } });
  if (!worker) {
    throw createError({ statusCode: 404, statusMessage: "Worker not found" });
  }
  const advance = await prisma.workerAdvance.create({
    data: {
      workerId: body.workerId,
      amount: parseFloat(body.amount),
      date: body.date ? new Date(body.date) : /* @__PURE__ */ new Date(),
      notes: body.notes || null
    },
    include: { worker: { select: { id: true, name: true } } }
  });
  return { advance };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
