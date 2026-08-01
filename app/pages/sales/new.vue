<script setup lang="ts">
import { Plus, X, ShoppingCart, ArrowLeft, Store, Truck, CalendarDays } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import { fetchCustomersLookupApi, fetchDistributorsLookupApi } from '@/modules/customers/api'
import { fetchWarehousesLookupApi } from '@/modules/warehouses/api'
import { fetchProductsLookupApi } from '@/modules/products/api'
import type { CreateSalesOrderPayload } from '@/modules/sales/type'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'SALES', action: 'CREATE' },
})

type FulfillmentMethod = 'DIRECT' | 'DELIVERY'

const salesStore = useSalesStore()
const customersStore = useCustomersStore()
const warehousesStore = useWarehousesStore()
const productsStore = useProductsStore()

const saving = ref(false)
const fulfillmentMethod = ref<FulfillmentMethod>('DIRECT')

const form = reactive({
  customerId: '',
  warehouseId: '',
  paidAmount: 0,
  paymentMethod: 'CASH' as string,
  paymentNotes: '',
  assignedDistributorId: '',
  expectedDeliveryDate: '',
  priority: 'NORMAL' as 'NORMAL' | 'URGENT',
  deliveryNotes: '',
  items: [] as { productId: string; quantity: number | null; unitPrice: number | null }[],
})

watch(fulfillmentMethod, (method) => {
  if (method === 'DELIVERY') {
    form.paidAmount = 0
    form.paymentMethod = 'CASH'
    form.paymentNotes = ''
  } else {
    form.assignedDistributorId = ''
    form.expectedDeliveryDate = ''
    form.priority = 'NORMAL'
    form.deliveryNotes = ''
  }
})

const sellableProducts = computed(() =>
  productsStore.products.filter((p) => p.type === 'PACKAGED_CHARCOAL' || p.type === 'OTHER')
)

function addItem() {
  form.items.push({ productId: '', quantity: null, unitPrice: null })
}

function removeItem(index: number) {
  form.items.splice(index, 1)
}

const calculatedTotal = computed(() => {
  return form.items.reduce((sum, item) => {
    const qty = item.quantity || 0
    const price = item.unitPrice || 0
    return sum + qty * price
  }, 0)
})

const remainingDue = computed(() => Math.max(0, calculatedTotal.value - (form.paidAmount || 0)))

const orderPayload = computed<CreateSalesOrderPayload>(() => {
  const items = form.items.map((i) => ({
    productId: i.productId,
    quantity: i.quantity || 0,
    unitPrice: i.unitPrice || 0,
  }))

  if (fulfillmentMethod.value === 'DELIVERY') {
    return {
      type: 'DELIVERY',
      customerId: form.customerId,
      warehouseId: form.warehouseId,
      assignedDistributorId: form.assignedDistributorId,
      expectedDeliveryDate: form.expectedDeliveryDate,
      priority: form.priority,
      deliveryNotes: form.deliveryNotes || undefined,
      items,
    }
  }

  return {
    type: 'DIRECT',
    customerId: form.customerId,
    warehouseId: form.warehouseId,
    items,
    paidAmount: form.paidAmount || 0,
    paymentMethod: form.paymentMethod,
    paymentNotes: form.paymentNotes || undefined,
  }
})

const canSubmit = computed(() => {
  if (saving.value) return false
  if (!form.customerId || !form.warehouseId || form.items.length === 0) return false
  if (fulfillmentMethod.value === 'DELIVERY') {
    return !!form.assignedDistributorId && !!form.expectedDeliveryDate
  }
  return true
})

function validate(): boolean {
  if (!form.customerId || !form.warehouseId || form.items.length === 0) {
    toast.error('Customer, warehouse, and at least one item are required')
    return false
  }
  if (fulfillmentMethod.value === 'DELIVERY') {
    if (!form.assignedDistributorId || !form.expectedDeliveryDate) {
      toast.error('Distributor and expected delivery date are required')
      return false
    }
    return true
  }
  if (form.paidAmount > calculatedTotal.value) {
    toast.error('Paid amount cannot exceed total')
    return false
  }
  return true
}

