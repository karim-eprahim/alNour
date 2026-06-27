export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const where: any = {}

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { email: { contains: query.search, mode: 'insensitive' } },
    ]
  }
  if (query.role) {
    where.role = { name: query.role }
  }
  if (query.status) where.status = query.status

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        roleId: true,
        role: { select: { id: true, name: true, label: true } },
        status: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where }),
  ])

  return { users, total }
})
