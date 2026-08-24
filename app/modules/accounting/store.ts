import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FinancialOverviewPoint } from './type'
import type { DashboardPeriod } from '@/lib/period'
import { fetchFinancialOverviewApi } from './api'

export const useAccountingStore = defineStore('accounting', () => {
  const financialOverview = ref<FinancialOverviewPoint[]>([])
  const financialOverviewLoading = ref(false)

  async function fetchFinancialOverview(params?: {
    period?: DashboardPeriod
    from?: string
    to?: string
  }) {
    financialOverviewLoading.value = true
    try {
      const data = await fetchFinancialOverviewApi(params)
      financialOverview.value = data.data
      return data.data
    } finally {
      financialOverviewLoading.value = false
    }
  }

  return {
    financialOverview,
    financialOverviewLoading,
    fetchFinancialOverview,
  }
})