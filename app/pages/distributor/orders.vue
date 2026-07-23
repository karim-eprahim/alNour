<script setup lang="ts">
import { ClipboardList, Search, Eye, CircleCheck, ArrowLeft } from '@lucide/vue'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()

const search = ref('')
const statusFilter = ref('__all__')
const page = ref(1)
const limit = 20

const showDetail = ref(false)
const selectedOrder = ref<any>(null)
const completeForm = reactive({
  paidAmount: 0,
  paymentMethod: 'CASH',
})
const completing = ref(false)

const statusOptions = [
  { value: '__all__', label: 'All' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'ASSIGNED', label: 'Assigned' },
  { value: 'ACCEPTED', label: 'Accepted' },
  { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'COMPLETED', label: 'Completed' },
]

async function load() {
  const status = statusFilter.value !== '__all__' ? statusFilter.value : undefined
  await store.fetchOrders({ search: search.value || undefined, status, page: page.value, limit })
}

watch([search, statusFilter], () => { page.value = 1; load() })
watch(page, load)
onMounted(load)

function viewDetail(order: any) {
  selectedOrder.value = order
  completeForm.paidAmount = 0
  completeForm.paymentMethod = 'CASH'
  showDetail.value = true
}

async function handleComplete() {
  if (!selectedOrder.value) return
  completing.value = true
  try {
    await store.completeDelivery(selectedOrder.value.id, {
      paidAmount: completeForm.paidAmount || 0,
      paymentMethod: completeForm.paymentMethod,
    })
    toast.success(`Order ${selectedOrder.value.orderNumber} delivered`)
    showDetail.value = false
    selectedOrder.value = null
    await load()
    await store.fetchCashOnHand()
  } catch (err: any) {
    toast.error(err?.message || 'Failed to complete delivery')
  } finally {
    completing.value = false
  }
}

const canComplete = (status: string) => ['PENDING', 'ASSIGNED', 'ACCEPTED', 'OUT_FOR_DELIVERY'].includes(status)

const statusVariant = (s: string) => {
  const map: Record<string, string> = {
    PENDING: 'secondary',
    ASSIGNED: 'default',
    ACCEPTED: 'outline',
    OUT_FOR_DELIVERY: 'default',
    DELIVERED: 'secondary',
    COMPLETED: 'success',
    CANCELLED: 'destructive',
  }
  return (map[s] || 'secondary') as any
}

function statusLabel(s: string) {
  const map: Record<string, string> = {
    PENDING: 'Pending',
    ASSIGNED: 'Assigned',
    ACCEPTED: 'Accepted',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
  }
  return map[s] || s
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">Orders</h1>
        <p class="text-sm text-muted-foreground">Orders assigned to you</p>
      </div>
    </div>

    <div v-if="!showDetail">
      <div class="mb-4 flex flex-col gap-2 sm:flex-row">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <UiInput v-model="search" placeholder="Search orders..." class="pl-9" />
        </div>
        <UiSelect v-model="statusFilter">
          <UiSelectTrigger class="w-full sm:w-40">
            <UiSelectValue placeholder="Status" />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>

      <div v-if="store.loading" class="flex justify-center py-12">
        <LoadingState />
      </div>

      <div v-else-if="store.orders.length === 0" class="text-center py-12 text-sm text-muted-foreground">
        <ClipboardList class="mx-auto mb-2 size-8 text-muted-foreground/60" />
        <p>No orders assigned to you</p>
      </div>

      <div v-else class="grid gap-2">
        <div
          v-for="order in store.orders"
          :key="order.id"
          class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50 cursor-pointer"
          @click="viewDetail(order)"
        >
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium truncate">{{ order.orderNumber }}</p>
            <p class="text-xs text-muted-foreground truncate">{{ order.customer?.name }}</p>
            <p class="text-xs text-muted-foreground">{{ order.warehouse?.name }}</p>
          </div>
          <div class="flex flex-col items-end gap-1 shrink-0">
            <UiBadge :variant="statusVariant(order.status)" class="text-[10px]">
              {{ statusLabel(order.status) }}
            </UiBadge>
            <p class="text-sm font-semibold">{{ order.totalAmount.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="selectedOrder" class="space-y-6">
      <div class="flex items-center gap-3">
        <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="showDetail = false">
          <ArrowLeft class="size-4" />
        </UiButton>
        <div>
          <h2 class="text-lg font-semibold">{{ selectedOrder.orderNumber }}</h2>
          <p class="text-sm text-muted-foreground">{{ selectedOrder.customer?.name }}</p>
        </div>
        <UiBadge :variant="statusVariant(selectedOrder.status)" class="ml-auto">
          {{ statusLabel(selectedOrder.status) }}
        </UiBadge>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle class="text-base">Items</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div class="grid grid-cols-2 gap-2 text-sm pb-3 border-b sm:grid-cols-4 font-medium text-muted-foreground">
            <span class="col-span-2">Product</span>
            <span class="text-right">Qty</span>
            <span class="text-right">Total</span>
          </div>
          <div v-for="item in selectedOrder.items" :key="item.id" class="grid grid-cols-2 gap-2 py-2 text-sm sm:grid-cols-4 border-b last:border-0">
            <span class="col-span-2 truncate">{{ item.product?.name || item.productId }}</span>
            <span class="text-right">{{ item.quantity.toFixed(1) }}</span>
            <span class="text-right font-medium">{{ item.totalPrice.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between pt-3 text-sm font-semibold">
            <span>Total</span>
            <span>{{ selectedOrder.totalAmount.toFixed(2) }}</span>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard v-if="canComplete(selectedOrder.status)">
        <UiCardHeader>
          <UiCardTitle class="text-base">Complete Delivery</UiCardTitle>
          <UiCardDescription>Record delivery and collect payment</UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="space-y-4">
          <div>
            <UiLabel>Paid Amount</UiLabel>
            <UiInput v-model="completeForm.paidAmount" type="number" min="0" step="0.01" placeholder="0.00" class="mt-1" />
          </div>
          <div>
            <UiLabel>Payment Method</UiLabel>
            <UiSelect v-model="completeForm.paymentMethod">
              <UiSelectTrigger class="mt-1">
                <UiSelectValue />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="CASH">Cash</UiSelectItem>
                <UiSelectItem value="BANK_TRANSFER">Bank Transfer</UiSelectItem>
                <UiSelectItem value="CHECK">Check</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <UiButton class="w-full" :disabled="completing" @click="handleComplete">
            <CircleCheck class="size-4" />
            {{ completing ? 'Completing...' : 'Mark as Delivered' }}
          </UiButton>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
