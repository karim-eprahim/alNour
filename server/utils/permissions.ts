import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function getUserPermissions(userId: string, roleId: string): Promise<string[]> {
  const perms = await prisma.permission.findMany({
    where: {
      OR: [
        { roles: { some: { roleId } } },
        { users: { some: { userId } } },
      ],
    },
    select: {
      module: { select: { name: true } },
      action: { select: { name: true } },
    },
  })

  return Array.from(new Set(perms.map(p => `${p.module.name}.${p.action.name}`)))
}

export async function requirePermission(event: any, module: string, action: string): Promise<void> {
  const auth = event.context.auth
  if (!auth) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const hasPermission = await prisma.permission.findFirst({
    where: {
      module: { name: module },
      action: { name: action },
      OR: [
        { roles: { some: { role: { users: { some: { id: auth.userId } } } } } },
        { users: { some: { userId: auth.userId } } },
      ],
    },
  })

  if (!hasPermission) {
    throw createError({ statusCode: 403, statusMessage: `Forbidden: missing ${module}.${action}` })
  }
}

export async function hasPermission(event: any, module: string, action: string): Promise<boolean> {
  const auth = event.context.auth
  if (!auth) return false

  const permission = await prisma.permission.findFirst({
    where: {
      module: { name: module },
      action: { name: action },
      OR: [
        { roles: { some: { role: { users: { some: { id: auth.userId } } } } } },
        { users: { some: { userId: auth.userId } } },
      ],
    },
  })

  return !!permission
}
