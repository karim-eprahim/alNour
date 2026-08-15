import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

var _a;
const globalForPrisma = globalThis;
function createPrismaClient() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}
const prisma = (_a = globalForPrisma.prisma) != null ? _a : createPrismaClient();

export { prisma as p };
//# sourceMappingURL=prisma.mjs.map
