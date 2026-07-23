export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'SALES', 'READ')

  const query = getQuery(event)
  const distributorId = (query.distributorId as string) || auth.userId

  if (distributorId !== auth.userId) {
    await requirePermission(event, 'USERS', 'READ')
  }

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 20
  const skip = (page - 1) * limit

  const where: any = { distributorId }
  if (query.type) where.type = query.type

  const [movements, total] = await Promise.all([
    prisma.distributorCashMovement.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.distributorCashMovement.count({ where }),
  ])

  return { movements, total, page, limit }
})
