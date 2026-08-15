import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
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

const lookup_get = defineEventHandler(async () => {
  const roles = await prisma.role.findMany({
    select: { id: true, name: true, label: true },
    orderBy: { name: "asc" }
  });
  return {
    items: roles.map((r) => ({
      value: r.id,
      label: r.label || r.name
    })),
    nextCursor: null
  };
});

export { lookup_get as default };
//# sourceMappingURL=lookup.get.mjs.map
