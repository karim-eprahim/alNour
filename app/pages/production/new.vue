<script setup lang="ts">
import { Plus, X, Factory, ArrowLeft, Package, Scale } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'PRODUCTION', action: 'CREATE' },
})

const productionStore = useProductionStore()
const warehousesStore = useWarehousesStore()
const productsStore = useProductsStore()

const saving = ref(false)

const form = reactive({
  warehouseId: '',
  laborCost: 0,
  otherCosts: 0,
  notes: '',
  consumptions: [] as { productId: string; quantity: number | null }[],
  outputs: [] as { productId: string; quantity: number | null; waste: number | null }[],
})

const rawMaterials = computed(() =>
  productsStore.products.filter((p) => p.type === 'RAW_CHARCOAL' || p.type === 'OTHER')
)

const finishedProducts = computed(() =>
  productsStore.products.filter((p) => p.type === 'PACKAGED_CHARCOAL')
)

function addConsumption() {
  form.consumptions.push({ productId: '', quantity: null })
}

function removeConsumption(index: number) {
  form.consumptions.splice(index, 1)
}

function addOutput() {
  form.outputs.push({ productId: '', quantity: null, waste: 0 })
}

function removeOutput(index: number) {
  form.outputs.splice(index, 1)
}

const calculatedInputCost = computed(() => {
  let total = 0
  for (const c of form.consumptions) {
    const product = productsStore.products.find((p) => p.id === c.productId)
    const price = product?.purchaseCost ? Number(product.purchaseCost) : 0
    total += (c.quantity || 0) * price
  }
  return total
})

const totalOutputQty = computed(() =>
  form.outputs.reduce((s, o) => s + (o.quantity || 0), 0)
)

