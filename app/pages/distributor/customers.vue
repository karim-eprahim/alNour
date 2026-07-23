<script setup lang="ts">
import { Plus, Search, Users, ShoppingCart, ArrowLeft, DollarSign } from '@lucide/vue'
import type { LookupQuery, LookupResponse } from '@/types/lookup'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()
const productsStore = useProductsStore()

const customers = ref<{ value: string; label: string }[]>([])
const customerSearch = ref('')
const customerLoading = ref(false)

const showSaleForm = ref(false)

const salesForm = reactive({
  customerId: '',
  customerName: '',
  warehouseId: '',
  paidAmount: 0,
  paymentMethod: 'CASH' as string,
  items: [] as { productId: string; productName: string; quantity: number | null; unitPrice: number | null }[],
})

const products = computed(() =>
  productsStore.products.filter((p) => p.type === 'PACKAGED_CHARCOAL' || p.type === 'OTHER'),
)

const calculatedTotal = computed(() =>
  salesForm.items.reduce((sum, i) => sum + (i.quantity || 0) * (i.unitPrice || 0), 0),
)

const saving = ref(false)

async function searchCustomers(q: string) {
  if (q.length < 2) return
  customerLoading.value = true
  try {
    const data: LookupResponse = await $fetch('/api/customers/lookup', { params: { q, take: 20 } })
    customers.value = data.items
  } finally {
    customerLoading.value = false
  }
}

const debouncedSearch = useDebounceFn(searchCustomers, 300)

function selectCustomer(c: { value: string; label: string }) {
  salesForm.customerId = c.value
  salesForm.customerName = c.label
  showSaleForm.value = true
}

function addItem() {
  salesForm.items.push({ productId: '', productName: '', quantity: null, unitPrice: null })
}

function removeItem(index: number) {
  salesForm.items.splice(index, 1)
}

function selectProduct(index: number, productId: string) {
  const p = products.value.find((pr) => pr.id === productId)
  if (p) {
    salesForm.items[index].productId = p.id
    salesForm.items[index].productName = p.name
    if (!salesForm.items[index].unitPrice) {
      salesForm.items[index].unitPrice = p.sellingPrice ? Number(p.sellingPrice) : null
    }
  }
}

async function handleCreateSale() {
  if (!salesForm.customerId || !salesForm.warehouseId || salesForm.items.length === 0) {
    toast.error('Customer, warehouse, and at least one item are required')
    return
  }
  if (salesForm.paidAmount > calculatedTotal.value) {
    toast.error('Paid amount cannot exceed total')
    return
  }

  saving.value = true
  try {
    const invoice = await store.createDirectSale({
      customerId: salesForm.customerId,
      warehouseId: salesForm.warehouseId,
      paidAmount: salesForm.paidAmount || 0,
      paymentMethod: salesForm.paymentMethod,
      paymentNotes: undefined,
      items: salesForm.items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity || 0,
        unitPrice: i.unitPrice || 0,
      })),
    })
    toast.success(`Invoice ${invoice.invoiceNumber} created`)
    showSaleForm.value = false
    salesForm.customerId = ''
    salesForm.customerName = ''
    salesForm.paidAmount = 0
    salesForm.items = []
    await store.fetchCustody()
    await store.fetchCashOnHand()
  } catch (err: any) {
    toast.error(err?.message || 'Failed to create sale')
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
        <h1 class="text-xl font-semibold tracking-tight">Customers</h1>
        <p class="text-sm text-muted-foreground">Select a customer to create a new sale</p>
      </div>
    </div>

    <div v-if="!showSaleForm">
      <div class="relative mb-4">
        <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <UiInput
          v-model="customerSearch"
          placeholder="Search customers..."
          class="pl-9"
          @input="debouncedSearch(customerSearch)"
        />
      </div>

      <div v-if="customerLoading" class="flex justify-center py-8">
        <LoadingState />
      </div>

      <div v-else-if="customers.length === 0" class="text-center py-8 text-sm text-muted-foreground">
        <Users class="mx-auto mb-2 size-8 text-muted-foreground/60" />
        <p>Search for a customer to start</p>
      </div>

      <div v-else class="grid gap-2">
        <UiCard
          v-for="c in customers"
          :key="c.value"
          class="cursor-pointer transition-colors hover:bg-accent/50"
          @click="selectCustomer(c)"
        >
          <UiCardContent class="flex items-center justify-between p-4">
            <div>
              <p class="text-sm font-medium">{{ c.label }}</p>
              <p class="text-xs text-muted-foreground">{{ c.subtitle || '' }}</p>
            </div>
            <ShoppingCart class="size-5 text-muted-foreground" />
          </UiCardContent>
        </UiCard>
      </div>
    </div>

    <div v-else class="space-y-6">
      <div class="flex items-center gap-3">
        <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="showSaleForm = false">
          <ArrowLeft class="size-4" />
        </UiButton>
        <div>
          <h2 class="text-lg font-semibold">New Sale</h2>
          <p class="text-sm text-muted-foreground">Customer: {{ salesForm.customerName }}</p>
        </div>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle class="text-base">Sale Details</UiCardTitle>
        </UiCardHeader>
        <UiCardContent class="space-y-4">
          <div>
            <UiLabel>Warehouse</UiLabel>
            <LookupCombobox
              v-model="salesForm.warehouseId"
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

            <div v-for="(item, index) in salesForm.items" :key="index" class="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-end">
              <div class="flex-1">
                <UiLabel class="text-xs">Product</UiLabel>
                <UiSelect :model-value="item.productId" @update:model-value="selectProduct(index, $event)">
                  <UiSelectTrigger class="mt-0.5">
                    <UiSelectValue placeholder="Select product" />
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem v-for="p in products" :key="p.id" :value="p.id">
                      {{ p.name }}
                    </UiSelectItem>
                  </UiSelectContent>
                </UiSelect>
              </div>
              <div class="w-full sm:w-24">
                <UiLabel class="text-xs">Qty</UiLabel>
                <UiInput v-model="item.quantity" type="number" min="0" step="0.001" placeholder="0" class="mt-0.5" />
              </div>
              <div class="w-full sm:w-28">
                <UiLabel class="text-xs">Price</UiLabel>
                <UiInput v-model="item.unitPrice" type="number" min="0" step="0.01" placeholder="0.00" class="mt-0.5" />
              </div>
              <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="removeItem(index)">
                <X class="size-4" />
              </UiButton>
            </div>
          </div>

          <div class="flex items-center justify-between border-t pt-3">
            <p class="text-sm font-medium">Total</p>
            <p class="text-lg font-bold">{{ calculatedTotal.toFixed(2) }}</p>
          </div>

          <div class="space-y-2">
            <UiLabel>Payment</UiLabel>
            <div class="flex flex-col gap-2 sm:flex-row">
              <div class="flex-1">
                <UiInput v-model="salesForm.paidAmount" type="number" min="0" step="0.01" placeholder="Paid amount" />
              </div>
              <UiSelect v-model="salesForm.paymentMethod">
                <UiSelectTrigger class="w-full sm:w-32">
                  <UiSelectValue placeholder="Method" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem value="CASH">Cash</UiSelectItem>
                  <UiSelectItem value="BANK_TRANSFER">Bank Transfer</UiSelectItem>
                  <UiSelectItem value="CHECK">Check</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </div>

          <UiButton class="w-full" :disabled="saving || calculatedTotal <= 0" @click="handleCreateSale">
            <DollarSign class="size-4" />
            {{ saving ? 'Creating...' : 'Create Sale' }}
          </UiButton>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
