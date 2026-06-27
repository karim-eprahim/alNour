export default defineEventHandler(async () => {
  const permissions = await prisma.permission.findMany({
    include: {
      module: { select: { id: true, name: true, label: true } },
      action: { select: { id: true, name: true, label: true } },
    },
    orderBy: [{ module: { name: 'asc' } }, { action: { name: 'asc' } }],
  })
  return { permissions }
})
