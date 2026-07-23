import { d as defineEventHandler, g as getRouterParam, r as readBody, c as createError } from '../../../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../../../_/permissions.mjs';
import { p as prisma } from '../../../../../_/prisma.mjs';
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

const complete_post = defineEventHandler(async (event) => {
  const auth = event.context.auth;
  await requirePermission(event, "SALES", "UPDATE");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const order = await prisma.salesOrder.findUnique({
    where: { id },
    include: {
      items: true,
      warehouse: { select: { id: true, name: true } }
    }
  });
  if (!order) {
    throw createError({ statusCode: 404, statusMessage: "Sales order not found" });
  }
  if (order.assignedDistributorId !== auth.userId) {
    throw createError({ statusCode: 403, statusMessage: "This order is not assigned to you" });
  }
  if (!["OUT_FOR_DELIVERY", "ACCEPTED", "ASSIGNED", "PENDING"].includes(order.status)) {
    throw createError({ statusCode: 400, statusMessage: "Order cannot be delivered in current status" });
  }
  const result = await prisma.$transaction(async (tx) => {
    const invCount = await tx.invoice.count();
    const invoiceNumber = `INV-${String(invCount + 1).padStart(6, "0")}`;
    const paidAmount = body.paidAmount ? parseFloat(body.paidAmount) : 0;
    const totalAmount = order.totalAmount.toNumber();
    const invoiceStatus = paidAmount >= totalAmount ? "PAID" : paidAmount > 0 ? "PARTIAL" : "UNPAID";
    const invoice = await tx.invoice.create({
      data: {
        invoiceNumber,
        salesOrderId: order.id,
        customerId: order.customerId,
        warehouseId: order.warehouseId,
        createdById: auth.userId,
        totalAmount,
        paidAmount,
        status: invoiceStatus,
        saleSource: "OFFICE_ORDER",
        items: {
          create: order.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice
          }))
        }
      }
    });
    for (const item of order.items) {
      const custody = await tx.distributorCustody.findUnique({
        where: {
          distributorId_productId: {
            distributorId: auth.userId,
            productId: item.productId
          }
        }
      });
      const itemQty = item.quantity.toNumber();
      const custodyQty = custody ? custody.quantity.toNumber() : 0;
      if (custodyQty < itemQty) {
        throw createError({
          statusCode: 400,
          statusMessage: `Insufficient custody for product ${item.productId}. Have ${custodyQty}, need ${itemQty}`
        });
      }
      const newCustodyQty = custodyQty - itemQty;
      if (newCustodyQty <= 0) {
        await tx.distributorCustody.delete({ where: { id: custody.id } });
      } else {
        await tx.distributorCustody.update({
          where: { id: custody.id },
          data: { quantity: newCustodyQty }
        });
      }
      await tx.distributorOperation.create({
        data: {
          distributorId: auth.userId,
          productId: item.productId,
          quantity: itemQty,
          type: "SALE"
        }
      });
    }
    await tx.salesOrder.update({
      where: { id: order.id },
      data: { status: "DELIVERED" }
    });
    if (paidAmount > 0) {
      await tx.payment.create({
        data: {
          invoiceId: invoice.id,
          createdById: auth.userId,
          amount: paidAmount,
          paymentMethod: body.paymentMethod || "CASH",
          notes: body.paymentNotes || null
        }
      });
      await tx.user.update({
        where: { id: auth.userId },
        data: { cashOnHand: { increment: paidAmount } }
      });
      await tx.distributorCashMovement.create({
        data: {
          distributorId: auth.userId,
          amount: paidAmount,
          type: "PAYMENT_COLLECTED",
          referenceId: invoice.id,
          notes: `Payment collected for invoice ${invoiceNumber}`
        }
      });
    }
    await tx.ledgerEntry.create({
      data: {
        customerId: order.customerId,
        amount: totalAmount,
        type: "DEBIT",
        description: `Sales order ${order.orderNumber} / Invoice ${invoiceNumber}`
      }
    });
    if (paidAmount > 0) {
      await tx.ledgerEntry.create({
        data: {
          customerId: order.customerId,
          amount: paidAmount,
          type: "CREDIT",
          description: `Payment for invoice ${invoiceNumber}`
        }
      });
    }
    return { invoice };
  });
  return result;
});

export { complete_post as default };
//# sourceMappingURL=complete.post.mjs.map
