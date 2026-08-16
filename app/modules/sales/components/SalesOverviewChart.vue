<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { VisArea, VisAxis, VisXYContainer } from '@unovis/vue'
import {
  ChartContainer,
  ChartTooltip,
  ChartCrosshair,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart'
import type { SalesOverviewPoint } from '@/modules/sales/type'
import type { DashboardPeriod } from '@/lib/period'
import { useSalesStore } from '@/modules/sales/store'


const store = useSalesStore()
const period = ref<DashboardPeriod>('30d')

onMounted(() => load())
watch(period, () => load())

async function load() {
  try {
    await store.fetchSalesOverview({ period: period.value })
  } catch {
    // keep existing data on failure
  }
}

const chartData = computed(() => store.salesOverview)
console.log('chartData', chartData.value)
const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

const xNumTicks = computed(() => Math.min(chartData.value.length, 6))

function toTime(value: string | number): number {
  if (typeof value === 'number') return value
  const [y, m, d] = String(value).slice(0, 10).split('-').map(Number)
  return new Date(y || 0, (m || 1) - 1, d || 1).getTime()
}

function formatDateLabel(value: number | string) {
  if (typeof value === 'number') {
    return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }
  const [y, m, d] = String(value).slice(0, 10).split('-').map(Number)
  if (!y || !m || !d)
    return String(value)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function formatCompact(value: number) {
  return new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}
</script>

<template>
  <UiCard class="shadow-sm transition-shadow hover:shadow-md">
    <UiCardHeader class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <UiCardTitle>Sales Overview</UiCardTitle>
        <UiCardDescription>Daily invoiced sales</UiCardDescription>
      </div>
      <ChartPeriodSelect v-model="period" />
    </UiCardHeader>
    <UiCardContent>
      <div v-if="store.salesOverviewLoading && chartData.length === 0" class="flex justify-center py-16">
        <LoadingState />
      </div>
      <EmptyState
        v-else-if="chartData.length === 0"
        title="No sales data"
        description="No invoices recorded in this period"
      />
      <ChartContainer v-else :config="chartConfig" class="max-h-50 sm:max-h-88">
        <VisXYContainer :data="chartData">
          <VisArea
            :x="(d: SalesOverviewPoint) => toTime(d.date)"
            :y="(d: SalesOverviewPoint) => d.sales"
            :color="chartConfig.sales.color"
            :opacity="0.4"
          />
          <VisAxis
            type="x"
            :x="(d: SalesOverviewPoint) => toTime(d.date)"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="xNumTicks"
            :tick-format="(d: number | string) => formatDateLabel(d)"
          />
          <VisAxis
            type="y"
            :y="(d: SalesOverviewPoint) => d.sales"
            :num-ticks="3"
            :tick-line="false"
            :domain-line="false"
            :tick-format="(d: number) => formatCompact(d)"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(chartConfig, ChartTooltipContent, { labelKey: 'date' })"
            :color="[chartConfig.sales.color]"
          />
        </VisXYContainer>
      </ChartContainer>
    </UiCardContent>
  </UiCard>
</template>