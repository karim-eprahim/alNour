import { d as defineEventHandler, r as readBody, c as createError, s as signToken, a as setCookie } from '../../../nitro/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import bcrypt from 'bcryptjs';
import { g as getUserPermissions } from '../../../_/permissions.mjs';
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

const login_post = defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: "Email and password are required" });
  }
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: { select: { id: true, name: true } } }
  });
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Invalid email or password" });
  }
  if (user.status !== "ACTIVE") {
    throw createError({ statusCode: 403, statusMessage: "Account is inactive or blocked" });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: "Invalid email or password" });
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: /* @__PURE__ */ new Date() }
  });
  const payload = { userId: user.id, email: user.email, role: user.role.name };
  const token = signToken(payload);
  setCookie(event, "auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });
  const permissions = await getUserPermissions(user.id, user.roleId);
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role.name,
      roleId: user.roleId
    },
    permissions
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
