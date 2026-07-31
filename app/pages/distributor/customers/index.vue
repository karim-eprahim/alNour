<script setup lang="ts">
import { Plus, Search, Users, ShoppingCart, ArrowLeft, DollarSign, X, UserPlus, Clock } from '@lucide/vue'
import type { LookupItem, LookupQuery, LookupResponse } from '@/types/lookup'
import { useDebounceFn } from '@vueuse/core'
import { toast } from 'vue-sonner'
import { fetchWarehousesLookupApi } from '@/modules/warehouses/api'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()
const productsStore = useProductsStore()

const recentCustomers = ref<any[]>([])
const customers = ref<LookupItem[]>([])
const customerSearch = ref('')
const customerLoading = ref(false)

const showSaleForm = ref(false)
const showCreateSheet = ref(false)


const salesForm = reactive({
  customerId: '',
  customerName: '',
  warehouseId: '',
  paidAmount: 0,
  paymentMethod: 'CASH' as string,
  items: [] as { productId: string; productName: string; quantity?: number; unitPrice?: number }[],
})

const createForm = reactive({ name: '', phone: '', address: '' })
const creatingCustomer = ref(false)

const products = computed(() =>
  productsStore.products
)

const calculatedTotal = computed(() =>
  salesForm.items.reduce((sum, i) => sum + (i.quantity || 0) * (i.unitPrice || 0), 0),
)

const saving = ref(false)

async function loadRecentCustomers() {
  try {
    const data = await $fetch('/api/distributors/customers/recent')
    recentCustomers.value = data.customers
  } catch {
    recentCustomers.value = []
  }
}

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

function selectCustomer(c: LookupItem) {
  salesForm.customerId = c.value
  salesForm.customerName = c.label
  showSaleForm.value = true
}

function selectRecentCustomer(c: any) {
  salesForm.customerId = c.id
  salesForm.customerName = c.name
  showSaleForm.value = true
}

function addItem() {
  salesForm.items.push({ productId: '', productName: '' })
}

function removeItem(index: number) {
  salesForm.items.splice(index, 1)
}

function selectProduct(index: number, productId: string) {
  const p = products.value.find((pr) => pr.id === productId)
  const item = salesForm.items[index]
  if (p && item) {
    item.productId = p.id
    item.productName = p.name
    if (!item.unitPrice) {
      item.unitPrice = p.sellingPrice ? Number(p.sellingPrice) : undefined
    }
  }
}

async function handleCreateCustomer() {
  if (!createForm.name.trim()) {
    toast.error('Customer name is required')
    return
  }
  creatingCustomer.value = true
  try {
    const data = await $fetch('/api/customers', {
      method: 'POST',
      body: {
        name: createForm.name.trim(),
        phone: createForm.phone || undefined,
        address: createForm.address || undefined,
      },
    })
    const newCust = data.customer
    selectCustomer({ value: newCust.id, label: newCust.name, subtitle: newCust.phone ?? undefined })
    showCreateSheet.value = false
    createForm.name = ''
    createForm.phone = ''
    createForm.address = ''
    toast.success('Customer created')
  } catch (err: any) {
    toast.error(err?.message || 'Failed to create customer')
  } finally {
    creatingCustomer.value = false
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
    await loadRecentCustomers()
  } catch (err: any) {
    toast.error(err?.message || 'Failed to create sale')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  productsStore.fetchProducts()
  loadRecentCustomers()
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

    <div v-if="!showSaleForm && !showCreateSheet">
      <div class="relative mb-4">
        <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <UiInput
          v-model="customerSearch"
          placeholder="Search customers..."
          class="pl-9"
          @input="debouncedSearch(customerSearch)"
        />
      </div>

      <div v-if="recentCustomers.length > 0 && !customerSearch && customers.length === 0" class="mb-6">
        <h3 class="flex items-center gap-1 text-sm font-medium text-muted-foreground mb-2">
          <Clock class="size-3.5" /> Recent Customers
        </h3>
        <div class="space-y-1">
          <button v-for="c in recentCustomers" :key="c.id"
            class="w-full flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors hover:bg-accent/50"
            @click="selectRecentCustomer(c)">
            <div class="text-left">
              <p class="font-medium">{{ c.name }}</p>
              <p class="text-xs text-muted-foreground">{{ c.phone || '—' }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-muted-foreground">{{ new Date(c.lastVisit).toLocaleDateString() }}</p>
              <p class="text-xs font-medium" :class="(c.balance || 0) > 0 ? 'text-green-600' : ''">
                {{ (c.balance || 0).toFixed(2) }}
              </p>
            </div>
          </button>
        </div>
      </div>

      <div v-if="customerLoading" class="flex justify-center py-8">
        <LoadingState />
      </div>

      <div v-else-if="customerSearch && customers.length === 0 && !customerLoading" class="text-center py-8">
        <Users class="mx-auto mb-2 size-8 text-muted-foreground/60" />
        <p class="text-sm text-muted-foreground mb-3">No customers found</p>
        <UiButton size="sm" variant="outline" @click="showCreateSheet = true">
          <UserPlus class="size-4" /> Create "{{ customerSearch }}"
        </UiButton>
      </div>

      <div v-else-if="!customerSearch && recentCustomers.length === 0 && customers.length === 0" class="text-center py-8 text-sm text-muted-foreground">
        <Users class="mx-auto mb-2 size-8 text-muted-foreground/60" />
        <p>No customers yet</p>
        <UiButton size="sm" class="mt-3" @click="showCreateSheet = true">
          <UserPlus class="size-4" /> New Customer
        </UiButton>
      </div>

      <div v-if="customers.length > 0" class="grid gap-2">
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

    <div v-else-if="showCreateSheet" class="max-w-md mx-auto space-y-6">
      <div class="flex items-center gap-3">
        <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="showCreateSheet = false">
          <ArrowLeft class="size-4" />
        </UiButton>
        <div>
          <h2 class="text-lg font-semibold">New Customer</h2>
        </div>
      </div>
      <UiCard>
        <UiCardContent class="space-y-4 pt-6">
          <div>
            <UiLabel>Name *</UiLabel>
            <UiInput v-model="createForm.name" placeholder="Customer name" class="mt-1" />
          </div>
          <div>
            <UiLabel>Phone</UiLabel>
            <UiInput v-model="createForm.phone" placeholder="Phone number" class="mt-1" />
          </div>
          <div>
            <UiLabel>Address</UiLabel>
            <UiTextarea v-model="createForm.address" placeholder="Address" class="mt-1" />
          </div>
          <UiButton class="w-full" :disabled="creatingCustomer || !createForm.name.trim()" @click="handleCreateCustomer">
            {{ creatingCustomer ? 'Creating...' : 'Create & Continue' }}
          </UiButton>
        </UiCardContent>
      </UiCard>
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
              :endpoint="fetchWarehousesLookupApi"
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
                <UiSelect :model-value="item.productId" @update:model-value="selectProduct(index, $event as string)">
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
