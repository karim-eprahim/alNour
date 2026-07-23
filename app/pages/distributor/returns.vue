<script setup lang="ts">
import { ArrowLeft, PackageX, Plus, X } from '@lucide/vue'
import type { LookupQuery, LookupResponse } from '@/types/lookup'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()
const productsStore = useProductsStore()

const items = ref<{ productId: string; productName: string; quantity: number | null }[]>([])
const warehouseId = ref('')
const notes = ref('')
const saving = ref(false)

const products = computed(() =>
  productsStore.products.filter((p) => p.type === 'PACKAGED_CHARCOAL' || p.type === 'OTHER'),
)

function addItem() {
  items.value.push({ productId: '', productName: '', quantity: null })
}

function removeItem(index: number) {
  items.value.splice(index, 1)
}

function selectProduct(index: number, productId: string) {
  const p = products.value.find((pr) => pr.id === productId)
  if (p) {
    items.value[index].productId = p.id
    items.value[index].productName = p.name
  }
}

async function handleReturn() {
  if (!warehouseId.value || items.value.length === 0) {
    toast.error('Warehouse and at least one item are required')
    return
  }

  saving.value = true
  try {
    await store.createReturn({
      warehouseId: warehouseId.value,
      notes: notes.value || undefined,
      items: items.value.map((i) => ({
        productId: i.productId,
        quantity: i.quantity || 0,
      })),
    })
    toast.success('Return submitted successfully')
    items.value = []
    warehouseId.value = ''
    notes.value = ''
    await store.fetchCustody()
  } catch (err: any) {
    toast.error(err?.message || 'Failed to submit return')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">Returns</h1>
        <p class="text-sm text-muted-foreground">Return inventory to warehouse</p>
      </div>
    </div>

    <UiCard>
      <UiCardHeader>
        <UiCardTitle class="text-base">Return Form</UiCardTitle>
        <UiCardDescription>Select warehouse and items to return</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="space-y-4">
        <div>
          <UiLabel>Warehouse</UiLabel>
          <LookupCombobox
            v-model="warehouseId"
            :endpoint="(params: LookupQuery) => $fetch<LookupResponse>('/api/warehouses/lookup', { params })"
            placeholder="Select warehouse"
            class="mt-1"
          />
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <UiLabel>Items</UiLabel>
            <UiButton size="xs" variant="outline" @click="addItem">
              <Plus class="size-3" /> Add Item
            </UiButton>
          </div>

          <div v-for="(item, index) in items" :key="index" class="flex items-end gap-2 rounded-lg border p-3">
            <div class="flex-1">
              <UiLabel class="text-xs">Product</UiLabel>
              <UiSelect :model-value="item.productId" @update:model-value="selectProduct(index, $event)">
                <UiSelectTrigger class="mt-0.5">
                  <UiSelectValue placeholder="Select" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="p in products" :key="p.id" :value="p.id">
                    {{ p.name }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
            <div class="w-24">
              <UiLabel class="text-xs">Qty</UiLabel>
              <UiInput v-model="item.quantity" type="number" min="0" step="0.001" placeholder="0" class="mt-0.5" />
            </div>
            <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="removeItem(index)">
              <X class="size-4" />
            </UiButton>
          </div>
        </div>

        <div>
          <UiLabel>Notes (optional)</UiLabel>
          <UiTextarea v-model="notes" placeholder="Reason for return" class="mt-1" />
        </div>

        <UiButton class="w-full" :disabled="saving || items.length === 0" @click="handleReturn">
          <PackageX class="size-4" />
          {{ saving ? 'Submitting...' : 'Submit Return' }}
        </UiButton>
      </UiCardContent>
    </UiCard>
  </div>
</template>
