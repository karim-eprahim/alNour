-- Create new tables first
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "permission_actions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "permission_actions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "modules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "role_permissions" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- Create indexes
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");
CREATE UNIQUE INDEX "permission_actions_name_key" ON "permission_actions"("name");
CREATE UNIQUE INDEX "modules_name_key" ON "modules"("name");
CREATE UNIQUE INDEX "role_permissions_roleId_permissionId_key" ON "role_permissions"("roleId", "permissionId");

-- Remove NOT NULL from old permissions columns to allow dropping
ALTER TABLE "permissions" ALTER COLUMN "role" DROP NOT NULL;
ALTER TABLE "permissions" ALTER COLUMN "module" DROP NOT NULL;
ALTER TABLE "permissions" ALTER COLUMN "action" DROP NOT NULL;

-- Drop unique constraint first
DROP INDEX IF EXISTS "permissions_role_module_action_key";

-- Add new columns to existing permissions table
ALTER TABLE "permissions"
  ADD COLUMN IF NOT EXISTS "moduleId" TEXT,
  ADD COLUMN IF NOT EXISTS "actionId" TEXT,
  ADD COLUMN IF NOT EXISTS "label" TEXT,
  ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3);

-- Clear old data
DELETE FROM "permissions";

-- Drop old columns (they're now nullable, so this works)
ALTER TABLE "permissions" DROP COLUMN IF EXISTS "role";
ALTER TABLE "permissions" DROP COLUMN IF EXISTS "module";
ALTER TABLE "permissions" DROP COLUMN IF EXISTS "action";

-- Seed default roles (matching old UserRole enum values)
INSERT INTO "roles" ("id", "name", "label", "createdAt", "updatedAt") VALUES
  ('role-admin', 'ADMIN', 'Administrator', NOW(), NOW()),
  ('role-manager', 'MANAGER', 'Manager', NOW(), NOW()),
  ('role-storekeeper', 'STOREKEEPER', 'Storekeeper', NOW(), NOW()),
  ('role-accountant', 'ACCOUNTANT', 'Accountant', NOW(), NOW()),
  ('role-distributor', 'DISTRIBUTOR', 'Distributor', NOW(), NOW());

-- Seed permission_actions from the old PermissionAction enum
INSERT INTO "permission_actions" ("id", "name", "label", "createdAt", "updatedAt") VALUES
  ('act-create', 'CREATE', 'Create', NOW(), NOW()),
  ('act-read', 'READ', 'Read', NOW(), NOW()),
  ('act-update', 'UPDATE', 'Update', NOW(), NOW()),
  ('act-delete', 'DELETE', 'Delete', NOW(), NOW());

-- Seed modules from the old ModuleName enum plus new modules
INSERT INTO "modules" ("id", "name", "label", "createdAt", "updatedAt") VALUES
  ('mod-users', 'USERS', 'Users', NOW(), NOW()),
  ('mod-products', 'PRODUCTS', 'Products', NOW(), NOW()),
  ('mod-warehouses', 'WAREHOUSES', 'Warehouses', NOW(), NOW()),
  ('mod-inventory', 'INVENTORY', 'Inventory', NOW(), NOW()),
  ('mod-purchases', 'PURCHASES', 'Purchases', NOW(), NOW()),
  ('mod-suppliers', 'SUPPLIERS', 'Suppliers', NOW(), NOW()),
  ('mod-sales', 'SALES', 'Sales', NOW(), NOW()),
  ('mod-customers', 'CUSTOMERS', 'Customers', NOW(), NOW()),
  ('mod-production', 'PRODUCTION', 'Production', NOW(), NOW()),
  ('mod-workers', 'WORKERS', 'Workers', NOW(), NOW()),
  ('mod-attendance', 'ATTENDANCE', 'Attendance', NOW(), NOW()),
  ('mod-expenses', 'EXPENSES', 'Expenses', NOW(), NOW()),
  ('mod-accounting', 'ACCOUNTING', 'Accounting', NOW(), NOW()),
  ('mod-reports', 'REPORTS', 'Reports', NOW(), NOW()),
  ('mod-gps', 'GPS', 'GPS', NOW(), NOW()),
  ('mod-settings', 'SETTINGS', 'Settings', NOW(), NOW());

-- Generate all permission combinations (module × action)
INSERT INTO "permissions" ("id", "moduleId", "actionId", "label", "createdAt", "updatedAt")
SELECT
  'perm-' || m."name" || '-' || a."name",
  m."id",
  a."id",
  a."label" || ' ' || m."label",
  NOW(),
  NOW()
FROM "modules" m
CROSS JOIN "permission_actions" a;

-- Make new columns required
ALTER TABLE "permissions" ALTER COLUMN "moduleId" SET NOT NULL;
ALTER TABLE "permissions" ALTER COLUMN "actionId" SET NOT NULL;
ALTER TABLE "permissions" ALTER COLUMN "label" SET NOT NULL;
ALTER TABLE "permissions" ALTER COLUMN "updatedAt" SET NOT NULL;

-- Add new foreign keys
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "permission_actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add unique constraint
CREATE UNIQUE INDEX "permissions_moduleId_actionId_key" ON "permissions"("moduleId", "actionId");

-- Migrate users: add roleId column as nullable first, populate it, then make it required
ALTER TABLE "users" ADD COLUMN "roleId" TEXT;

UPDATE "users" SET "roleId" = CASE "role"
  WHEN 'ADMIN' THEN 'role-admin'
  WHEN 'MANAGER' THEN 'role-manager'
  WHEN 'STOREKEEPER' THEN 'role-storekeeper'
  WHEN 'ACCOUNTANT' THEN 'role-accountant'
  WHEN 'DISTRIBUTOR' THEN 'role-distributor'
  ELSE 'role-admin'
END;

ALTER TABLE "users" ALTER COLUMN "roleId" SET NOT NULL;

-- Add foreign key for roleId
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Drop old role column from users
ALTER TABLE "users" DROP COLUMN IF EXISTS "role";

-- Drop old enums
DROP TYPE IF EXISTS "UserRole";
DROP TYPE IF EXISTS "PermissionAction";
DROP TYPE IF EXISTS "ModuleName";
