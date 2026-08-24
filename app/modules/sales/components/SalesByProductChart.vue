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
import type { SalesByProductItem } from '@/modules/sales/type'
import type { DashboardPeriod } from '@/lib/period'
import { useSalesStore } from '@/modules/sales/store'

const store = useSalesStore()
const period = ref<DashboardPeriod>('30d')

onMounted(() => load())
watch(period, () => load())

async function load() {
  try {
    await store.fetchSalesByProduct({ period: period.value, limit: 8 })
  } catch {
    // keep existing data on failure
  }
}

const chartData = computed(() => store.salesByProduct)

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

const xNumTicks = computed(() => Math.min(chartData.value.length, 8))

function truncateLabel(value: number | string) {
  const label = String(value)
  return label.length > 14 ? `${label.slice(0, 14)}…` : label
}

function formatProductLabel(value: number) {
  return truncateLabel(chartData.value[value]?.product ?? String(value))
}

function formatCompact(value: number) {
  return new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}
</script>

<template>
  <UiCard class="shadow-sm transition-shadow hover:shadow-md">
    <UiCardHeader class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <UiCardTitle>Sales By Product</UiCardTitle>
        <UiCardDescription>Top selling products by revenue</UiCardDescription>
      </div>
      <ChartPeriodSelect v-model="period" />
    </UiCardHeader>
    <UiCardContent>
      <div v-if="store.salesByProductLoading && chartData.length === 0" class="flex justify-center py-16">
        <LoadingState />
      </div>
      <EmptyState
        v-else-if="chartData.length === 0"
        title="No sales data"
        description="No products sold in this period"
      />
      <ChartContainer v-else :config="chartConfig">
        <VisXYContainer :data="chartData" :margin="{ left: -24 }" :y-domain="[0, undefined]">
          <VisGroupedBar
            :x="(d: SalesByProductItem, i: number) => i"
            :y="(d: SalesByProductItem) => d.sales"
            :color="chartConfig.sales.color"
            :rounded-corners="10"
          />
          <VisAxis
            type="x"
            :x="(d: SalesByProductItem, i: number) => i"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="xNumTicks"
            :tick-values="chartData.map((_, i) => i)"
            :tick-format="(d: number) => formatProductLabel(d)"
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
            :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })"
            color="#0000"
          />
        </VisXYContainer>
      </ChartContainer>
    </UiCardContent>
  </UiCard>
</template>