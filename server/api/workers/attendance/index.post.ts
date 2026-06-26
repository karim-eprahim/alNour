export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.date || !body.records?.length) {
    throw createError({ statusCode: 400, statusMessage: 'date and records array are required' })
  }

  const date = new Date(body.date)
  date.setHours(0, 0, 0, 0)

  const results = await prisma.$transaction(async (tx) => {
    const created = []
    for (const record of body.records) {
      const existing = await tx.attendance.findUnique({
        where: {
          workerId_date: {
            workerId: record.workerId,
            date,
          },
        },
      })
      if (existing) {
        const updated = await tx.attendance.update({
          where: { id: existing.id },
          data: {
            status: record.status || 'PRESENT',
            notes: record.notes || null,
          },
          include: { worker: { select: { id: true, name: true } } },
        })
        created.push(updated)
      } else {
        const att = await tx.attendance.create({
          data: {
            workerId: record.workerId,
            date,
            status: record.status || 'PRESENT',
            notes: record.notes || null,
          },
          include: { worker: { select: { id: true, name: true } } },
        })
        created.push(att)
      }
    }
    return created
  })

  return { attendance: results }
})
