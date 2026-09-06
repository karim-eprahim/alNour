export default defineEventHandler(async (event) => {
  const userId = event.context.auth?.userId
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const query = getQuery(event)
  const limit = Number(query.limit) || 20
  const page = Number(query.page) || 1
  const unreadOnly = query.unreadOnly === 'true'

  const whereClause = {
    userId,
    ...(unreadOnly ? { readAt: null } : {})
  }

  const [items, total, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit
    }),
    prisma.notification.count({ where: whereClause }),
    prisma.notification.count({ where: { userId, readAt: null } })
  ])

  return {
    items,
    total,
    unreadCount,
    page,
    totalPages: Math.ceil(total / limit)
  }
})
