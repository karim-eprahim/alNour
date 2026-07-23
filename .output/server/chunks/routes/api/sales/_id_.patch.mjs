import { d as defineEventHandler, g as getRouterParam, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
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

const STATUS_TRANSITIONS = {
  PENDING: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["ACCEPTED", "CANCELLED"],
  ACCEPTED: ["OUT_FOR_DELIVERY", "CANCELLED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "CANCELLED"],
  DELIVERED: ["COMPLETED", "CANCELLED"],
  COMPLETED: ["CANCELLED"],
  CANCELLED: []
};
function isValidTransition(from, to) {
  const allowed = STATUS_TRANSITIONS[from];
  return allowed ? allowed.includes(to) : false;
}
const _id__patch = defineEventHandler(async (event) => {
  var _a;
  await requirePermission(event, "SALES", "UPDATE");
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const existing = await prisma.salesOrder.findUnique({ where: { id } });
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Sales order not found" });
  }
  await validateWarehouseAccess(event, existing.warehouseId);
  const data = {};
  if (body.status) {
    if (!isValidTransition(existing.status, body.status)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid status transition from ${existing.status} to ${body.status}`
      });
    }
    data.status = body.status;
  }
  if (body.assignedDistributorId !== void 0) {
    if (body.assignedDistributorId) {
      const distributor = await prisma.user.findUnique({
        where: { id: body.assignedDistributorId },
        select: { id: true, role: { select: { name: true } } }
      });
      if (!distributor || ((_a = distributor.role) == null ? void 0 : _a.name) !== "DISTRIBUTOR") {
        throw createError({ statusCode: 400, statusMessage: "Invalid distributor" });
      }
    }
    data.assignedDistributorId = body.assignedDistributorId || null;
  }
  if (body.saleSource) data.saleSource = body.saleSource;
  const order = await prisma.salesOrder.update({
    where: { id },
    data,
    include: {
      customer: { select: { id: true, name: true } },
      warehouse: { select: { id: true, name: true } },
      assignedDistributor: { select: { id: true, name: true } },
      items: { include: { product: { select: { id: true, name: true, sku: true } } } }
    }
  });
  return { order };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
