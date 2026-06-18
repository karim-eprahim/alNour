export default defineEventHandler(async (event) => {
  const permissions = await prisma.permission.findMany({
    orderBy: [{ role: 'asc' }, { module: 'asc' }, { action: 'asc' }],
  })

  return { permissions }
})
