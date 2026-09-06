import { d as defineEventHandler, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { r as registerDeviceToken } from '../../../_/fcm.service.mjs';
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
import '../../../_/prisma.mjs';
import '@prisma/client';
import '@prisma/adapter-pg';
import 'pg';
import 'firebase-admin/app';
import 'firebase-admin/messaging';

const registerToken_post = defineEventHandler(async (event) => {
  var _a;
  const userId = (_a = event.context.auth) == null ? void 0 : _a.userId;
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const { token, deviceType } = await readBody(event);
  if (!token) {
    throw createError({ statusCode: 400, statusMessage: "Token is required" });
  }
  await registerDeviceToken(userId, token, deviceType || "web");
  return { success: true };
});

export { registerToken_post as default };
//# sourceMappingURL=register-token.post.mjs.map
