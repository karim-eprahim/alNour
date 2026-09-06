import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
import { p as prisma } from '../../_/prisma.mjs';
import { i as isValidLatitude, a as isValidLongitude } from '../../_/tracking.mjs';
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

const index_post = defineEventHandler(async (event) => {
  await requirePermission(event, "CUSTOMERS", "CREATE");
  const body = await readBody(event);
  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: "name is required" });
  }
  const data = { name: body.name, phone: body.phone || null, address: body.address || null };
  if (body.latitude !== void 0 && body.latitude !== null && body.latitude !== "") {
    const latitude = Number(body.latitude);
    if (!isValidLatitude(latitude)) {
      throw createError({ statusCode: 400, statusMessage: "Invalid latitude: must be between -90 and 90" });
    }
    data.latitude = latitude;
  }
  if (body.longitude !== void 0 && body.longitude !== null && body.longitude !== "") {
    const longitude = Number(body.longitude);
    if (!isValidLongitude(longitude)) {
      throw createError({ statusCode: 400, statusMessage: "Invalid longitude: must be between -180 and 180" });
    }
    data.longitude = longitude;
  }
  const customer = await prisma.customer.create({ data });
  if (body.linkedSupplierId) {
    const supplier = await prisma.supplier.findUnique({ where: { id: body.linkedSupplierId } });
    if (!supplier) throw createError({ statusCode: 404, statusMessage: "Linked supplier not found" });
    await prisma.supplier.update({
      where: { id: body.linkedSupplierId },
      data: { linkedCustomerId: customer.id }
    }).catch(() => {
      throw createError({ statusCode: 400, statusMessage: "Supplier already linked to another customer" });
    });
  }
  return { customer };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
