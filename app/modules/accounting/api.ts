import type { FinancialOverviewPoint } from './type'
import type { DashboardPeriod } from '@/lib/period'

export async function fetchFinancialOverviewApi(params?: {
  period?: DashboardPeriod
  from?: string
  to?: string
}): Promise<{ data: FinancialOverviewPoint[] }> {
  return $fetch('/api/accounting/dashboard/overview', { params })
}