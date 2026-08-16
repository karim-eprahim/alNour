export type DashboardPeriod = '7d' | '30d' | '6m' | '1y'

export const DASHBOARD_PERIOD_OPTIONS: { value: DashboardPeriod; label: string }[] = [
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '6m', label: '6M' },
  { value: '1y', label: '1Y' },
]