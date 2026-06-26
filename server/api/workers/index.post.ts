export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: 'Worker name is required' })
  }

  const worker = await prisma.worker.create({
    data: {
      name: body.name,
      phone: body.phone || null,
      role: body.role || null,
      defaultDailyWage: body.defaultDailyWage ? parseFloat(body.defaultDailyWage) : null,
      isActive: body.isActive !== undefined ? body.isActive : true,
    },
  })

  return { worker }
})