async function handleSubmit() {
  if (!validate()) return

  saving.value = true
  try {
    const order = await salesStore.createOrder(orderPayload.value)
    toast.success(`Order ${order.orderNumber} created`)
    navigateTo(`/sales/${order.id}`)
  } catch (err: any) {
    toast.error(err?.message || 'Failed to create order')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/sales/orders')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader title="New Sale" description="Create a direct sale or a delivery order" />
    </div>

    <form @submit.prevent="handleSubmit">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Fulfillment Method</UiCardTitle>
          <UiCardDescription>Choose how this sale will be fulfilled</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <UiRadioGroup v-model="fulfillmentMethod" class="grid gap-3 sm:grid-cols-2">
            <label
              class="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"
              :class="fulfillmentMethod === 'DIRECT' ? 'border-primary bg-primary/5' : 'hover:bg-muted'"
            >
              <UiRadioGroupItem id="fm-direct" value="DIRECT" class="mt-0.5" />
              <span>
                <span class="flex items-center gap-2 font-medium">
                  <Store class="size-4" /> Customer Pickup
                </span>
                <span class="mt-1 block text-xs text-muted-foreground">Direct sale — customer takes the items immediately</span>
              </span>
            </label>
            <label
              class="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"
              :class="fulfillmentMethod === 'DELIVERY' ? 'border-primary bg-primary/5' : 'hover:bg-muted'"
            >
              <UiRadioGroupItem id="fm-delivery" value="DELIVERY" class="mt-0.5" />
              <span>
                <span class="flex items-center gap-2 font-medium">
                  <Truck class="size-4" /> Distributor Delivery
                </span>
                <span class="mt-1 block text-xs text-muted-foreground">Delivery order — assigned to a distributor</span>
              </span>
            </label>
          </UiRadioGroup>
        </UiCardContent>
      </UiCard>

      <div class="grid gap-6 lg:grid-cols-2 mt-6">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Order Details</UiCardTitle>
            <UiCardDescription>Customer, warehouse, and fulfillment info</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <div class="space-y-2">
              <UiLabel for="customer">Customer *</UiLabel>
              <LookupCombobox v-model="form.customerId" :endpoint="fetchCustomersLookupApi" placeholder="Select customer..." />
            </div>
            <div class="space-y-2">
              <UiLabel for="warehouse">Warehouse *</UiLabel>
              <LookupCombobox v-model="form.warehouseId" :endpoint="fetchWarehousesLookupApi" placeholder="Select warehouse..." />
            </div>
            <UiSeparator />

            <template v-if="fulfillmentMethod === 'DIRECT'">
              <div class="space-y-2">
                <UiLabel for="paidAmount">Amount Paid Now</UiLabel>
                <UiInput id="paidAmount" v-model="form.paidAmount" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-2">
                  <UiLabel for="paymentMethod">Payment Method</UiLabel>
                  <UiSelect v-model="form.paymentMethod">
                    <UiSelectTrigger id="paymentMethod"><UiSelectValue /></UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem value="CASH">Cash</UiSelectItem>
                      <UiSelectItem value="BANK_TRANSFER">Bank Transfer</UiSelectItem>
                      <UiSelectItem value="CHECK">Check</UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                </div>
                <div class="space-y-2">
                  <UiLabel for="paymentNotes">Payment Notes</UiLabel>
                  <UiInput id="paymentNotes" v-model="form.paymentNotes" placeholder="Optional" />
                </div>
              </div>
            </template>

            <template v-else>
              <div class="space-y-2">
                <UiLabel for="assignedDistributor">Assign Distributor *</UiLabel>
                <LookupCombobox v-model="form.assignedDistributorId" :endpoint="fetchDistributorsLookupApi" placeholder="Select distributor..." />
              </div>
              <div class="space-y-2">
                <UiLabel for="expectedDeliveryDate">
                  <span class="inline-flex items-center gap-1.5"><CalendarDays class="size-3.5" /> Expected Delivery Date *</span>
                </UiLabel>
                <UiInput id="expectedDeliveryDate" v-model="form.expectedDeliveryDate" type="date" />
              </div>
              <div class="space-y-2">
                <UiLabel>Priority</UiLabel>
                <UiRadioGroup v-model="form.priority" class="flex gap-4">
                  <label class="flex cursor-pointer items-center gap-2 text-sm">
                    <UiRadioGroupItem id="priority-normal" value="NORMAL" />
                    Normal
                  </label>
                  <label class="flex cursor-pointer items-center gap-2 text-sm">
                    <UiRadioGroupItem id="priority-urgent" value="URGENT" />
                    Urgent
                  </label>
                </UiRadioGroup>
              </div>
              <div class="space-y-2">
                <UiLabel for="deliveryNotes">Delivery Notes</UiLabel>
                <UiInput id="deliveryNotes" v-model="form.deliveryNotes" placeholder="Optional" />
              </div>
            </template>

            <UiSeparator />
            <div v-if="calculatedTotal > 0" class="rounded-lg bg-muted p-3 space-y-1">
              <div class="flex justify-between text-sm">
                <span>Total</span>
                <span class="font-bold tabular-nums">{{ calculatedTotal.toFixed(2) }}</span>
              </div>
              <template v-if="fulfillmentMethod === 'DIRECT'">
                <div class="flex justify-between text-sm">
                  <span>Paid</span>
                  <span class="tabular-nums text-green-600">{{ (form.paidAmount || 0).toFixed(2) }}</span>
                </div>
                <UiSeparator />
                <div class="flex justify-between text-sm font-medium">
                  <span>Remaining Due</span>
                  <span class="tabular-nums text-destructive">{{ remainingDue.toFixed(2) }}</span>
                </div>
              </template>
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader class="flex flex-row items-center justify-between">
            <div>
              <UiCardTitle>Order Items</UiCardTitle>
              <UiCardDescription>Products being sold</UiCardDescription>
            </div>
            <UiButton type="button" variant="outline" size="sm" @click="addItem">
              <Plus class="size-4" /> Add Item
            </UiButton>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <div v-if="form.items.length === 0" class="p-6">
              <EmptyState title="No items added" description="Add products to this order" action="Add Item" @action="addItem" />
            </div>
            <UiTable v-else>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead class="w-8" />
                  <UiTableHead>Product</UiTableHead>
                  <UiTableHead class="text-right">Quantity</UiTableHead>
                  <UiTableHead class="text-right">Unit Price</UiTableHead>
                  <UiTableHead class="text-right">Total</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="(item, i) in form.items" :key="i">
                  <UiTableCell>
                    <UiButton type="button" variant="ghost" size="icon-xs" class="text-destructive" @click="removeItem(i)">
                      <X class="size-3.5" />
                    </UiButton>
                  </UiTableCell>
                  <UiTableCell>
                    <LookupCombobox v-model="item.productId" :endpoint="fetchProductsLookupApi" label-key="_label" placeholder="Select..." class="w-56" />
                  </UiTableCell>
                  <UiTableCell>
                    <UiInput v-model="item.quantity as number" type="number" step="0.001" placeholder="0" class="w-24 text-right" />
                  </UiTableCell>
                  <UiTableCell>
                    <UiInput v-model="item.unitPrice as number" type="number" step="0.01" placeholder="0.00" class="w-24 text-right" />
                  </UiTableCell>
                  <UiTableCell class="text-right font-medium tabular-nums">
                    {{ ((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2) }}
                  </UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </UiCardContent>
          <UiCardFooter v-if="form.items.length > 0" class="border-t px-4 py-3">
            <div class="flex items-center justify-between w-full">
              <p class="text-sm text-muted-foreground">{{ form.items.length }} item(s)</p>
              <div class="text-right">
                <p class="text-xs text-muted-foreground">Total Amount</p>
                <p class="text-xl font-bold tabular-nums">{{ calculatedTotal.toFixed(2) }}</p>
              </div>
            </div>
          </UiCardFooter>
        </UiCard>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <UiButton type="button" variant="outline" @click="navigateTo('/sales/orders')">Cancel</UiButton>
        <UiButton type="submit" :disabled="!canSubmit">
          <ShoppingCart class="size-4" /> {{ saving ? 'Creating...' : fulfillmentMethod === 'DELIVERY' ? 'Create Delivery Order' : 'Create Sale' }}
        </UiButton>
      </div>
    </form>
  </div>
</template>
