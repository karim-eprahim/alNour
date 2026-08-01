<script setup lang="ts">
import { ArrowLeft, CalendarDays, MapPin, Phone, Truck, CircleCheck, PackageCheck, CircleX, RotateCcw, AlertTriangle, PackageX } from '@lucide/vue'
import { toast } from 'vue-sonner'
import {
  orderStatusVariant,
  orderStatusLabel,
  priorityVariant,
  deliveryResultVariant,
  deliveryResultLabel,
} from '@/modules/distributor/components/orderColumns'
import type { DeliveryResult } from '@/modules/distributor/type'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const route = useRoute()
const store = useDistributorStore()

const actionLoading = ref(false)
const showDeliveryDialog = ref(false)
const deliveryForm = reactive<{
  result: DeliveryResult
  items: { productId: string; quantity: number }[]
  partialDeliveryReason: string
  cancelReason: string
  paidAmount: number
  paymentMethod: string
}>({
  result: 'FULL',
  items: [],
  partialDeliveryReason: '',
  cancelReason: '',
  paidAmount: 0,
  paymentMethod: 'CASH',
})

const order = computed(() => store.currentOrder)

const availableActions = computed(() => {
  const status = order.value?.status
  const actions: { key: string; label: string; icon: any }[] = []
  if (status === 'ASSIGNED') actions.push({ key: 'ACCEPTED', label: 'Accept Order', icon: CircleCheck })
  if (status === 'ACCEPTED') actions.push({ key: 'OUT_FOR_DELIVERY', label: 'Start Delivery', icon: Truck })
  if (status === 'OUT_FOR_DELIVERY') actions.push({ key: 'DELIVER', label: 'Confirm Delivery', icon: PackageCheck })
  return actions
})

const nextActionLabel = computed(() => {
  const first = availableActions.value[0]
  return first?.label ?? null
})

const partialDeliveryReasons = ['Customer Refused Remaining Quantity', 'Out Of Stock', 'Damaged Goods', 'Other']
const cancelReasons = ['Customer Refused', 'Duplicate Order', 'Wrong Order', 'Other']

async function load() {
  await store.fetchOrder(route.params.id as string)
  seedDeliveryForm()
}

function seedDeliveryForm() {
  const o = order.value
  if (!o) return
  deliveryForm.result = 'FULL'
  deliveryForm.items = o.items.map((item) => ({ productId: item.product.id, quantity: Number(item.quantity) }))
  deliveryForm.partialDeliveryReason = ''
  deliveryForm.cancelReason = ''
  deliveryForm.paidAmount = 0
  deliveryForm.paymentMethod = 'CASH'
}

function openDeliveryDialog() {
  seedDeliveryForm()
  showDeliveryDialog.value = true
}

function deliveredTotal() {
  const o = order.value
  if (!o) return 0
  return deliveryForm.items.reduce((sum, item) => {
    const original = o.items.find((it) => it.product.id === item.productId)
    return sum + (item.quantity || 0) * (original ? Number(original.unitPrice) : 0)
  }, 0)
}

async function handleAction(key: string) {
  if (!order.value) return
  if (key === 'DELIVER') {
    openDeliveryDialog()
    return
  }
  actionLoading.value = true
  try {
    await store.updateOrderStatus(order.value.id, key)
    toast.success(`Order ${order.value.orderNumber} updated`)
    await store.fetchOrder(order.value.id)
  } catch (err: any) {
    toast.error(err?.message || 'Failed to update order')
  } finally {
    actionLoading.value = false
  }
}

