<script setup lang="ts">
import { ArrowLeft, Phone, MapPin, Wallet, ShoppingCart, Receipt, DollarSign, CreditCard, Calendar, User, Plus, X } from '@lucide/vue'
import type { LookupQuery, LookupResponse } from '@/types/lookup'
import type { Customer } from '@/modules/customers/type'
import { toast } from 'vue-sonner'
import { fetchWarehousesLookupApi } from '@/modules/warehouses/api'


definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const route = useRoute()
const customersStore = useCustomersStore()
const auth = useAuthStore()
const store = useDistributorStore()
const productsStore = useProductsStore()

const customer = ref<Customer | null>(null)
const loading = ref(true)
const loadError = ref(false)
const activeTab = ref<'invoices' | 'my-sales' | 'orders' | 'ledger'>('invoices')
const invoices = ref<any[]>([])
const mySales = ref<any[]>([])
const orders = ref<any[]>([])
const ledgerEntries = ref<any[]>([])
const invoicesLoading = ref(false)

const showSaleForm = ref(false)
const saving = ref(false)

const salesForm = reactive({
  customerId: '',
  customerName: '',
  warehouseId: '',
  paidAmount: 0,
  paymentMethod: 'CASH' as string,
  items: [] as { productId: string; productName: string; quantity?: number; unitPrice?: number }[],
})

const products = computed(() => productsStore.products)

const calculatedTotal = computed(() =>
  salesForm.items.reduce((sum, i) => sum + (i.quantity || 0) * (i.unitPrice || 0), 0),
)

