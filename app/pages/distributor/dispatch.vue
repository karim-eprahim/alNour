<script setup lang="ts">
import { ClipboardList, Search, CheckCircle2, Truck, PackageCheck, Eye, ArrowLeft, DollarSign, CircleCheck } from '@lucide/vue'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()

const search = ref('')
const statusFilter = ref('__all__')
const page = ref(1)
const limit = 20

const selectedOrder = ref<any>(null)
const showDetail = ref(false)
const actionLoading = ref(false)

const completeForm = reactive({ paidAmount: 0, paymentMethod: 'CASH' })

const statusOptions = [
  { value: '__all__', label: 'All' },
  { value: 'ASSIGNED', label: 'Assigned' },
  { value: 'ACCEPTED', label: 'Accepted' },
  { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'COMPLETED', label: 'Completed' },
]

function statusLabel(s: string) {
  const map: Record<string, string> = {
    PENDING: 'Pending', ASSIGNED: 'Assigned', ACCEPTED: 'Accepted',
    OUT_FOR_DELIVERY: 'Out for Delivery', DELIVERED: 'Delivered',
    COMPLETED: 'Completed', CANCELLED: 'Cancelled',
  }
  return map[s] || s
}

function statusVariant(s: string) {
  const map: Record<string, string> = { PENDING: 'secondary', ASSIGNED: 'default', ACCEPTED: 'outline', OUT_FOR_DELIVERY: 'default', DELIVERED: 'secondary', COMPLETED: 'success', CANCELLED: 'destructive' }
  return (map[s] || 'secondary') as any
}

const availableActions = computed(() => {
  if (!selectedOrder.value) return []
  const s = selectedOrder.value.status
  const actions: { label: string; key: string; icon: any; variant?: string }[] = []
  if (s === 'ASSIGNED') actions.push({ label: 'Accept Order', key: 'accept', icon: CheckCircle2, variant: 'default' })
  if (s === 'ACCEPTED') actions.push({ label: 'Start Delivery', key: 'start_delivery', icon: Truck, variant: 'default' })
  if (s === 'OUT_FOR_DELIVERY') actions.push({ label: 'Complete Delivery', key: 'complete', icon: PackageCheck, variant: 'default' })
  return actions
})

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

async function handleAction(key: string) {
  if (!selectedOrder.value) return
  actionLoading.value = true
  try {
    if (key === 'accept') {
      await $fetch(`/api/sales/${selectedOrder.value.id}`, { method: 'PATCH', body: { status: 'ACCEPTED' } })
      toast.success('Order accepted')
    } else if (key === 'start_delivery') {
      await $fetch(`/api/sales/${selectedOrder.value.id}`, { method: 'PATCH', body: { status: 'OUT_FOR_DELIVERY' } })
      toast.success('Delivery started')
    } else if (key === 'complete') {
      await store.completeDelivery(selectedOrder.value.id, {
        paidAmount: completeForm.paidAmount || 0,
        paymentMethod: completeForm.paymentMethod,
      })
      toast.success('Delivery completed')
    }
    showDetail.value = false
    selectedOrder.value = null
    await load()
    if (key === 'complete') await store.fetchCashOnHand()
  } catch (err: any) {
    toast.error(err?.message || `Failed to ${key.replace('_', ' ')}`)
  } finally {
    actionLoading.value = false
  }
}

