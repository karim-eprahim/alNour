import { d as defineEventHandler, r as readBody } from '../../../nitro/nitro.mjs';
import { u as unregisterDeviceToken } from '../../../_/fcm.service.mjs';
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

const unregisterToken_post = defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  if (token) await unregisterDeviceToken(token);
  return { success: true };
});

export { unregisterToken_post as default };
//# sourceMappingURL=unregister-token.post.mjs.map
