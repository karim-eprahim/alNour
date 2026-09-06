import { d as defineEventHandler, f as getRouterParam, r as readBody, c as createError } from '../../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../../_/permissions.mjs';
import { p as prisma } from '../../../../../_/prisma.mjs';
import { s as serializeSettlement } from '../../../../../_/settlement.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jsonwebtoken';
import '@prisma/client';
import '@prisma/adapter-pg';
import 'pg';

const reject_post = defineEventHandler(async (event) => {
  await requirePermission(event, "SALES", "UPDATE");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const rejectionReason = (body.rejectionReason || "").trim();
  if (!rejectionReason) {
    throw createError({ statusCode: 400, statusMessage: "Rejection reason is required" });
  }
  const settlement = await prisma.$transaction(async (tx) => {
    const existing = await tx.settlement.findUnique({ where: { id } });
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: "Settlement not found" });
    }
    if (existing.status !== "SUBMITTED") {
      throw createError({
        statusCode: 400,
        statusMessage: `Settlement cannot be rejected from status ${existing.status}`
      });
    }
    const claimed = await tx.settlement.updateMany({
      where: { id, status: "SUBMITTED" },
      data: {
        status: "REJECTED",
        rejectionReason
      }
    });
    if (claimed.count === 0) {
      throw createError({ statusCode: 400, statusMessage: "Settlement has already been processed" });
    }
    return tx.settlement.findUnique({
      where: { id },
      include: {
        distributor: { select: { id: true, name: true } },
        confirmedByUser: { select: { id: true, name: true } }
      }
    });
  });
  return { settlement: serializeSettlement(settlement) };
});

export { reject_post as default };
//# sourceMappingURL=reject.post.mjs.map
