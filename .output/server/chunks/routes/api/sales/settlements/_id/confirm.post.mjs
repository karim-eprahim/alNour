import { d as defineEventHandler, f as getRouterParam, c as createError } from '../../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../../_/permissions.mjs';
import { p as prisma } from '../../../../../_/prisma.mjs';
import { g as getDistributorCustody, s as serializeSettlement } from '../../../../../_/settlement.mjs';
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

const confirm_post = defineEventHandler(async (event) => {
  const auth = event.context.auth;
  await requirePermission(event, "SALES", "UPDATE");
  const id = getRouterParam(event, "id");
  const settlement = await prisma.$transaction(async (tx) => {
    const existing = await tx.settlement.findUnique({ where: { id } });
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: "Settlement not found" });
    }
    if (existing.status !== "SUBMITTED") {
      throw createError({
        statusCode: 400,
        statusMessage: `Settlement cannot be confirmed from status ${existing.status}`
      });
    }
    const amount = existing.amount.toNumber();
    if (amount <= 0) {
      throw createError({ statusCode: 400, statusMessage: "Settlement amount is invalid" });
    }
    const custodySummary = await getDistributorCustody(tx, existing.distributorId);
    if (custodySummary.custody < amount) {
      throw createError({
        statusCode: 400,
        statusMessage: `Distributor does not have enough custody. Available to settle: ${custodySummary.custody.toFixed(2)}`
      });
    }
    const claimed = await tx.settlement.updateMany({
      where: { id, status: "SUBMITTED" },
      data: {
        status: "CONFIRMED",
        confirmedAt: /* @__PURE__ */ new Date(),
        confirmedBy: auth.userId
      }
    });
    if (claimed.count === 0) {
      throw createError({ statusCode: 400, statusMessage: "Settlement has already been processed" });
    }
    await tx.user.update({
      where: { id: existing.distributorId },
      data: { cashOnHand: { decrement: amount } }
    });
    await tx.distributorCashMovement.create({
      data: {
        distributorId: existing.distributorId,
        amount,
        type: "CASH_HANDOVER",
        referenceId: existing.id,
        notes: `Settlement ${existing.settlementNumber} confirmed`
      }
    });
    await tx.ledgerEntry.create({
      data: {
        distributorId: existing.distributorId,
        amount,
        type: "CREDIT",
        description: `Settlement ${existing.settlementNumber} confirmed`
      }
    });
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

export { confirm_post as default };
//# sourceMappingURL=confirm.post.mjs.map
