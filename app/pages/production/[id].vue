<script setup lang="ts">
import { ArrowLeft, DollarSign, Package, TrendingUp, Scale } from '@lucide/vue'
import { getConsumptionColumns, getOutputColumns } from '@/modules/production/components/column'
import { getDailyWageColumns } from '@/modules/workers/components/column'
import { UiBadge } from '#components'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'PRODUCTION', action: 'READ' },
})

const route = useRoute()
const productionStore = useProductionStore()

const batch = computed(() => productionStore.currentBatch)
const loading = computed(() => productionStore.loading)

const totalConsumed = computed(() => {
  if (!batch.value?.consumptions) return 0
  return batch.value.consumptions.reduce((s, c) => s + Number(c.quantity), 0)
})

const totalOutput = computed(() => {
  if (!batch.value?.outputs) return 0
  return batch.value.outputs.reduce((s, o) => s + Number(o.quantity), 0)
})

const totalWaste = computed(() => {
  if (!batch.value?.outputs) return 0
  return batch.value.outputs.reduce((s, o) => s + Number(o.waste), 0)
})

const efficiency = computed(() => {
  const total = totalOutput.value + totalWaste.value
  if (total === 0) return 0
  return (totalOutput.value / total) * 100
})

const costPerUnit = computed(() => {
  if (totalOutput.value === 0) return 0
  return Number(batch.value?.totalBatchCost || 0) / totalOutput.value
})

const consumptionColumns = getConsumptionColumns()
const outputColumns = getOutputColumns()
const dailyWageColumns = getDailyWageColumns()

async function load() {
  await productionStore.fetchBatch(route.params.id as string)
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/production')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader v-if="batch" :title="batch.batchNumber" :description="`Warehouse: ${batch.warehouse?.name} · ${new Date(batch.createdAt).toLocaleDateString()}`">
        <template #actions>
          <UiBadge :variant="batch.status === 'COMPLETED' ? 'default' : batch.status === 'CANCELLED' ? 'destructive' : 'secondary'" class="text-xs">
            {{ batch.status }}
          </UiBadge>
        </template>
      </PageHeader>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <LoadingState />
    </div>

    <template v-else-if="batch">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Cost</UiCardTitle>
            <DollarSign class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ Number(batch.totalBatchCost).toFixed(2) }}</p>
            <p class="text-xs text-muted-foreground">Raw: {{ Number(batch.rawMaterialsCost).toFixed(2) }} · Labor: {{ Number(batch.laborCost).toFixed(2) }} · Other: {{ Number(batch.otherCosts).toFixed(2) }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Output Qty</UiCardTitle>
            <Package class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ totalOutput.toFixed(3) }}</p>
            <p class="text-xs text-muted-foreground">Waste: {{ totalWaste.toFixed(3) }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Efficiency</UiCardTitle>
            <TrendingUp class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold" :class="efficiency >= 80 ? 'text-green-600' : efficiency >= 60 ? 'text-yellow-600' : 'text-red-600'">
              {{ efficiency.toFixed(1) }}%
            </p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Cost / Unit</UiCardTitle>
            <Scale class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ costPerUnit.toFixed(2) }}</p>
          </UiCardContent>
        </UiCard>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Raw Materials Consumed</UiCardTitle>
            <UiCardDescription>Input products used in this batch</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <AppTable
              :data="batch.consumptions || []"
              :columns="consumptionColumns"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="false"
            >
              <template #empty>
                <EmptyState title="No consumptions" description="No raw materials recorded" />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Finished Products Output</UiCardTitle>
            <UiCardDescription>Packaged items produced</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <AppTable
              :data="batch.outputs || []"
              :columns="outputColumns"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="false"
            >
              <template #empty>
                <EmptyState title="No outputs" description="No finished products recorded" />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Worker Daily Wages</UiCardTitle>
          <UiCardDescription>Workers assigned to this batch and their daily wages</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <AppTable
            :data="batch.workerDailyWages || []"
            :columns="dailyWageColumns"
            :show-search="false"
            :show-column-toggle="false"
            :show-pagination="false"
          >
            <template #empty>
              <EmptyState title="No workers recorded" description="Log attendance and daily wages from the Workers page" />
            </template>
          </AppTable>
        </UiCardContent>
      </UiCard>
    </template>
  </div>
</template>
