import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
import { v as validateWarehouseAccess } from '../../_/warehouse-access.mjs';
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
  var _a;
  await requirePermission(event, "PURCHASES", "CREATE");
  const body = await readBody(event);
  const auth = event.context.auth;
  await validateWarehouseAccess(event, body.warehouseId);
  if (!body.supplierId || !body.warehouseId || !((_a = body.items) == null ? void 0 : _a.length)) {
    throw createError({ statusCode: 400, statusMessage: "supplierId, warehouseId, and items are required" });
  }
  const invoice = await prisma.$transaction(async (tx) => {
    const count = await tx.purchaseInvoice.count();
    const invoiceNumber = `PINV-${String(count + 1).padStart(6, "0")}`;
    let totalAmount = 0;
    const itemsData = body.items.map((item) => {
      const qty = parseFloat(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      const totalPrice = qty * unitPrice;
      totalAmount += totalPrice;
      return {
        productId: item.productId,
        quantity: qty,
        unitPrice,
        totalPrice
      };
    });
    const created = await tx.purchaseInvoice.create({
      data: {
        invoiceNumber,
        supplierId: body.supplierId,
        warehouseId: body.warehouseId,
        totalAmount,
        paidAmount: body.paidAmount ? parseFloat(body.paidAmount) : 0,
        invoiceDate: body.invoiceDate ? new Date(body.invoiceDate) : /* @__PURE__ */ new Date(),
        items: { create: itemsData }
      },
      include: {
        supplier: true,
        warehouse: true,
        items: { include: { product: true } }
      }
    });
    if (body.approveStock !== false) {
      for (const item of itemsData) {
        const stock = await tx.stock.findUnique({
          where: {
            warehouseId_productId: {
              warehouseId: body.warehouseId,
              productId: item.productId
            }
          }
        });
        const newQty = stock ? stock.quantity.toNumber() + item.quantity : item.quantity;
        if (stock) {
          await tx.stock.update({
            where: { id: stock.id },
            data: { quantity: newQty }
          });
        } else {
          await tx.stock.create({
            data: {
              warehouseId: body.warehouseId,
              productId: item.productId,
              quantity: newQty
            }
          });
        }
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            warehouseId: body.warehouseId,
            type: "PURCHASE",
            quantity: item.quantity,
            notes: `Purchase invoice ${invoiceNumber}`,
            referenceId: created.id,
            createdById: auth.userId
          }
        });
      }
      await tx.ledgerEntry.create({
        data: {
          supplierId: body.supplierId,
          amount: totalAmount,
          type: "DEBIT",
          description: `Purchase invoice ${invoiceNumber}`
        }
      });
    }
    return created;
  });
  return { invoice };
});

export { index_post as default };
//# sourceMappingURL=index.post6.mjs.map
