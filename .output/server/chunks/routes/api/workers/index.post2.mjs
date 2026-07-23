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
  var _a;
  await requirePermission(event, "ATTENDANCE", "CREATE");
  const body = await readBody(event);
  if (!body.date || !((_a = body.records) == null ? void 0 : _a.length)) {
    throw createError({ statusCode: 400, statusMessage: "date and records array are required" });
  }
  const date = new Date(body.date);
  date.setHours(0, 0, 0, 0);
  const results = await prisma.$transaction(async (tx) => {
    const created = [];
    for (const record of body.records) {
      const existing = await tx.attendance.findUnique({
        where: {
          workerId_date: {
            workerId: record.workerId,
            date
          }
        }
      });
      if (existing) {
        const updated = await tx.attendance.update({
          where: { id: existing.id },
          data: {
            status: record.status || "PRESENT",
            notes: record.notes || null
          },
          include: { worker: { select: { id: true, name: true } } }
        });
        created.push(updated);
      } else {
        const att = await tx.attendance.create({
          data: {
            workerId: record.workerId,
            date,
            status: record.status || "PRESENT",
            notes: record.notes || null
          },
          include: { worker: { select: { id: true, name: true } } }
        });
        created.push(att);
      }
    }
    return created;
  });
  return { attendance: results };
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
