<script setup lang="ts">
import { Plus, X, ShoppingCart, ArrowLeft, DollarSign } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'SALES', action: 'CREATE' },
})

const salesStore = useSalesStore()
const customersStore = useCustomersStore()
const warehousesStore = useWarehousesStore()
const productsStore = useProductsStore()

const saving = ref(false)

const form = reactive({
  customerId: '',
  warehouseId: '',
  paidAmount: 0,
  paymentMethod: 'CASH' as string,
  paymentNotes: '',
  items: [] as { productId: string; quantity: number | null; unitPrice: number | null }[],
})

const sellableProductItems = computed(() =>
  sellableProducts.value.map(p => ({ ...p, _label: `${p.name} (${p.sku})` }))
)

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

async function handleSubmit() {
  if (!form.customerId || !form.warehouseId || form.items.length === 0) {
    toast.error('Customer, warehouse, and at least one item are required')
    return
  }
  if (form.paidAmount > calculatedTotal.value) {
    toast.error('Paid amount cannot exceed total')
    return
  }

  saving.value = true
  try {
    const order = await salesStore.createOrder({
      customerId: form.customerId,
      warehouseId: form.warehouseId,
      paidAmount: form.paidAmount || 0,
      paymentMethod: form.paymentMethod,
      paymentNotes: form.paymentNotes || undefined,
      items: form.items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity || 0,
        unitPrice: i.unitPrice || 0,
      })),
    })
    toast.success(`Order ${order.orderNumber} created`)
    navigateTo(`/sales/${order.id}`)
  } catch (err: any) {
    toast.error(err?.message || 'Failed to create order')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    customersStore.fetchCustomers({ limit: 200 }),
    warehousesStore.fetchWarehouses(),
    productsStore.fetchProducts(),
  ])
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/sales/orders')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader title="New Sales Order" description="Create an order with products and payment" />
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="grid gap-6 lg:grid-cols-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Order Details</UiCardTitle>
            <UiCardDescription>Customer, warehouse, and payment info</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <div class="space-y-2">
              <UiLabel for="customer">Customer *</UiLabel>
              <LookupCombobox v-model="form.customerId" :items="customersStore.customers" placeholder="Select customer..." />
            </div>
            <div class="space-y-2">
              <UiLabel for="warehouse">Warehouse *</UiLabel>
              <LookupCombobox v-model="form.warehouseId" :items="warehousesStore.warehouses" placeholder="Select warehouse..." />
            </div>
            <UiSeparator />
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
            <div v-if="calculatedTotal > 0" class="rounded-lg bg-muted p-3 space-y-1">
              <div class="flex justify-between text-sm">
                <span>Total</span>
                <span class="font-bold tabular-nums">{{ calculatedTotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>Paid</span>
                <span class="tabular-nums text-green-600">{{ (form.paidAmount || 0).toFixed(2) }}</span>
              </div>
              <UiSeparator />
              <div class="flex justify-between text-sm font-medium">
                <span>Remaining Due</span>
                <span class="tabular-nums text-destructive">{{ remainingDue.toFixed(2) }}</span>
              </div>
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
                    <LookupCombobox v-model="item.productId" :items="sellableProductItems" label-key="_label" placeholder="Select..." class="w-56" />
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
        <UiButton type="submit" :disabled="saving || !form.customerId || !form.warehouseId || form.items.length === 0">
          <ShoppingCart class="size-4" /> {{ saving ? 'Creating...' : 'Create Order' }}
        </UiButton>
      </div>
    </form>
  </div>
</template>