function getNextStatus(current: string): string | null {
  const map: Record<string, string> = { ASSIGNED: 'ACCEPTED', ACCEPTED: 'OUT_FOR_DELIVERY', OUT_FOR_DELIVERY: 'DELIVERED' }
  return map[current] || null
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Dispatch" description="Manage assigned order deliveries">
      <template #actions>
        <UiButton variant="outline" size="sm" @click="navigateTo('/distributor/orders')">
          <ClipboardList class="size-4" /> All Orders
        </UiButton>
      </template>
    </PageHeader>

    <div v-if="!showDetail" class="space-y-4">
      <div class="flex flex-col gap-2 sm:flex-row">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <UiInput v-model="search" placeholder="Search orders..." class="pl-9" />
        </div>
        <UiSelect v-model="statusFilter">
          <UiSelectTrigger class="w-full sm:w-40">
            <UiSelectValue placeholder="Status" />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>

      <div v-if="store.loading" class="flex justify-center py-12"><LoadingState /></div>

      <div v-else-if="store.orders.length === 0" class="text-center py-12 text-sm text-muted-foreground">
        <ClipboardList class="mx-auto mb-2 size-8 text-muted-foreground/60" />
        <p>No assigned orders</p>
      </div>

      <template v-else>
        <div class="hidden sm:block">
          <div class="rounded-lg border">
            <div class="grid grid-cols-12 gap-2 border-b bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground">
              <div class="col-span-2">Order</div>
              <div class="col-span-3">Customer</div>
              <div class="col-span-2">Warehouse</div>
              <div class="col-span-2 text-right">Amount</div>
              <div class="col-span-2">Status</div>
              <div class="col-span-1" />
            </div>
            <div v-for="order in store.orders" :key="order.id"
              class="grid grid-cols-12 gap-2 border-b px-4 py-3 text-sm transition-colors hover:bg-accent/50 cursor-pointer last:border-0 items-center"
              @click="viewDetail(order)">
              <div class="col-span-2 font-medium truncate">{{ order.orderNumber }}</div>
              <div class="col-span-3 truncate">{{ order.customer?.name }}</div>
              <div class="col-span-2 truncate text-muted-foreground">{{ order.warehouse?.name }}</div>
              <div class="col-span-2 text-right font-semibold">{{ order.totalAmount.toFixed(2) }}</div>
              <div class="col-span-2">
                <UiBadge :variant="statusVariant(order.status)" class="text-[10px]">{{ statusLabel(order.status) }}</UiBadge>
              </div>
              <div class="col-span-1 flex justify-end">
                <ChevronRight class="size-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-2 sm:hidden">
          <div v-for="order in store.orders" :key="order.id"
            class="rounded-lg border p-4 transition-colors hover:bg-accent/50 cursor-pointer"
            @click="viewDetail(order)">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium truncate">{{ order.orderNumber }}</p>
              <UiBadge :variant="statusVariant(order.status)" class="text-[10px]">{{ statusLabel(order.status) }}</UiBadge>
            </div>
            <p class="mt-1 text-xs text-muted-foreground truncate">{{ order.customer?.name }}</p>
            <p class="mt-0.5 text-xs text-muted-foreground">{{ order.warehouse?.name }}</p>
            <p class="mt-1 text-sm font-semibold">{{ order.totalAmount.toFixed(2) }}</p>
          </div>
        </div>
      </template>
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
        <div class="ml-auto flex items-center gap-2">
          <UiBadge :variant="statusVariant(selectedOrder.status)">{{ statusLabel(selectedOrder.status) }}</UiBadge>
        </div>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle class="text-base">Order Details</UiCardTitle>
        </UiCardHeader>
        <UiCardContent class="space-y-3 text-sm">
          <div class="flex justify-between"><span class="text-muted-foreground">Customer</span><span>{{ selectedOrder.customer?.name }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Warehouse</span><span>{{ selectedOrder.warehouse?.name }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Created</span><span>{{ new Date(selectedOrder.createdAt).toLocaleDateString() }}</span></div>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle class="text-base">Items</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div class="grid grid-cols-4 gap-2 border-b pb-2 text-xs font-medium text-muted-foreground">
            <span class="col-span-2">Product</span>
            <span class="text-right">Qty</span>
            <span class="text-right">Total</span>
          </div>
          <div v-for="item in selectedOrder.items" :key="item.id" class="grid grid-cols-4 gap-2 py-2 text-sm border-b last:border-0">
            <span class="col-span-2 truncate">{{ item.product?.name || item.productId }}</span>
            <span class="text-right">{{ item.quantity.toFixed(1) }}</span>
            <span class="text-right font-medium">{{ item.totalPrice.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between pt-2 text-sm font-semibold">
            <span>Total</span>
            <span>{{ selectedOrder.totalAmount.toFixed(2) }}</span>
          </div>
        </UiCardContent>
      </UiCard>

      <div v-if="selectedOrder.status === 'OUT_FOR_DELIVERY'" class="space-y-4">
        <UiCard>
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
                <UiSelectTrigger class="mt-1"><UiSelectValue /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem value="CASH">Cash</UiSelectItem>
                  <UiSelectItem value="BANK_TRANSFER">Bank Transfer</UiSelectItem>
                  <UiSelectItem value="CHECK">Check</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </UiCardContent>
        </UiCard>
      </div>

      <div class="flex flex-col gap-2">
        <UiButton
          v-for="action in availableActions"
          :key="action.key"
          :variant="(action.variant as any) || 'default'"
          :disabled="actionLoading"
          class="w-full"
          @click="handleAction(action.key)"
        >
          <component :is="action.icon" class="size-4" />
          {{ actionLoading ? 'Processing...' : action.label }}
        </UiButton>
      </div>
    </div>
  </div>
</template>
