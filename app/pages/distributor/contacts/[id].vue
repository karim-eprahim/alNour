<script setup lang="ts">
import { ArrowLeft, Phone, MapPin, Wallet, ShoppingCart, Receipt, DollarSign, CreditCard, Calendar } from '@lucide/vue'
import type { Customer } from '@/modules/customers/type'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const route = useRoute()
const customersStore = useCustomersStore()
const store = useDistributorStore()

const customer = ref<Customer | null>(null)
const loading = ref(true)
const activeTab = ref<'invoices' | 'orders' | 'ledger'>('invoices')
const invoices = ref<any[]>([])
const orders = ref<any[]>([])
const ledgerEntries = ref<any[]>([])
const invoicesLoading = ref(false)

async function load() {
  loading.value = true
  try {
    const id = route.params.id as string
    await customersStore.fetchCustomer(id)
    customer.value = customersStore.currentCustomer
    await Promise.all([loadInvoices(), loadOrders()])
  } finally {
    loading.value = false
  }
}

async function loadInvoices() {
  invoicesLoading.value = true
  try {
    const data: any = await $fetch('/api/invoices', { params: { customerId: route.params.id, limit: 50 } })
    invoices.value = data.invoices || []
  } finally {
    invoicesLoading.value = false
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

    <template v-else-if="customer">
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
            <div class="text-right">
              <p class="text-xs text-muted-foreground">Balance</p>
              <p class="text-2xl font-bold" :class="(customer.balance || 0) > 0 ? 'text-green-600' : (customer.balance || 0) < 0 ? 'text-red-600' : ''">
                {{ (customer.balance || 0).toFixed(2) }}
              </p>
            </div>
          </div>
          <div class="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span class="flex items-center gap-1"><ShoppingCart class="size-3.5" /> {{ customer._count?.salesOrders || 0 }} orders</span>
            <span class="flex items-center gap-1"><Receipt class="size-3.5" /> {{ customer._count?.invoices || 0 }} invoices</span>
            <span class="flex items-center gap-1"><Calendar class="size-3.5" /> Since {{ new Date(customer.createdAt).toLocaleDateString() }}</span>
          </div>
        </UiCardHeader>
      </UiCard>

      <div class="flex gap-1 border-b">
        <button
          v-for="tab in [{ key: 'invoices', label: 'Invoices', icon: Receipt }, { key: 'orders', label: 'Orders', icon: ShoppingCart }, { key: 'ledger', label: 'Ledger', icon: CreditCard }]"
          :key="tab.key"
          class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px"
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
            <p class="font-semibold">{{ inv.totalAmount.toFixed(2) }}</p>
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
            <p class="font-semibold">{{ order.totalAmount.toFixed(2) }}</p>
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
            {{ entry.type === 'DEBIT' ? '-' : '+' }}{{ entry.amount.toFixed(2) }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>
