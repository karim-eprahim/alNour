import { d as defineEventHandler, f as getQuery } from '../../nitro/nitro.mjs';
import { r as requirePermission } from '../../_/permissions.mjs';
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

const index_get = defineEventHandler(async (event) => {
  await requirePermission(event, "USERS", "READ");
  const query = getQuery(event);
  const where = {};
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { email: { contains: query.search, mode: "insensitive" } }
    ];
  }
  if (query.role) {
    where.roleId = query.role;
  }
  if (query.status) where.status = query.status;
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        roleId: true,
        role: { select: { id: true, name: true, label: true } },
        status: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        userWarehouses: {
          include: { warehouse: { select: { id: true, name: true } } }
        }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.user.count({ where })
  ]);
  return { users, total };
});

export { index_get as default };
//# sourceMappingURL=index.get12.mjs.map
