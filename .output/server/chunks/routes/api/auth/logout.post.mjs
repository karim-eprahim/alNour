import { d as defineEventHandler, b as deleteCookie } from '../../../nitro/nitro.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  deleteCookie(event, "auth_token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/"
  });
  return { success: true };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
