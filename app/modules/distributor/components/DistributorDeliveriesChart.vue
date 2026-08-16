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
import type { DistributorDeliveryPoint } from '@/modules/distributor/type'
import type { DashboardPeriod } from '@/lib/period'

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

const chartData = computed(() => store.dashboard?.deliveries || [])

const chartConfig = {
  delivered: {
    label: 'Delivered',
    color: 'var(--chart-2)',
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
</script>

<template>
  <UiCard>
    <UiCardHeader class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <UiCardTitle>Deliveries</UiCardTitle>
        <UiCardDescription>Completed deliveries per day</UiCardDescription>
      </div>
      <ChartPeriodSelect v-model="period" />
    </UiCardHeader>
    <UiCardContent>
      <div v-if="store.dashboardLoading && chartData.length === 0" class="flex justify-center py-16">
        <LoadingState />
      </div>
      <EmptyState
        v-else-if="chartData.length === 0"
        title="No deliveries"
        description="No completed deliveries in this period"
      />
      <ChartContainer v-else :config="chartConfig">
        <VisXYContainer :data="chartData">
          <VisArea
            :x="(d: DistributorDeliveryPoint) => toTime(d.date)"
            :y="(d: DistributorDeliveryPoint) => d.delivered"
            :color="chartConfig.delivered.color"
            :opacity="0.4"
          />
          <VisAxis
            type="x"
            :x="(d: DistributorDeliveryPoint) => toTime(d.date)"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="xNumTicks"
            :tick-format="(d: number | string) => formatDateLabel(d)"
          />
          <VisAxis
            type="y"
            :num-ticks="3"
            :tick-line="false"
            :domain-line="false"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(chartConfig, ChartTooltipContent, { labelKey: 'date' })"
            :color="[chartConfig.delivered.color]"
          />
        </VisXYContainer>
      </ChartContainer>
    </UiCardContent>
  </UiCard>
</template>