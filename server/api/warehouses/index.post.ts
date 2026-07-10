export default defineEventHandler(async (event) => {
  await requirePermission(event, 'WAREHOUSES', 'CREATE')
  const body = await readBody(event)

  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: 'Warehouse name is required' })
  }

  const warehouse = await prisma.warehouse.create({
    data: {
      name: body.name,
      location: body.location,
    },
  })

  return { warehouse }
})
