import { d as defineEventHandler, b as deleteCookie } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
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