function openSaleForm() {
  salesForm.customerId = route.params.id as string
  salesForm.customerName = customer.value?.name || ''
  salesForm.warehouseId = ''
  salesForm.paidAmount = 0
  salesForm.paymentMethod = 'CASH'
  salesForm.items = []
  showSaleForm.value = true
  if (productsStore.products.length === 0) productsStore.fetchProducts()
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

async function handleCreateSale() {
  if (!salesForm.customerId || !salesForm.warehouseId || salesForm.items.length === 0) {
    toast.error('Warehouse and at least one item are required')
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
    await store.fetchCustody()
    await store.fetchCashOnHand()
    await load()
  } catch (err: any) {
    toast.error(err?.message || 'Failed to create sale')
  } finally {
    saving.value = false
  }
}

async function load() {
  loading.value = true
  loadError.value = false
  try {
    const id = route.params.id as string
    await customersStore.fetchCustomer(id)
    customer.value = customersStore.currentCustomer
    await Promise.all([loadInvoices(), loadMySales(), loadOrders()])
  } catch {
    loadError.value = true
  } finally {
    loading.value = false
  }
}

async function loadInvoices() {
  invoicesLoading.value = true
  try {
    const data: any = await $fetch('/api/invoices', { params: { customerId: route.params.id, limit: 50 } })
    invoices.value = data.invoices || []
  } catch {
    invoices.value = []
  } finally {
    invoicesLoading.value = false
  }
}

async function loadMySales() {
  try {
    const data: any = await $fetch('/api/invoices', {
      params: { customerId: route.params.id, createdById: auth.user?.id, limit: 50 },
    })
    mySales.value = data.invoices || []
  } catch {
    mySales.value = []
  }
}

async function loadOrders() {
  try {
    const data: any = await $fetch('/api/sales', { params: { customerId: route.params.id, limit: 50 } })
    orders.value = data.orders || []
  } catch {}
}

async function loadLedger() {
  try {
    const data: any = await $fetch('/api/ledger', { params: { customerId: route.params.id, limit: 50 } })
    ledgerEntries.value = data.entries || []
  } catch {
    ledgerEntries.value = []
  }
}

watch(() => route.params.id, load)
onMounted(load)

const statusVariant = (s: string) => {
  const map: Record<string, string> = { UNPAID: 'destructive', PARTIAL: 'default', PAID: 'success', CANCELLED: 'secondary', PENDING: 'secondary', CONFIRMED: 'default', COMPLETED: 'success' }
  return (map[s] || 'secondary') as any
}

const lastPurchaseDate = computed(() => {
  if (mySales.value.length > 0) {
    return new Date(mySales.value[0].createdAt).toLocaleDateString()
  }
  if (invoices.value.length > 0) {
    return new Date(invoices.value[0].createdAt).toLocaleDateString()
  }
  return '—'
})

function goBack() {
  navigateTo('/distributor/contacts')
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <UiButton variant="ghost" size="sm" class="gap-1 -ml-2" @click="goBack">
        <ArrowLeft class="size-4" /> Back to Customers
      </UiButton>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <LoadingState />
    </div>

    <div v-else-if="loadError" class="flex flex-col items-center justify-center py-12 text-sm text-muted-foreground">
      <User class="mb-2 size-8 text-muted-foreground/60" />
      <p>Failed to load customer details</p>
      <UiButton variant="outline" size="sm" class="mt-3" @click="load">Retry</UiButton>
    </div>

    <template v-else-if="customer && !showSaleForm">
      <UiCard>
        <UiCardHeader>
          <div class="flex items-start justify-between">
            <div>
              <UiCardTitle class="text-xl">{{ customer.name }}</UiCardTitle>
              <UiCardDescription class="mt-1 space-y-1">
                <div v-if="customer.phone" class="flex items-center gap-2 text-sm">
                  <Phone class="size-3.5" /> {{ customer.phone }}
                </div>
                <div v-if="customer.address" class="flex items-center gap-2 text-sm">
                  <MapPin class="size-3.5" /> {{ customer.address }}
                </div>
              </UiCardDescription>
            </div>
            <div class="flex flex-col items-end gap-2">
              <div class="text-right">
                <p class="text-xs text-muted-foreground">Balance</p>
                <p class="text-2xl font-bold" :class="(customer.balance || 0) > 0 ? 'text-green-600' : (customer.balance || 0) < 0 ? 'text-red-600' : ''">
                  {{ (customer.balance || 0).toFixed(2) }}
                </p>
              </div>
              <UiButton size="sm" @click="openSaleForm">
                <DollarSign class="size-4" /> New Sale
              </UiButton>
            </div>
          </div>
          <div class="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span class="flex items-center gap-1"><ShoppingCart class="size-3.5" /> {{ customer._count?.salesOrders || 0 }} orders</span>
            <span class="flex items-center gap-1"><Receipt class="size-3.5" /> {{ customer._count?.invoices || 0 }} invoices</span>
            <span class="flex items-center gap-1"><Calendar class="size-3.5" /> Last purchase: {{ lastPurchaseDate }}</span>
          </div>
        </UiCardHeader>
      </UiCard>

      <div class="flex gap-1 border-b">
        <button
          v-for="tab in [
            // { key: 'invoices', label: 'All Invoices', icon: Receipt },
            { key: 'my-sales', label: 'My Sales', icon: User },
            { key: 'orders', label: 'Orders', icon: ShoppingCart },
            { key: 'ledger', label: 'Ledger', icon: CreditCard },
          ]"
          :key="tab.key"
          class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap"
          :class="activeTab === tab.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'"
          @click="activeTab = tab.key as any; if (tab.key === 'ledger') loadLedger()"
        >
          <component :is="tab.icon" class="size-4" />
          {{ tab.label }}
        </button>
      </div>

      <div v-if="activeTab === 'invoices'" class="space-y-2">
        <div v-if="invoices.length === 0" class="text-center py-8 text-sm text-muted-foreground">
          <Receipt class="mx-auto mb-2 size-6 text-muted-foreground/60" />
          <p>No invoices for this customer</p>
        </div>
        <div v-for="inv in invoices" :key="inv.id" class="flex items-center justify-between rounded-lg border p-3 text-sm">
          <div class="min-w-0 flex-1">
            <p class="font-medium truncate">{{ inv.invoiceNumber }}</p>
            <p class="text-xs text-muted-foreground">{{ new Date(inv.createdAt).toLocaleDateString() }}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0 ml-2">
            <p class="font-semibold">{{ Number(inv.totalAmount).toFixed(2) }}</p>
            <UiBadge :variant="statusVariant(inv.status)" class="text-[10px]">{{ inv.status }}</UiBadge>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'my-sales'" class="space-y-2">
        <div v-if="mySales.length === 0" class="text-center py-8 text-sm text-muted-foreground">
          <Receipt class="mx-auto mb-2 size-6 text-muted-foreground/60" />
          <p>You haven't made any sales to this customer yet</p>
        </div>
        <div v-for="inv in mySales" :key="inv.id" class="flex items-center justify-between rounded-lg border p-3 text-sm">
          <div class="min-w-0 flex-1">
            <p class="font-medium truncate">{{ inv.invoiceNumber }}</p>
            <p class="text-xs text-muted-foreground">{{ new Date(inv.createdAt).toLocaleDateString() }}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0 ml-2">
            <p class="font-semibold">{{ Number(inv.totalAmount).toFixed(2) }}</p>
            <UiBadge :variant="statusVariant(inv.status)" class="text-[10px]">{{ inv.status }}</UiBadge>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'orders'" class="space-y-2">
        <div v-if="orders.length === 0" class="text-center py-8 text-sm text-muted-foreground">
          <ShoppingCart class="mx-auto mb-2 size-6 text-muted-foreground/60" />
          <p>No orders for this customer</p>
        </div>
        <div v-for="order in orders" :key="order.id" class="flex items-center justify-between rounded-lg border p-3 text-sm">
          <div class="min-w-0 flex-1">
            <p class="font-medium truncate">{{ order.orderNumber }}</p>
            <p class="text-xs text-muted-foreground">{{ new Date(order.createdAt).toLocaleDateString() }}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0 ml-2">
            <p class="font-semibold">{{ Number(order.totalAmount).toFixed(2) }}</p>
            <UiBadge :variant="statusVariant(order.status)" class="text-[10px]">{{ order.status }}</UiBadge>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'ledger'" class="space-y-2">
        <div v-if="ledgerEntries.length === 0" class="text-center py-8 text-sm text-muted-foreground">
          <CreditCard class="mx-auto mb-2 size-6 text-muted-foreground/60" />
          <p>No ledger entries found</p>
        </div>
        <div v-for="entry in ledgerEntries" :key="entry.id" class="flex items-center justify-between rounded-lg border p-3 text-sm">
          <div class="min-w-0 flex-1">
            <p class="font-medium truncate">{{ entry.type }}</p>
            <p class="text-xs text-muted-foreground">{{ new Date(entry.createdAt).toLocaleDateString() }}</p>
            <p v-if="entry.notes" class="text-xs text-muted-foreground truncate">{{ entry.notes }}</p>
          </div>
          <span class="font-semibold shrink-0 ml-2" :class="entry.type === 'DEBIT' ? 'text-red-600' : 'text-green-600'">
            {{ entry.type === 'DEBIT' ? '-' : '+' }}{{ Number(entry.amount).toFixed(2) }}
          </span>
        </div>
      </div>
    </template>

    <template v-else-if="customer && showSaleForm">
      <div class="space-y-6">
        <div class="flex items-center gap-3">
          <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="showSaleForm = false">
            <ArrowLeft class="size-4" />
          </UiButton>
          <div>
            <h2 class="text-lg font-semibold">New Sale</h2>
            <p class="text-sm text-muted-foreground">Customer: {{ customer.name }}</p>
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
    </template>
  </div>
</template>