async function submitDelivery() {
  if (!order.value) return
  const { result, items, partialDeliveryReason, cancelReason, paidAmount, paymentMethod } = deliveryForm

  if ((result === 'FULL' || result === 'PARTIAL') && paidAmount > deliveredTotal()) {
    toast.error('Paid amount cannot exceed the delivery total')
    return
  }
  if (result === 'PARTIAL') {
    const invalid = items.some((item) => item.quantity < 0 || item.quantity > Number(order.value!.items.find((it) => it.product.id === item.productId)!.quantity))
    if (invalid) {
      toast.error('Delivered quantity must be between 0 and the ordered quantity')
      return
    }
    if (items.every((item) => item.quantity === Number(order.value!.items.find((it) => it.product.id === item.productId)!.quantity))) {
      toast.error('Delivered quantities match the full order. Use Full Delivery instead.')
      return
    }
  }

  actionLoading.value = true
  try {
    await store.confirmDelivery(order.value.id, {
      result,
      items: result === 'PARTIAL' ? items : undefined,
      partialDeliveryReason: result === 'PARTIAL' ? partialDeliveryReason || undefined : undefined,
      cancelReason: result === 'CANCELLED' ? cancelReason || undefined : undefined,
      paidAmount: (result === 'FULL' || result === 'PARTIAL') && paidAmount > 0 ? paidAmount : undefined,
      paymentMethod,
    })
    toast.success(`Delivery confirmed`)
    showDeliveryDialog.value = false
    await store.fetchOrder(order.value.id)
  } catch (err: any) {
    toast.error(err?.message || 'Failed to confirm delivery')
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
          <UiBadge v-if="order.deliveryResult !== 'NONE'" :variant="deliveryResultVariant(order.deliveryResult)" class="text-xs">
            {{ deliveryResultLabel(order.deliveryResult) }}
          </UiBadge>
        </template>
      </PageHeader>
    </div>

    <template v-if="order">
      <div v-if="order.deliveryResult === 'PARTIAL' && order.partialDeliveryReason" class="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
        <AlertTriangle class="size-4 shrink-0" />
        <span>Partial delivery reason: <span class="font-medium">{{ order.partialDeliveryReason }}</span></span>
      </div>
      <div v-if="order.deliveryResult === 'CANCELLED' && order.cancelReason" class="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        <CircleX class="size-4 shrink-0" />
        <span>Cancel reason: <span class="font-medium">{{ order.cancelReason }}</span></span>
      </div>

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

    <UiDialog :open="showDeliveryDialog" @update:open="showDeliveryDialog = $event">
      <UiDialogContent class="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <UiDialogHeader>
          <UiDialogTitle>Confirm Delivery</UiDialogTitle>
          <UiDialogDescription>Record the outcome of this delivery</UiDialogDescription>
        </UiDialogHeader>

        <div class="space-y-5">
          <UiRadioGroup v-model="deliveryForm.result" class="grid gap-3 sm:grid-cols-2">
            <label
              class="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"
              :class="deliveryForm.result === 'FULL' ? 'border-primary bg-primary/5' : 'hover:bg-muted'"
            >
              <UiRadioGroupItem id="dr-full" value="FULL" class="mt-0.5" />
              <span>
                <span class="flex items-center gap-2 font-medium"><PackageCheck class="size-4" /> Full Delivery</span>
                <span class="mt-1 block text-xs text-muted-foreground">Customer received the entire order</span>
              </span>
            </label>
            <label
              class="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"
              :class="deliveryForm.result === 'PARTIAL' ? 'border-primary bg-primary/5' : 'hover:bg-muted'"
            >
              <UiRadioGroupItem id="dr-partial" value="PARTIAL" class="mt-0.5" />
              <span>
                <span class="flex items-center gap-2 font-medium"><PackageX class="size-4" /> Partial Delivery</span>
                <span class="mt-1 block text-xs text-muted-foreground">Customer received only part of the order</span>
              </span>
            </label>
            <label
              class="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"
              :class="deliveryForm.result === 'FAILED' ? 'border-primary bg-primary/5' : 'hover:bg-muted'"
            >
              <UiRadioGroupItem id="dr-failed" value="FAILED" class="mt-0.5" />
              <span>
                <span class="flex items-center gap-2 font-medium"><RotateCcw class="size-4" /> Failed Delivery</span>
                <span class="mt-1 block text-xs text-muted-foreground">Attempt failed — will be re-delivered</span>
              </span>
            </label>
            <label
              class="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"
              :class="deliveryForm.result === 'CANCELLED' ? 'border-primary bg-primary/5' : 'hover:bg-muted'"
            >
              <UiRadioGroupItem id="dr-cancelled" value="CANCELLED" class="mt-0.5" />
              <span>
                <span class="flex items-center gap-2 font-medium"><CircleX class="size-4" /> Cancelled</span>
                <span class="mt-1 block text-xs text-muted-foreground">Customer refused or cancelled the order</span>
              </span>
            </label>
          </UiRadioGroup>

          <div v-if="deliveryForm.result === 'PARTIAL'">
            <p class="mb-2 text-sm font-medium">Delivered Quantities</p>
            <div class="space-y-2">
              <div v-for="item in order?.items" :key="item.id" class="flex items-center gap-3 rounded-lg border p-2">
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium">{{ item.product?.name }}</p>
                  <p class="text-xs text-muted-foreground">Ordered: {{ Number(item.quantity).toFixed(3) }}</p>
                </div>
                <UiInput
                  type="number"
                  min="0"
                  :max="Number(item.quantity)"
                  step="0.001"
                  class="w-28 text-right"
                  :model-value="deliveryForm.items.find((d) => d.productId === item.product.id)?.quantity ?? 0"
                  @update:model-value="(v) => {
                    const idx = deliveryForm.items.findIndex((d) => d.productId === item.product.id)
                    const found = deliveryForm.items[idx]
                    if (found) found.quantity = Number(v)
                  }"
                />
              </div>
            </div>
            <div class="mt-3 space-y-2">
              <UiLabel for="partialReason">Reason (optional)</UiLabel>
              <UiSelect v-model="deliveryForm.partialDeliveryReason">
                <UiSelectTrigger id="partialReason"><UiSelectValue placeholder="Select a reason" /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="r in partialDeliveryReasons" :key="r" :value="r">{{ r }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </div>

          <div v-if="deliveryForm.result === 'CANCELLED'" class="space-y-2">
            <UiLabel for="cancelReason">Reason (optional)</UiLabel>
            <UiSelect v-model="deliveryForm.cancelReason">
              <UiSelectTrigger id="cancelReason"><UiSelectValue placeholder="Select a reason" /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="r in cancelReasons" :key="r" :value="r">{{ r }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>

          <div v-if="deliveryForm.result === 'FULL' || deliveryForm.result === 'PARTIAL'" class="rounded-lg border p-4 space-y-3">
            <p class="text-sm font-medium">Payment Collected</p>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-2">
                <UiLabel for="paidAmount">Paid Amount</UiLabel>
                <UiInput id="paidAmount" v-model="deliveryForm.paidAmount" type="number" min="0" step="0.01" placeholder="0.00" />
              </div>
              <div class="space-y-2">
                <UiLabel for="payMethod">Payment Method</UiLabel>
                <UiSelect v-model="deliveryForm.paymentMethod">
                  <UiSelectTrigger id="payMethod"><UiSelectValue /></UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem value="CASH">Cash</UiSelectItem>
                    <UiSelectItem value="BANK_TRANSFER">Bank Transfer</UiSelectItem>
                    <UiSelectItem value="CHECK">Check</UiSelectItem>
                  </UiSelectContent>
                </UiSelect>
              </div>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">{{ deliveryForm.result === 'PARTIAL' ? 'Delivered Total' : 'Invoice Total' }}</span>
              <span class="font-semibold tabular-nums">{{ deliveredTotal().toFixed(2) }}</span>
            </div>
          </div>

          <div v-if="deliveryForm.result === 'FAILED'" class="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <AlertTriangle class="size-4 mt-0.5 shrink-0" />
            <span>No invoice will be created. You can attempt delivery again later.</span>
          </div>
        </div>

        <UiDialogFooter>
          <UiButton type="button" variant="outline" @click="showDeliveryDialog = false">Cancel</UiButton>
          <UiButton type="submit" :disabled="actionLoading" @click="submitDelivery">
            {{ actionLoading ? 'Processing...' : 'Confirm' }}
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
