export default defineEventHandler(async (event) => {
  await requirePermission(event, 'WAREHOUSES', 'UPDATE')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const existing = await prisma.warehouse.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Warehouse not found' })
  }

  await validateWarehouseAccess(event, id!)

  const data: any = {}
  if (body.name) data.name = body.name
  if (body.location !== undefined) data.location = body.location

  const warehouse = await prisma.warehouse.update({
    where: { id },
    data,
  })

  return { warehouse }
})
