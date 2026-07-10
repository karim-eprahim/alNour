import type { H3Event } from 'h3'
import prisma from './prisma'

const ADMIN_ROLE = 'ADMIN'

function isAdmin(event: H3Event): boolean {
  return event.context.auth?.role === ADMIN_ROLE
}

export async function getAccessibleWarehouseIds(event: H3Event): Promise<string[] | null> {
  if (isAdmin(event)) return null

  const userId = event.context.auth?.userId
  if (!userId) return []

  const records = await prisma.userWarehouse.findMany({
    where: { userId },
    select: { warehouseId: true },
  })

  return records.map(r => r.warehouseId)
}

export function warehouseFilter(event: H3Event, warehouseField: string = 'warehouseId') {
  return async (): Promise<Record<string, any>> => {
    if (isAdmin(event)) return {}

    const ids = await getAccessibleWarehouseIds(event)
    if (!ids || ids.length === 0) {
      return { [warehouseField]: { in: [] } }
    }
    return { [warehouseField]: { in: ids } }
  }
}

export async function validateWarehouseAccess(event: H3Event, warehouseId: string): Promise<void> {
  if (isAdmin(event)) return

  const userId = event.context.auth?.userId
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const access = await prisma.userWarehouse.findUnique({
    where: { userId_warehouseId: { userId, warehouseId } },
  })

  if (!access) {
    throw createError({ statusCode: 403, statusMessage: 'You do not have access to this warehouse' })
  }
}

export async function accessibleWarehouseIdsOrFail(event: H3Event): Promise<string[] | null> {
  if (isAdmin(event)) return null

  const ids = await getAccessibleWarehouseIds(event)
  if (!ids || ids.length === 0) {
    return null
  }
  return ids
}
