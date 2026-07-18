<script setup lang="ts">
import { ArrowLeftRight, Warehouse, Check, X } from '@lucide/vue'
import { MOVEMENT_TYPES } from '@/modules/stock/type'
import { createTransferApi, completeTransferApi } from '@/modules/stock/api'
import { fetchWarehousesLookupApi } from '@/modules/warehouses/api'
import { fetchProductsLookupApi } from '@/modules/products/api'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'INVENTORY', action: 'READ' },
})

const warehousesStore = useWarehousesStore()
const productsStore = useProductsStore()

const showCreateDialog = ref(false)
const loading = ref(false)
const transfers = ref<any[]>([])



const createForm = reactive({
  fromWarehouseId: '',
  toWarehouseId: '',
  items: [] as { productId: string; quantity: number | null }[],
})

function addItem() {
  createForm.items.push({ productId: '', quantity: null })
}

function removeItem(index: number) {
  createForm.items.splice(index, 1)
}

async function fetchTransfers() {
  loading.value = true
  try {
    const data = await $fetch<{ transfers: any[]; total: number }>('/api/stock/transfers')
    transfers.value = data.transfers
  } catch {} finally {
    loading.value = false
  }
}

async function handleCreate() {
  if (!createForm.fromWarehouseId || !createForm.toWarehouseId || createForm.items.length === 0) return
  try {
    await createTransferApi({
      fromWarehouseId: createForm.fromWarehouseId,
      toWarehouseId: createForm.toWarehouseId,
      items: createForm.items.map((i) => ({ productId: i.productId, quantity: i.quantity || 0 })),
    })
    showCreateDialog.value = false
    createForm.fromWarehouseId = ''
    createForm.toWarehouseId = ''
    createForm.items = []
    toast.success('Transfer created')
    fetchTransfers()
  } catch {}
}

async function handleComplete(id: string) {
  try {
    await completeTransferApi(id)
    toast.success('Transfer completed')
    fetchTransfers()
  } catch {}
}

onMounted(async () => {
  await fetchTransfers()
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Stock Transfers" description="Move stock between warehouses">
      <template #actions>
        <UiButton v-can="{ module: 'INVENTORY', action: 'CREATE' }" @click="showCreateDialog = true">New Transfer</UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardContent class="p-0">
        <div v-if="loading && transfers.length === 0" class="p-6">
          <LoadingState />
        </div>
        <div v-else-if="transfers.length === 0" class="p-6">
          <EmptyState title="No transfers" description="Create a transfer to move stock between warehouses" action="New Transfer" @action="showCreateDialog = true" />
        </div>
        <UiTable v-else>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Transfer #</UiTableHead>
              <UiTableHead>From</UiTableHead>
              <UiTableHead>To</UiTableHead>
              <UiTableHead>Items</UiTableHead>
              <UiTableHead>Status</UiTableHead>
              <UiTableHead>Date</UiTableHead>
              <UiTableHead class="w-20 text-right">Action</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="t in transfers" :key="t.id">
              <UiTableCell class="text-sm font-mono font-medium">{{ t.transferNumber }}</UiTableCell>
              <UiTableCell class="text-sm">{{ t.fromWarehouse?.name }}</UiTableCell>
              <UiTableCell class="text-sm">{{ t.toWarehouse?.name }}</UiTableCell>
              <UiTableCell class="text-sm">{{ t.items?.length || 0 }}</UiTableCell>
              <UiTableCell>
                <UiBadge :variant="t.status === 'COMPLETED' ? 'default' : t.status === 'CANCELLED' ? 'destructive' : 'secondary'" class="text-xs">
                  {{ t.status }}
                </UiBadge>
              </UiTableCell>
              <UiTableCell class="text-xs text-muted-foreground">{{ new Date(t.createdAt).toLocaleDateString() }}</UiTableCell>
              <UiTableCell class="text-right">
                <UiButton
                  v-if="t.status === 'PENDING'"
                  v-can="{ module: 'INVENTORY', action: 'UPDATE' }"
                  variant="ghost"
                  size="icon-xs"
                  class="text-green-600"
                  @click="handleComplete(t.id)"
                >
                  <Check class="size-3.5" />
                </UiButton>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </UiCardContent>
    </UiCard>

    <UiDialog :open="showCreateDialog" @update:open="showCreateDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Create Stock Transfer</UiDialogTitle>
          <UiDialogDescription>Move inventory between warehouses</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleCreate">
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="from-wh">From Warehouse</UiLabel>
              <LookupCombobox v-model="createForm.fromWarehouseId" :endpoint="fetchWarehousesLookupApi" placeholder="Source..." />
            </div>
            <div class="space-y-2">
              <UiLabel for="to-wh">To Warehouse</UiLabel>
              <LookupCombobox v-model="createForm.toWarehouseId" :endpoint="fetchWarehousesLookupApi" placeholder="Destination..." />
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <UiLabel>Items</UiLabel>
              <UiButton type="button" variant="outline" size="sm" @click="addItem">Add Item</UiButton>
            </div>
            <div v-for="(item, i) in createForm.items" :key="i" class="flex items-center gap-2">
              <LookupCombobox v-model="item.productId" :endpoint="fetchProductsLookupApi" label-key="_label" placeholder="Product..." class="flex-1" />
              <UiInput v-model="item.quantity as number" type="number" step="0.001" placeholder="Qty" class="w-24" />
              <UiButton type="button" variant="ghost" size="icon-xs" class="text-destructive shrink-0" @click="removeItem(i)">
                <X class="size-3.5" />
              </UiButton>
            </div>
          </div>

          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreateDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="loading || createForm.items.length === 0">Create Transfer</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
