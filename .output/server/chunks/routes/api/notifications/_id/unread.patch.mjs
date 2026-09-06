import { d as defineEventHandler, f as getRouterParam, c as createError } from '../../../../nitro/nitro.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
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

const unread_patch = defineEventHandler(async (event) => {
  var _a;
  const userId = (_a = event.context.auth) == null ? void 0 : _a.userId;
  const notificationId = getRouterParam(event, "id");
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId }
  });
  if (!notification || notification.userId !== userId) {
    throw createError({ statusCode: 404, statusMessage: "Notification not found" });
  }
  const updated = await prisma.notification.update({
    where: { id: notificationId },
    data: { readAt: null }
  });
  return { success: true, notification: updated };
});

export { unread_patch as default };
//# sourceMappingURL=unread.patch.mjs.map
