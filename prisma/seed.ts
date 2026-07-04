import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// ─── RBAC Seed Functions ─────────────────────────────────────

async function seedRoles() {
  const roles = [
    { name: 'ADMIN', label: 'Administrator' },
    { name: 'MANAGER', label: 'Manager' },
    { name: 'STOREKEEPER', label: 'Storekeeper' },
    { name: 'ACCOUNTANT', label: 'Accountant' },
    { name: 'DISTRIBUTOR', label: 'Distributor' },
  ]

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name: r.name },
      create: r,
      update: { label: r.label },
    })
  }

  console.log(`  Seeded ${roles.length} roles`)
}

async function seedPermissionActions() {
  const actions = [
    { name: 'CREATE', label: 'Create' },
    { name: 'READ', label: 'Read' },
    { name: 'UPDATE', label: 'Update' },
    { name: 'DELETE', label: 'Delete' },
  ]

  for (const a of actions) {
    await prisma.permissionAction.upsert({
      where: { name: a.name },
      create: a,
      update: { label: a.label },
    })
  }

  console.log(`  Seeded ${actions.length} permission actions`)
}

async function seedModules() {
  const modules = [
    { name: 'USERS', label: 'Users' },
    { name: 'PRODUCTS', label: 'Products' },
    { name: 'WAREHOUSES', label: 'Warehouses' },
    { name: 'INVENTORY', label: 'Inventory' },
    { name: 'PURCHASES', label: 'Purchases' },
    { name: 'SUPPLIERS', label: 'Suppliers' },
    { name: 'SALES', label: 'Sales' },
    { name: 'CUSTOMERS', label: 'Customers' },
    { name: 'PRODUCTION', label: 'Production' },
    { name: 'WORKERS', label: 'Workers' },
    { name: 'ATTENDANCE', label: 'Attendance' },
    { name: 'EXPENSES', label: 'Expenses' },
    { name: 'ACCOUNTING', label: 'Accounting' },
    { name: 'REPORTS', label: 'Reports' },
    { name: 'GPS', label: 'GPS' },
    { name: 'SETTINGS', label: 'Settings' },
  ]

  for (const m of modules) {
    await prisma.module.upsert({
      where: { name: m.name },
      create: m,
      update: { label: m.label },
    })
  }

  console.log(`  Seeded ${modules.length} modules`)
}

async function seedPermissions() {
  const modules = await prisma.module.findMany({ orderBy: { name: 'asc' } })
  const actions = await prisma.permissionAction.findMany({ orderBy: { name: 'asc' } })

  const data = modules.flatMap(m =>
    actions.map(a => ({
      moduleId: m.id,
      actionId: a.id,
      label: `${a.label} ${m.label}`,
    }))
  )

  if (data.length > 0) {
    await prisma.permission.createMany({ data, skipDuplicates: true })
  }

  console.log(`  Generated ${data.length} permissions (${modules.length} modules × ${actions.length} actions)`)
}

// ─── Role Permission Assignment ──────────────────────────────

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

async function seedRolePermissions() {
  // ADMIN gets every permission in the system
  const allPermissions = await prisma.permission.findMany()
  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } })
  if (adminRole) {
    await prisma.rolePermission.createMany({
      data: allPermissions.map(p => ({ roleId: adminRole.id, permissionId: p.id })),
      skipDuplicates: true,
    })
    console.log(`  Granted ${allPermissions.length} permissions to "ADMIN"`)
  }

  // MANAGER
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

  // STOREKEEPER
  await assignPermissionsToRole('STOREKEEPER', [
    'PRODUCTS.READ',
    'WAREHOUSES.READ',
    'INVENTORY.READ', 'INVENTORY.CREATE', 'INVENTORY.UPDATE',
    'PRODUCTION.READ', 'PRODUCTION.UPDATE',
  ])

  // ACCOUNTANT
  await assignPermissionsToRole('ACCOUNTANT', [
    'SALES.READ', 'SALES.UPDATE',
    'CUSTOMERS.READ',
    'SUPPLIERS.READ',
    'PURCHASES.READ', 'PURCHASES.UPDATE',
    'EXPENSES.READ', 'EXPENSES.CREATE', 'EXPENSES.UPDATE',
    'ACCOUNTING.READ', 'ACCOUNTING.CREATE', 'ACCOUNTING.UPDATE',
    'REPORTS.READ',
  ])

  // DISTRIBUTOR
  await assignPermissionsToRole('DISTRIBUTOR', [
    'CUSTOMERS.READ', 'CUSTOMERS.CREATE', 'CUSTOMERS.UPDATE',
    'SALES.READ', 'SALES.CREATE', 'SALES.UPDATE',
    'PRODUCTS.READ',
    'GPS.READ', 'GPS.UPDATE',
    'REPORTS.READ',
  ])
}

async function seedAdmin() {
  const adminEmail = 'admin@alnour.com'
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })

  if (!existing) {
    const password = await bcrypt.hash('admin123', 12)
    const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } })

    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: adminEmail,
        password,
        phone: '+201234567890',
        roleId: adminRole!.id,
        status: 'ACTIVE',
      },
    })

    console.log(`  Admin user created: ${adminEmail} / admin123`)
  } else {
    console.log('  Admin user already exists, skipping.')
  }
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  console.log('Seeding roles...')
  await seedRoles()

  console.log('Seeding permission actions...')
  await seedPermissionActions()

  console.log('Seeding modules...')
  await seedModules()

  console.log('Seeding permissions...')
  await seedPermissions()

  console.log('Seeding role permissions...')
  await seedRolePermissions()

  console.log('Seeding admin user...')
  await seedAdmin()

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
