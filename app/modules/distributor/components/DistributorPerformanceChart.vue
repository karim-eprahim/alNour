<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
import {
  ChartContainer,
  ChartTooltip,
  ChartCrosshair,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart'
import type { DashboardPeriod } from '@/lib/period'

interface PerformanceDatum {
  category: string
  value: number
  fill: string
}

const store = useDistributorStore()
const period = ref<DashboardPeriod>('30d')

onMounted(() => load())
watch(period, () => load())

async function load() {
  try {
    await store.fetchDashboard({ period: period.value })
  } catch {
    // keep existing data on failure
  }
}

const chartData = computed<PerformanceDatum[]>(() => {
  const performance = store.dashboard?.performance
  if (!performance)
    return []
  return [
    { category: 'Orders', value: performance.orders, fill: 'var(--chart-1)' },
    { category: 'Delivered', value: performance.delivered, fill: 'var(--chart-2)' },
  ]
})

const salesAmount = computed(() => store.dashboard?.performance.salesAmount || 0)
const deliveredRate = computed(() => store.dashboard?.performance.deliveredRate || 0)

function formatCategoryLabel(value: number) {
  return chartData.value[value]?.category ?? String(value)
}

const chartConfig = {
  value: {
    label: 'Count',
    color: undefined,
  },
} satisfies ChartConfig

function formatMoney(value: number) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value)
}
</script>

<template>
  <UiCard>
    <UiCardHeader class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <UiCardTitle>Performance</UiCardTitle>
        <UiCardDescription>Orders vs delivered this period</UiCardDescription>
      </div>
      <ChartPeriodSelect v-model="period" />
    </UiCardHeader>
    <UiCardContent>
      <div v-if="store.dashboardLoading && chartData.length === 0" class="flex justify-center py-16">
        <LoadingState />
      </div>
      <EmptyState
        v-else-if="chartData.length === 0"
        title="No orders"
        description="No assigned orders in this period"
      />
      <template v-else>
        <ChartContainer :config="chartConfig">
          <VisXYContainer :data="chartData" :margin="{ left: -24 }" :y-domain="[0, undefined]">
            <VisGroupedBar
              :x="(d: PerformanceDatum, i: number) => i"
              :y="(d: PerformanceDatum) => d.value"
              :color="(d: PerformanceDatum) => d.fill"
              :rounded-corners="10"
            />
            <VisAxis
              type="x"
              :x="(d: PerformanceDatum, i: number) => i"
              :tick-line="false"
              :domain-line="false"
              :grid-line="false"
              :tick-values="chartData.map((_, i) => i)"
              :tick-format="(d: number) => formatCategoryLabel(d)"
            />
            <VisAxis
              type="y"
              :num-ticks="3"
              :tick-line="false"
              :domain-line="false"
            />
            <ChartTooltip />
            <ChartCrosshair
              :template="componentToString(chartConfig, ChartTooltipContent, { labelKey: 'category' })"
              color="#0000"
            />
          </VisXYContainer>
        </ChartContainer>

        <div class="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <p class="text-xs text-muted-foreground">Total Sales</p>
            <p class="text-lg font-bold tabular-nums">{{ formatMoney(salesAmount) }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Delivery Rate</p>
            <p class="text-lg font-bold tabular-nums">{{ deliveredRate }}%</p>
          </div>
        </div>
      </template>
    </UiCardContent>
  </UiCard>
</template>