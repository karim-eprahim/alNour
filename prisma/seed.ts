import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@alnour.com'
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })

  if (existing) {
    console.log('Admin user already exists, skipping seed.')
    return
  }

  const password = await bcrypt.hash('admin123', 12)

  const admin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: adminEmail,
      password,
      phone: '+201234567890',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  })

  console.log(`Admin user created: ${admin.email} / admin123`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