async function handleSubmit() {
  if (!form.warehouseId || form.consumptions.length === 0 || form.outputs.length === 0) {
    toast.error('Warehouse, consumptions, and outputs are required')
    return
  }

  saving.value = true
  try {
    const batch = await productionStore.createBatch({
      warehouseId: form.warehouseId,
      laborCost: form.laborCost || 0,
      otherCosts: form.otherCosts || 0,
      notes: form.notes || undefined,
      consumptions: form.consumptions.map((c) => ({
        productId: c.productId,
        quantity: c.quantity || 0,
      })),
      outputs: form.outputs.map((o) => ({
        productId: o.productId,
        quantity: o.quantity || 0,
        waste: o.waste || 0,
      })),
    })
    toast.success(`Batch ${batch.batchNumber} created`)
    navigateTo(`/production/${batch.id}`)
  } catch (err: any) {
    toast.error(err?.message || 'Failed to create batch')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    warehousesStore.fetchWarehouses(),
    productsStore.fetchProducts(),
  ])
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/production')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader title="New Production Batch" description="Record raw material consumption and finished product output" />
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="grid gap-6 lg:grid-cols-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Batch Details</UiCardTitle>
            <UiCardDescription>Warehouse and cost information</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <div class="space-y-2">
              <UiLabel for="warehouse">Warehouse *</UiLabel>
              <UiSelect v-model="form.warehouseId">
                <UiSelectTrigger id="warehouse"><UiSelectValue placeholder="Select warehouse..." /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="w in warehousesStore.warehouses" :key="w.id" :value="w.id">{{ w.name }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-2">
                <UiLabel for="laborCost">Labor Cost</UiLabel>
                <UiInput id="laborCost" v-model="form.laborCost" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div class="space-y-2">
                <UiLabel for="otherCosts">Other Costs</UiLabel>
                <UiInput id="otherCosts" v-model="form.otherCosts" type="number" step="0.01" placeholder="0.00" />
              </div>
            </div>
            <div class="space-y-2">
              <UiLabel for="notes">Notes</UiLabel>
              <UiTextarea id="notes" v-model="form.notes" placeholder="Optional notes..." />
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Raw Material Consumption</UiCardTitle>
            <UiCardDescription>Input products consumed in this batch</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-3">
            <div v-for="(c, i) in form.consumptions" :key="i" class="rounded-lg border p-3 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-muted-foreground">Input #{{ i + 1 }}</span>
                <UiButton type="button" variant="ghost" size="icon-xs" class="text-destructive" @click="removeConsumption(i)">
                  <X class="size-3.5" />
                </UiButton>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="space-y-1">
                  <UiLabel class="text-xs">Product</UiLabel>
                  <UiSelect v-model="c.productId">
                    <UiSelectTrigger><UiSelectValue placeholder="Select..." /></UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem v-for="p in rawMaterials" :key="p.id" :value="p.id">{{ p.name }} ({{ p.sku }})</UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                </div>
                <div class="space-y-1">
                  <UiLabel class="text-xs">Quantity</UiLabel>
                  <UiInput v-model="c.quantity as number" type="number" step="0.001" placeholder="0" />
                </div>
              </div>
            </div>
            <UiButton type="button" variant="outline" size="sm" class="w-full" @click="addConsumption">
              <Plus class="size-4" /> Add Input
            </UiButton>
          </UiCardContent>
        </UiCard>
      </div>

      <UiCard class="mt-6">
        <UiCardHeader class="flex flex-row items-center justify-between">
          <div>
            <UiCardTitle>Finished Product Output</UiCardTitle>
            <UiCardDescription>Packaged items produced from this batch</UiCardDescription>
          </div>
          <UiButton type="button" variant="outline" size="sm" @click="addOutput">
            <Package class="size-4" /> Add Output
          </UiButton>
        </UiCardHeader>
        <UiCardContent class="p-0">
          <div v-if="form.outputs.length === 0" class="p-6">
            <EmptyState title="No outputs added" description="Add the finished products from this batch" action="Add Output" @action="addOutput" />
          </div>
          <UiTable v-else>
            <UiTableHeader>
              <UiTableRow>
                <UiTableHead class="w-8" />
                <UiTableHead>Product</UiTableHead>
                <UiTableHead class="text-right">Quantity</UiTableHead>
                <UiTableHead class="text-right">Waste</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
              <UiTableRow v-for="(o, i) in form.outputs" :key="i">
                <UiTableCell>
                  <UiButton type="button" variant="ghost" size="icon-xs" class="text-destructive" @click="removeOutput(i)">
                    <X class="size-3.5" />
                  </UiButton>
                </UiTableCell>
                <UiTableCell>
                  <UiSelect v-model="o.productId">
                    <UiSelectTrigger class="w-56"><UiSelectValue placeholder="Select product..." /></UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem v-for="p in finishedProducts" :key="p.id" :value="p.id">{{ p.name }} ({{ p.sku }})</UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                </UiTableCell>
                <UiTableCell>
                  <UiInput v-model="o.quantity as number" type="number" step="0.001" placeholder="0" class="w-24 text-right" />
                </UiTableCell>
                <UiTableCell>
                  <UiInput v-model="o.waste as number" type="number" step="0.001" placeholder="0" class="w-24 text-right" />
                </UiTableCell>
              </UiTableRow>
            </UiTableBody>
          </UiTable>
        </UiCardContent>
        <UiCardFooter v-if="form.outputs.length > 0" class="border-t px-4 py-3">
          <div class="flex items-center justify-between w-full">
            <div class="space-y-1">
              <p class="text-sm text-muted-foreground">Raw Material Cost: <strong>{{ calculatedInputCost.toFixed(2) }}</strong></p>
              <p class="text-sm text-muted-foreground">Total Output Qty: <strong>{{ totalOutputQty.toFixed(3) }}</strong></p>
            </div>
            <p class="text-sm text-muted-foreground">{{ form.outputs.length }} output(s)</p>
          </div>
        </UiCardFooter>
      </UiCard>

      <div class="flex justify-end gap-3 mt-6">
        <UiButton type="button" variant="outline" @click="navigateTo('/production')">Cancel</UiButton>
        <UiButton type="submit" :disabled="saving || !form.warehouseId || form.consumptions.length === 0 || form.outputs.length === 0">
          <Factory class="size-4" /> {{ saving ? 'Creating...' : 'Create Batch' }}
        </UiButton>
      </div>
    </form>
  </div>
</template>
