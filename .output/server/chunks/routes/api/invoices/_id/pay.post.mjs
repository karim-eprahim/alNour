import { d as defineEventHandler, g as getRouterParam, r as readBody, c as createError } from '../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../_/permissions.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
import { v as validateWarehouseAccess } from '../../../../_/warehouse-access.mjs';
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

const pay_post = defineEventHandler(async (event) => {
  await requirePermission(event, "SALES", "UPDATE");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const auth = event.context.auth;
  if (!body.amount || parseFloat(body.amount) <= 0) {
    throw createError({ statusCode: 400, statusMessage: "Amount must be a positive number" });
  }
  const invoice = await prisma.$transaction(async (tx) => {
    var _a;
    const inv = await tx.invoice.findUnique({
      where: { id },
      include: { salesOrder: { select: { warehouseId: true } } }
    });
    if (!inv) {
      throw createError({ statusCode: 404, statusMessage: "Invoice not found" });
    }
    await validateWarehouseAccess(event, inv.warehouseId);
    const amount = parseFloat(body.amount);
    const newPaid = inv.paidAmount.toNumber() + amount;
    const payment = await tx.payment.create({
      data: {
        invoiceId: id,
        createdById: auth.userId,
        amount,
        paymentMethod: body.paymentMethod || "CASH",
        notes: body.notes || null
      }
    });
    const newStatus = newPaid >= inv.totalAmount.toNumber() ? "PAID" : "PARTIAL";
    await tx.invoice.update({
      where: { id },
      data: { paidAmount: newPaid, status: newStatus }
    });
    const authUser = await tx.user.findUnique({
      where: { id: auth.userId },
      select: { id: true, role: { select: { name: true } } }
    });
    if (((_a = authUser == null ? void 0 : authUser.role) == null ? void 0 : _a.name) === "DISTRIBUTOR") {
      await tx.user.update({
        where: { id: auth.userId },
        data: { cashOnHand: { increment: amount } }
      });
      await tx.distributorCashMovement.create({
        data: {
          distributorId: auth.userId,
          amount,
          type: "PAYMENT_COLLECTED",
          referenceId: id,
          notes: `Payment collected for invoice ${inv.invoiceNumber}`
        }
      });
    }
    await tx.ledgerEntry.create({
      data: {
        customerId: inv.customerId,
        amount,
        type: "CREDIT",
        description: `Payment for invoice ${inv.invoiceNumber}`
      }
    });
    return payment;
  });
  return { payment: invoice };
});

export { pay_post as default };
//# sourceMappingURL=pay.post.mjs.map
