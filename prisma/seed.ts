import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// ─── RBAC Helpers ─────────────────────────────────────────────

async function assignPermissionsToRole(roleName: string, permissionKeys: string[]) {
  const role = await prisma.role.findUnique({ where: { name: roleName } })
  if (!role) throw new Error(`Role "${roleName}" not found`)

  const moduleNames = [...new Set(permissionKeys.map(k => k.split('.')[0]))]
  const actionNames = [...new Set(permissionKeys.map(k => k.split('.')[1]))]

  const permissions = await prisma.permission.findMany({
    where: {
      module: { name: { in: moduleNames } },
      action: { name: { in: actionNames } },
    },
    include: { module: true, action: true },
  })

  const map = new Map(permissions.map(p => [`${p.module.name}.${p.action.name}`, p.id]))
  const permissionIds = permissionKeys.map(key => map.get(key)).filter((id): id is string => id !== undefined)

  if (permissionIds.length === 0) return

  await prisma.rolePermission.createMany({
    data: permissionIds.map(permissionId => ({ roleId: role.id, permissionId })),
    skipDuplicates: true,
  })

  console.log(`  Granted ${permissionIds.length} permissions to "${roleName}"`)
}

async function seedRbac() {
  // ── ADMIN: All permissions ──────────────────────────────
  const allPermissions = await prisma.permission.findMany()
  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } })
  if (adminRole) {
    await prisma.rolePermission.createMany({
      data: allPermissions.map(p => ({ roleId: adminRole.id, permissionId: p.id })),
      skipDuplicates: true,
    })
    console.log(`  Granted ${allPermissions.length} permissions to "ADMIN"`)
  }

  // ── MANAGER ─────────────────────────────────────────────
  await assignPermissionsToRole('MANAGER', [
    'USERS.READ',
    'PRODUCTS.READ', 'PRODUCTS.CREATE', 'PRODUCTS.UPDATE',
    'WAREHOUSES.READ', 'WAREHOUSES.CREATE', 'WAREHOUSES.UPDATE',
    'INVENTORY.READ', 'INVENTORY.CREATE', 'INVENTORY.UPDATE',
    'PURCHASES.READ', 'PURCHASES.CREATE', 'PURCHASES.UPDATE',
    'SUPPLIERS.READ', 'SUPPLIERS.CREATE', 'SUPPLIERS.UPDATE',
    'PRODUCTION.READ', 'PRODUCTION.CREATE', 'PRODUCTION.UPDATE',
    'WORKERS.READ', 'WORKERS.CREATE', 'WORKERS.UPDATE',
    'ATTENDANCE.READ', 'ATTENDANCE.CREATE', 'ATTENDANCE.UPDATE',
    'CUSTOMERS.READ', 'CUSTOMERS.CREATE', 'CUSTOMERS.UPDATE',
    'SALES.READ', 'SALES.CREATE', 'SALES.UPDATE',
    'EXPENSES.READ', 'EXPENSES.UPDATE',
    'ACCOUNTING.READ',
    'REPORTS.READ',
  ])

  // ── STOREKEEPER ─────────────────────────────────────────
  await assignPermissionsToRole('STOREKEEPER', [
    'PRODUCTS.READ',
    'WAREHOUSES.READ',
    'INVENTORY.READ', 'INVENTORY.CREATE', 'INVENTORY.UPDATE',
    'PRODUCTION.READ', 'PRODUCTION.UPDATE',
  ])

  // ── ACCOUNTANT ──────────────────────────────────────────
  await assignPermissionsToRole('ACCOUNTANT', [
    'SALES.READ', 'SALES.UPDATE',
    'CUSTOMERS.READ',
    'SUPPLIERS.READ',
    'PURCHASES.READ', 'PURCHASES.UPDATE',
    'EXPENSES.READ', 'EXPENSES.CREATE', 'EXPENSES.UPDATE',
    'ACCOUNTING.READ', 'ACCOUNTING.CREATE', 'ACCOUNTING.UPDATE',
    'REPORTS.READ',
  ])

  // ── DISTRIBUTOR ─────────────────────────────────────────
  await assignPermissionsToRole('DISTRIBUTOR', [
    'CUSTOMERS.READ', 'CUSTOMERS.CREATE', 'CUSTOMERS.UPDATE',
    'SALES.READ', 'SALES.CREATE', 'SALES.UPDATE',
    'PRODUCTS.READ',
    'GPS.READ', 'GPS.UPDATE',
    'REPORTS.READ',
  ])
}

async function main() {
  const adminEmail = 'admin@alnour.com'
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })

  if (!existing) {
    const password = await bcrypt.hash('admin123', 12)
    const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } })

    const admin = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: adminEmail,
        password,
        phone: '+201234567890',
        roleId: adminRole!.id,
        status: 'ACTIVE',
      },
    })

    console.log(`Admin user created: ${admin.email} / admin123`)
  } else {
    console.log('Admin user already exists, skipping user creation.')
  }

  console.log('Seeding role permissions...')
  await seedRbac()
  console.log('Role permissions seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
