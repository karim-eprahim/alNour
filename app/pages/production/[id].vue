<script setup lang="ts">
import { Factory, Scale, Package, DollarSign, ArrowLeft, TrendingUp, TrendingDown } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
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
            <div v-if="!batch.consumptions?.length" class="py-4">
              <EmptyState title="No consumptions" description="No raw materials recorded" />
            </div>
            <UiTable v-else>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Product</UiTableHead>
                  <UiTableHead class="text-right">Qty</UiTableHead>
                  <UiTableHead class="text-right">Unit Cost</UiTableHead>
                  <UiTableHead class="text-right">Total</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="c in batch.consumptions" :key="c.id">
                  <UiTableCell>{{ c.product?.name }} ({{ c.product?.sku }})</UiTableCell>
                  <UiTableCell class="text-right tabular-nums">{{ Number(c.quantity).toFixed(3) }}</UiTableCell>
                  <UiTableCell class="text-right tabular-nums">{{ Number(c.unitCost).toFixed(2) }}</UiTableCell>
                  <UiTableCell class="text-right tabular-nums font-medium">{{ Number(c.totalCost).toFixed(2) }}</UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Finished Products Output</UiCardTitle>
            <UiCardDescription>Packaged items produced</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div v-if="!batch.outputs?.length" class="py-4">
              <EmptyState title="No outputs" description="No finished products recorded" />
            </div>
            <UiTable v-else>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Product</UiTableHead>
                  <UiTableHead class="text-right">Qty</UiTableHead>
                  <UiTableHead class="text-right">Waste</UiTableHead>
                  <UiTableHead class="text-right">Cost/Unit</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="o in batch.outputs" :key="o.id">
                  <UiTableCell>
                    <NuxtLink :to="`/products/${o.productId}`" class="hover:underline">
                      {{ o.product?.name }} ({{ o.product?.sku }})
                    </NuxtLink>
                  </UiTableCell>
                  <UiTableCell class="text-right tabular-nums">{{ Number(o.quantity).toFixed(3) }}</UiTableCell>
                  <UiTableCell class="text-right tabular-nums text-destructive">{{ Number(o.waste).toFixed(3) }}</UiTableCell>
                  <UiTableCell class="text-right tabular-nums font-medium">{{ Number(o.costPerUnit).toFixed(2) }}</UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </UiCardContent>
        </UiCard>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Worker Productivity</UiCardTitle>
          <UiCardDescription>Workers assigned to this batch</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div v-if="!batch.productivities?.length" class="py-4">
            <EmptyState title="No workers recorded" description="Worker productivity not yet linked to this batch" />
          </div>
          <UiTable v-else>
            <UiTableHeader>
              <UiTableRow>
                <UiTableHead>Worker</UiTableHead>
                <UiTableHead class="text-right">Bags Packed</UiTableHead>
                <UiTableHead class="text-right">Reward/Bag</UiTableHead>
                <UiTableHead class="text-right">Total Reward</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
              <UiTableRow v-for="p in batch.productivities" :key="p.id">
                <UiTableCell>{{ p.worker?.name }}</UiTableCell>
                <UiTableCell class="text-right tabular-nums">{{ p.bagsPacked }}</UiTableCell>
                <UiTableCell class="text-right tabular-nums">{{ Number(p.rewardPerBag).toFixed(2) }}</UiTableCell>
                <UiTableCell class="text-right tabular-nums font-medium">{{ Number(p.totalReward).toFixed(2) }}</UiTableCell>
              </UiTableRow>
            </UiTableBody>
          </UiTable>
        </UiCardContent>
      </UiCard>
    </template>
  </div>
</template>
