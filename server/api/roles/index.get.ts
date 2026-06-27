export default defineEventHandler(async () => {
  const roles = await prisma.role.findMany({
    include: { _count: { select: { users: true } } },
    orderBy: { name: 'asc' },
  })
  return { roles }
})
