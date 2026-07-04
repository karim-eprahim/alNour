export default defineEventHandler(async () => {
  const modules = await prisma.module.findMany({
    orderBy: { name: 'asc' },
  })

  const actions = await prisma.permissionAction.findMany({
    orderBy: { name: 'asc' },
  })

  return { modules, actions }
})
