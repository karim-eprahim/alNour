export default defineEventHandler(async () => {
  const roles = await prisma.role.findMany({
    select: { id: true, name: true, label: true },
    orderBy: { name: 'asc' },
  })
  return {
    items: roles.map(r => ({
      value: r.id,
      label: r.label || r.name,
    })),
    nextCursor: null,
  }
})
