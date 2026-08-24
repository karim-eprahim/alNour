<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { Donut } from '@unovis/ts'
import { VisDonut, VisSingleContainer } from '@unovis/vue'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart'
import type { DistributorOrderStatusItem } from '@/modules/distributor/type'
import type { DashboardPeriod } from '@/lib/period'

const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
] as const

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  ASSIGNED: 'Assigned',
  ACCEPTED: 'Accepted',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

interface DonutDatum {
  name: string
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

const chartData = computed<DonutDatum[]>(() => {
  const items = store.dashboard?.orderStatus || []
  return items
    .sort((a, b) => b.count - a.count)
    .map((item, i) => ({
      name: STATUS_LABELS[item.status] || item.status,
      value: item.count,
      fill: CHART_COLORS[i % CHART_COLORS.length]!,
    }))
})

const totalOrders = computed(() => chartData.value.reduce((sum, d) => sum + d.value, 0))

const chartConfig = {
  value: {
    label: 'Orders',
    color: undefined,
  },
} satisfies ChartConfig
</script>

<template>
  <UiCard>
    <UiCardHeader class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <UiCardTitle>Order Status</UiCardTitle>
        <UiCardDescription>Distribution of your assigned orders</UiCardDescription>
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
        description="No orders assigned in this period"
      />
      <template v-else>
        <ChartContainer :config="chartConfig" class="mx-auto aspect-square max-h-[200px]">
          <VisSingleContainer :data="chartData" :margin="{ top: 20, bottom: 20 }">
            <VisDonut
              :value="(d: DonutDatum) => d.value"
              :color="(d: DonutDatum) => d.fill"
              :arc-width="32"
            />
            <ChartTooltip
              :triggers="{
                [Donut.selectors.segment]: componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })!,
              }"
            />
          </VisSingleContainer>
        </ChartContainer>

        <div class="mt-4 space-y-1.5 border-t pt-4">
          <div v-for="d in chartData" :key="d.name" class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2">
              <span class="size-2.5 shrink-0 rounded-xs" :style="{ backgroundColor: d.fill }" />
              <span class="text-muted-foreground">{{ d.name }}</span>
            </div>
            <span class="font-medium tabular-nums">{{ d.value }}</span>
          </div>
          <div class="flex items-center justify-between border-t pt-2 text-sm">
            <span class="font-medium">Total</span>
            <span class="font-bold tabular-nums">{{ totalOrders }}</span>
          </div>
        </div>
      </template>
    </UiCardContent>
  </UiCard>
</template>