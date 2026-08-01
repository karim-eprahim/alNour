<script setup lang="ts">
import { ArrowLeft, CalendarDays, MapPin, Phone, Truck, CircleCheck, PackageCheck } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { orderStatusVariant, orderStatusLabel, priorityVariant } from '@/modules/distributor/components/orderColumns'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const route = useRoute()
const store = useDistributorStore()

const actionLoading = ref(false)

const order = computed(() => store.currentOrder)

const availableActions = computed(() => {
  const status = order.value?.status
  const actions: { key: string; label: string; icon: any }[] = []
  if (status === 'ASSIGNED') actions.push({ key: 'ACCEPTED', label: 'Accept Order', icon: CircleCheck })
  if (status === 'ACCEPTED') actions.push({ key: 'OUT_FOR_DELIVERY', label: 'Start Delivery', icon: Truck })
  if (status === 'OUT_FOR_DELIVERY') actions.push({ key: 'DELIVERED', label: 'Mark Delivered', icon: PackageCheck })
  return actions
})

const nextActionLabel = computed(() => {
  const first = availableActions.value[0]
  return first?.label ?? null
})

async function load() {
  await store.fetchOrder(route.params.id as string)
}

async function handleAction(key: string) {
  if (!order.value) return
  actionLoading.value = true
  try {
    await store.updateOrderStatus(order.value.id, key)
    toast.success(`Order ${order.value.orderNumber} updated`)
  } catch (err: any) {
    toast.error(err?.message || 'Failed to update order')
  } finally {
    actionLoading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/distributor/orders')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader v-if="order" :title="order.orderNumber" :description="`Created ${new Date(order.createdAt).toLocaleDateString()}`">
        <template #actions>
          <UiBadge :variant="orderStatusVariant(order.status)" class="text-xs">{{ orderStatusLabel(order.status) }}</UiBadge>
          <UiBadge :variant="priorityVariant(order.priority)" class="text-xs">{{ order.priority }}</UiBadge>
        </template>
      </PageHeader>
    </div>

    <template v-if="order">
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="space-y-6">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle class="text-base">Customer</UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="space-y-2 text-sm">
              <p class="font-medium">{{ order.customer.name }}</p>
              <p class="flex items-center gap-2 text-muted-foreground">
                <Phone class="size-3.5" /> {{ order.customer.phone || '—' }}
              </p>
              <p class="flex items-center gap-2 text-muted-foreground">
                <MapPin class="size-3.5" /> {{ order.customer.address || '—' }}
              </p>
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardHeader>
              <UiCardTitle class="text-base">Delivery Information</UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="space-y-2 text-sm">
              <div class="flex items-center gap-2">
                <CalendarDays class="size-3.5 text-muted-foreground" />
                <span class="text-muted-foreground">Expected Delivery</span>
                <span class="ml-auto font-medium">{{ order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString() : '—' }}</span>
              </div>
              <div class="border-t pt-2">
                <p class="text-xs font-medium text-muted-foreground mb-1">Delivery Notes</p>
                <p class="text-muted-foreground">{{ order.deliveryNotes || '—' }}</p>
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle class="text-base">Products</UiCardTitle>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <UiTable>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Product</UiTableHead>
                  <UiTableHead class="text-right">Quantity</UiTableHead>
                  <UiTableHead class="text-right">Unit Price</UiTableHead>
                  <UiTableHead class="text-right">Total</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="item in order.items" :key="item.id">
                  <UiTableCell>
                    <p class="text-sm font-medium">{{ item.product?.name || '—' }}</p>
                    <p class="text-xs text-muted-foreground">{{ item.product?.sku }}</p>
                  </UiTableCell>
                  <UiTableCell class="text-right tabular-nums">{{ Number(item.quantity).toFixed(3) }}</UiTableCell>
                  <UiTableCell class="text-right tabular-nums">{{ Number(item.unitPrice).toFixed(2) }}</UiTableCell>
                  <UiTableCell class="text-right font-medium tabular-nums">{{ Number(item.totalPrice).toFixed(2) }}</UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
            <div class="flex justify-between border-t px-4 py-3 text-sm font-semibold">
              <span>Total Amount</span>
              <span class="tabular-nums">{{ Number(order.totalAmount).toFixed(2) }}</span>
            </div>
          </UiCardContent>
        </UiCard>
      </div>

      <div v-if="availableActions.length && availableActions[0]" class="flex justify-end">
        <UiButton :disabled="actionLoading" @click="handleAction(availableActions[0].key)">
          <component :is="availableActions[0].icon" class="size-4" />
          {{ actionLoading ? 'Processing...' : nextActionLabel }}
        </UiButton>
      </div>
    </template>
  </div>
</template>
