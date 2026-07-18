import type { H3Event } from 'h3'

export interface LookupItem {
  value: string
  label: string
  subtitle?: string
  disabled?: boolean
}

export interface LookupQueryParams {
  q?: string
  cursor?: string
  take: number
  includeInactive: boolean
  warehouseId?: string
  categoryId?: string
}

export function parseLookupQuery(event: H3Event): LookupQueryParams {
  const query = getQuery(event)
  return {
    q: query.q as string | undefined,
    cursor: query.cursor as string | undefined,
    take: Math.min(parseInt(query.take as string) || 20, 100),
    includeInactive: query.includeInactive === 'true',
    warehouseId: query.warehouseId as string | undefined,
    categoryId: query.categoryId as string | undefined,
  }
}

export function buildSearchWhere(search: string | undefined, fields: string[]) {
  if (!search || search.length < 2) return {}
  return {
    OR: fields.map(field => ({
      [field]: { contains: search, mode: 'insensitive' as const },
    })),
  }
}

export async function paginatedLookup(
  model: any,
  args: {
    where: any
    take: number
    cursor?: string
    orderBy?: any
    select?: Record<string, boolean>
  },
) {
  const findArgs: any = {
    where: args.where,
    take: args.take + 1,
    orderBy: args.orderBy || { id: 'asc' },
  }
  if (args.select) findArgs.select = args.select
  if (args.cursor) {
    findArgs.cursor = { id: args.cursor }
    findArgs.skip = 1
  }
  const items = await model.findMany(findArgs)
  const hasMore = items.length > args.take
  if (hasMore) items.pop()
  return {
    items,
    nextCursor: hasMore ? items[items.length - 1].id : null,
  }
}

export function toLookupItem(item: any, labelField: string, valueField = 'id', subtitleField?: string): LookupItem {
  return {
    value: String(item[valueField]),
    label: item[labelField],
    subtitle: subtitleField ? item[subtitleField] : undefined,
    disabled: false,
  }
}
