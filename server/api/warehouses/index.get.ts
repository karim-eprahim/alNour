export default defineEventHandler(async (event) => {
  await requirePermission(event, 'WAREHOUSES', 'READ')
  const query = getQuery(event)

  const where: any = {}
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { location: { contains: query.search, mode: 'insensitive' } },
    ]
  }

  const [warehouses, total] = await Promise.all([
    prisma.warehouse.findMany({
      where,
      include: {
        _count: { select: { stocks: true, movements: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.warehouse.count({ where }),
  ])

  return { warehouses, total }
})
