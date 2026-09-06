import { d as defineEventHandler, c as createError, g as getQuery } from '../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  var _a, _b;
  const userId = (_a = event.context.auth) == null ? void 0 : _a.userId;
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }
  const query = getQuery(event);
  const limit = Math.min(Number(query.limit) || 20, 100);
  const page = Number(query.page) || 1;
  const unreadOnly = query.unreadOnly === "true";
  const status = query.status;
  const search = (_b = query.search) == null ? void 0 : _b.trim();
  const readFilter = status === "unread" || unreadOnly ? { readAt: null } : status === "read" ? { readAt: { not: null } } : {};
  const whereClause = {
    userId,
    ...readFilter,
    ...search ? {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } }
      ]
    } : {}
  };
  const [items, total, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit
    }),
    prisma.notification.count({ where: whereClause }),
    prisma.notification.count({ where: { userId, readAt: null } })
  ]);
  return {
    items,
    total,
    unreadCount,
    page,
    totalPages: Math.ceil(total / limit)
  };
});

export { index_get as default };
//# sourceMappingURL=index.get5.mjs.map
