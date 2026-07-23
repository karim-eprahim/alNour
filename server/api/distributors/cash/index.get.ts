export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'SALES', 'READ')

  const query = getQuery(event)
  const distributorId = (query.distributorId as string) || auth.userId

  if (distributorId !== auth.userId) {
    await requirePermission(event, 'USERS', 'READ')
  }

  const distributor = await prisma.user.findUnique({
    where: { id: distributorId },
    select: {
      id: true,
      name: true,
      cashOnHand: true,
    },
  })

  if (!distributor) {
    throw createError({ statusCode: 404, statusMessage: 'Distributor not found' })
  }

  return { distributor }
})
