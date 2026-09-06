import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
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

const index_delete = defineEventHandler(async (event) => {
  var _a;
  const userId = (_a = event.context.auth) == null ? void 0 : _a.userId;
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }
  const result = await prisma.notification.deleteMany({
    where: { userId }
  });
  return { success: true, deletedCount: result.count };
});

export { index_delete as default };
//# sourceMappingURL=index.delete.mjs.map
