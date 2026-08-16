import type { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'SALES', 'READ')
  const query = getQuery(event)
  const { start, end } = parseDashboardPeriod(query)

  const invoiceWhere: Prisma.InvoiceWhereInput = {
    status: { not: 'CANCELLED' },
    createdAt: { gte: start, lte: end },
  }

  const warehouseIds = await getAccessibleWarehouseIds(event)
  if (warehouseIds !== null) {
    invoiceWhere.warehouseId = { in: warehouseIds }
  }

  const invoices = await prisma.invoice.findMany({
    where: invoiceWhere,
    select: { createdAt: true, totalAmount: true },
  })

  const byDay = new Map<string, number>()
  for (const inv of invoices) {
    const key = dayKey(inv.createdAt)
    byDay.set(key, (byDay.get(key) || 0) + inv.totalAmount.toNumber())
  }

  const data: { date: string; sales: number }[] = []
  const cursor = new Date(start)
  while (cursor <= end) {
    const key = dayKey(cursor)
    data.push({ date: key, sales: byDay.get(key) || 0 })
    cursor.setDate(cursor.getDate() + 1)
  }

  return { data }
})
