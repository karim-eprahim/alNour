import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
import { p as prisma } from '../../_/prisma.mjs';
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
  await requirePermission(event, "SUPPLIERS", "CREATE");
  const body = await readBody(event);
  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: "Supplier name is required" });
  }
  if (body.linkedCustomerId) {
    const customer = await prisma.customer.findUnique({ where: { id: body.linkedCustomerId } });
    if (!customer) throw createError({ statusCode: 404, statusMessage: "Linked customer not found" });
  }
  const supplier = await prisma.supplier.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email,
      address: body.address,
      company: body.company,
      linkedCustomerId: body.linkedCustomerId || null
    }
  });
  return { supplier };
});

export { index_post as default };
//# sourceMappingURL=index.post10.mjs.map
