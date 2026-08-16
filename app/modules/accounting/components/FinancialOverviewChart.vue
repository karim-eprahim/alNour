<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { VisLine, VisAxis, VisXYContainer } from '@unovis/vue'
import {
  ChartContainer,
  ChartTooltip,
  ChartCrosshair,
  ChartTooltipContent,
  ChartLegendContent,
  componentToString,
} from '@/components/ui/chart'
import type { FinancialOverviewPoint } from '@/modules/accounting/type'
import type { DashboardPeriod } from '@/lib/period'

const store = useAccountingStore()
const period = ref<DashboardPeriod>('6m')

onMounted(() => load())
watch(period, () => load())

async function load() {
  try {
    await store.fetchFinancialOverview({ period: period.value })
  } catch {
    // keep existing data on failure
  }
}

const chartData = computed(() => store.financialOverview)

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-1)',
  },
  expenses: {
    label: 'Expenses',
    color: 'var(--chart-2)',
  },
  profit: {
    label: 'Profit',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

const xNumTicks = computed(() => Math.min(chartData.value.length, 6))

function toTime(value: string | number): number {
  if (typeof value === 'number') return value
  const [y, m] = String(value).slice(0, 7).split('-').map(Number)
  return new Date(y || 0, (m || 1) - 1, 1).getTime()
}

function formatMonth(value: number | string) {
  if (typeof value === 'number') {
    return new Date(value).toLocaleDateString(undefined, { month: 'short' })
  }
  const [y, m] = String(value).slice(0, 7).split('-').map(Number)
  if (!y || !m)
    return String(value)
  return new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: 'short' })
}

function formatCompact(value: number) {
  return new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}
</script>

<template>
  <UiCard class="shadow-sm transition-shadow hover:shadow-md">
    <UiCardHeader class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <UiCardTitle>Financial Overview</UiCardTitle>
        <UiCardDescription>Monthly revenue, expenses, and profit</UiCardDescription>
      </div>
      <ChartPeriodSelect v-model="period" />
    </UiCardHeader>
    <UiCardContent>
      <div v-if="store.financialOverviewLoading && chartData.length === 0" class="flex justify-center py-16">
        <LoadingState />
      </div>
      <EmptyState
        v-else-if="chartData.length === 0"
        title="No financial data"
        description="No financial activity in this period"
      />
      <ChartContainer v-else :config="chartConfig">
        <VisXYContainer :data="chartData">
          <VisLine
            :x="(d: FinancialOverviewPoint) => toTime(d.month)"
            :y="(d: FinancialOverviewPoint) => d.revenue"
            :color="chartConfig.revenue.color"
            :line-width="2"
          />
          <VisLine
            :x="(d: FinancialOverviewPoint) => toTime(d.month)"
            :y="(d: FinancialOverviewPoint) => d.expenses"
            :color="chartConfig.expenses.color"
            :line-width="2"
          />
          <VisLine
            :x="(d: FinancialOverviewPoint) => toTime(d.month)"
            :y="(d: FinancialOverviewPoint) => d.profit"
            :color="chartConfig.profit.color"
            :line-width="2"
          />
          <VisAxis
            type="x"
            :x="(d: FinancialOverviewPoint) => toTime(d.month)"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="xNumTicks"
            :tick-format="(d: number | string) => formatMonth(d)"
          />
          <VisAxis
            type="y"
            :num-ticks="3"
            :tick-line="false"
            :domain-line="false"
            :tick-format="(d: number) => formatCompact(d)"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(chartConfig, ChartTooltipContent, { labelKey: 'month' })"
            :color="[chartConfig.revenue.color, chartConfig.expenses.color, chartConfig.profit.color]"
          />
        </VisXYContainer>
        <ChartLegendContent />
      </ChartContainer>
    </UiCardContent>
  </UiCard>
</template>