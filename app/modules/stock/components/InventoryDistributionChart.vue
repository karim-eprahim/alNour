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

const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
] as const
const TOP_N = 8

interface DonutDatum {
  name: string
  value: number
  fill: string
}

const store = useStockStore()

onMounted(() => load())

async function load() {
  try {
    await store.fetchStockDistribution()
  } catch {
    // keep existing data on failure
  }
}

const chartData = computed<DonutDatum[]>(() => {
  const items = store.stockDistribution
  if (items.length === 0)
    return []
  const top = items.slice(0, TOP_N)
  const rest = items.slice(TOP_N).reduce((sum, d) => sum + d.value, 0)
  const rows = rest > 0 ? [...top, { product: 'Other', value: rest }] : top
  return rows.map((d, i) => ({
    name: d.product,
    value: d.value,
    fill: CHART_COLORS[i % CHART_COLORS.length]!,
  }))
})

const totalQuantity = computed(() => chartData.value.reduce((sum, d) => sum + d.value, 0))

const chartConfig = {
  value: {
    label: 'Quantity',
    color: undefined,
  },
} satisfies ChartConfig

function formatQuantity(value: number) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }).format(value)
}
</script>

<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Inventory Distribution</UiCardTitle>
      <UiCardDescription>Stock quantity by product across warehouses</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <div v-if="store.stockDistributionLoading && chartData.length === 0" class="flex justify-center py-16">
        <LoadingState />
      </div>
      <EmptyState
        v-else-if="chartData.length === 0"
        title="No inventory"
        description="No stock available to display"
      />
      <template v-else>
        <ChartContainer :config="chartConfig" class="mx-auto aspect-square max-h-[240px]">
          <VisSingleContainer :data="chartData" :margin="{ top: 20, bottom: 20 }">
            <VisDonut
              :value="(d: DonutDatum) => d.value"
              :color="(d: DonutDatum) => d.fill"
              :arc-width="36"
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
            <span class="font-medium tabular-nums">{{ formatQuantity(d.value) }}</span>
          </div>
          <div class="flex items-center justify-between border-t pt-2 text-sm">
            <span class="font-medium">Total</span>
            <span class="font-bold tabular-nums">{{ formatQuantity(totalQuantity) }}</span>
          </div>
        </div>
      </template>
    </UiCardContent>
  </UiCard>
</template>