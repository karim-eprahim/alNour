import { d as defineEventHandler, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { r as requirePermission } from '../../../_/permissions.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { v as validateWarehouseAccess } from '../../../_/warehouse-access.mjs';
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
  await requirePermission(event, "PURCHASES", "CREATE");
  const body = await readBody(event);
  if (!body.purchaseInvoiceId || !body.grossWeight || !body.tareWeight || !body.ticketNumber) {
    throw createError({ statusCode: 400, statusMessage: "purchaseInvoiceId, ticketNumber, grossWeight, and tareWeight are required" });
  }
  const invoice = await prisma.purchaseInvoice.findUnique({ where: { id: body.purchaseInvoiceId } });
  if (!invoice) {
    throw createError({ statusCode: 404, statusMessage: "Purchase invoice not found" });
  }
  await validateWarehouseAccess(event, invoice.warehouseId);
  const netWeight = parseFloat(body.grossWeight) - parseFloat(body.tareWeight);
  const ticket = await prisma.weightTicket.create({
    data: {
      ticketNumber: body.ticketNumber,
      purchaseInvoiceId: body.purchaseInvoiceId,
      grossWeight: parseFloat(body.grossWeight),
      tareWeight: parseFloat(body.tareWeight),
      netWeight,
      carNumber: body.carNumber
    }
  });
  return { ticket };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
