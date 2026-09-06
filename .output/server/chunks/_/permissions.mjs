import { c as createError } from '../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function getUserPermissions(userId, roleId) {
  const perms = await prisma.permission.findMany({
    where: {
      OR: [
        { roles: { some: { roleId } } },
        { users: { some: { userId } } }
      ]
    },
    select: {
      module: { select: { name: true } },
      action: { select: { name: true } }
    }
  });
  return Array.from(new Set(perms.map((p) => `${p.module.name}.${p.action.name}`)));
}
async function requirePermission(event, module, action) {
  const auth = event.context.auth;
  if (!auth) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }
  const hasPermission2 = await prisma.permission.findFirst({
    where: {
      module: { name: module },
      action: { name: action },
      OR: [
        { roles: { some: { role: { users: { some: { id: auth.userId } } } } } },
        { users: { some: { userId: auth.userId } } }
      ]
    }
  });
  if (!hasPermission2) {
    throw createError({ statusCode: 403, statusMessage: `Forbidden: missing ${module}.${action}` });
  }
}

export { getUserPermissions as g, requirePermission as r };
//# sourceMappingURL=permissions.mjs.map
