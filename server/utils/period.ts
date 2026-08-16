export type DashboardPeriod = '7d' | '30d' | '6m' | '1y'

const PERIOD_DAYS: Record<DashboardPeriod, number> = {
  '7d': 7,
  '30d': 30,
  '6m': 180,
  '1y': 365,
}

export const DASHBOARD_PERIODS = Object.keys(PERIOD_DAYS)

export interface PeriodRange {
  start: Date
  end: Date
}

export function parseDashboardPeriod(query: Record<string, any>): PeriodRange {
  const end = new Date()
  const start = new Date()

  if (query.from || query.to) {
    if (query.from) start.setTime(new Date(query.from as string).getTime())
    if (query.to) end.setTime(new Date(query.to as string).getTime())
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid date range' })
    }
    if (start > end) {
      throw createError({ statusCode: 400, statusMessage: 'from must be before to' })
    }
    return { start, end }
  }

  const period = (query.period as string) || '30d'
  if (!(period in PERIOD_DAYS)) {
    throw createError({ statusCode: 400, statusMessage: `Invalid period. Allowed: ${DASHBOARD_PERIODS.join(', ')}` })
  }
  start.setDate(start.getDate() - PERIOD_DAYS[period as DashboardPeriod])
  return { start, end }
}

export function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}
