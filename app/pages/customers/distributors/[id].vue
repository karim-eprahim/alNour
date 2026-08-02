<script setup lang="ts">
import { h, ref, reactive, computed, onMounted } from 'vue'
import {
  ArrowLeft, Truck, RotateCcw, Package, DollarSign, Loader2,
  ShoppingCart, Boxes, Wallet, Activity, Mail, Phone, MapPin,
} from '@lucide/vue'
import { toast } from 'vue-sonner'
import type { ColumnDef } from '@tanstack/vue-table'
import { getLedgerColumns } from '@/modules/customers/components/column'
import {
  UiBadge, UiButton, UiCard, UiCardContent, UiCardHeader, UiCardTitle, UiCardDescription,
  UiDialog, UiDialogContent, UiDialogHeader, UiDialogTitle, UiDialogDescription, UiDialogFooter,
  UiInput, UiLabel, NuxtLink,
} from '#components'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: {
    module: 'SALES',
    action: 'READ'
  }
})

const route = useRoute()
const distributorId = computed(() => route.params.id as string)

const store = useDistributorStore()
const ledgerStore = useLedgerStore()

interface DistributorSnapshot {
  id: string
  name: string
  email: string
  phone: string | null
  avatar: string | null
  status: string
  cashOnHand: number
  createdAt: string
  balance: number
  totalCustody: number
  assignedWarehouses: { id: string; name: string; location: string | null }[]
  custodies: Array<{ id: string; productId: string; quantity: number; product: { name: string; nameAr: string; sku: string } }>
}

const distributor = ref<DistributorSnapshot | null>(null)
const loading = ref(true)

// Load / Return dialogs
const showLoadDialog = ref(false)
const showReturnDialog = ref(false)
const submitting = ref(false)
const loadForm = reactive({
  distributorId: '',
  productId: '',
  warehouseId: '',
  quantity: 0,
  notes: '',
})
const returnForm = reactive({
  distributorId: '',
  productId: '',
  warehouseId: '',
  quantity: 0,
  notes: '',
})

const activeTab = ref('orders')

const activeOrders = computed(() => {
  const s = store.ordersSummary || {}
  return ['ASSIGNED', 'ACCEPTED', 'OUT_FOR_DELIVERY', 'PENDING']
    .reduce((sum, k) => sum + (s[k] || 0), 0)
})
const completedOrders = computed(() => store.ordersSummary?.COMPLETED || 0)
const cancelledOrders = computed(() => store.ordersSummary?.CANCELLED || 0)

async function fetchDistributorSnapshot() {
  const data: any = await $fetch('/api/distributors/users')
  const found = data.distributors.find((d: any) => d.id === distributorId.value)
  if (!found) {
    toast.error('Distributor not found')
    return
  }
  distributor.value = found
}

async function loadOrders() {
  try {
    await store.fetchOrders({ distributorId: distributorId.value, limit: 20 })
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to load orders')
  }
}

async function loadCustody() {
  try {
    await store.fetchCustody(distributorId.value)
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to load custody')
  }
}

async function loadLedger() {
  try {
    await Promise.all([
      ledgerStore.fetchEntries({ distributorId: distributorId.value, limit: 50 }),
      ledgerStore.fetchSummary({ distributorId: distributorId.value }),
    ])
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to load ledger')
  }
}

async function loadCashMovements() {
  try {
    await store.fetchCashMovements({ distributorId: distributorId.value, limit: 50 })
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to load operations')
  }
}

watch(activeTab, (tab) => {
  if (tab === 'orders') loadOrders()
  else if (tab === 'inventory') loadCustody()
  else if (tab === 'ledger') loadLedger()
  else if (tab === 'operations') loadCashMovements()
})

onMounted(async () => {
  loading.value = true
  await Promise.all([fetchDistributorSnapshot(), loadOrders(), loadCustody()])
  loading.value = false
})

// ---------- Columns ----------
const orderStatusVariant = (s: string) => {
  const map: Record<string, string> = {
    ASSIGNED: 'default', ACCEPTED: 'warning', OUT_FOR_DELIVERY: 'default',
    COMPLETED: 'success', CANCELLED: 'destructive', PENDING: 'secondary',
  }
  return (map[s] || 'secondary') as any
}

const orderColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'orderNumber',
    header: 'Order',
    cell: ({ row }) => h(NuxtLink, {
      to: `/sales/${row.original.id}`,
      class: 'font-medium hover:underline',
    }, row.original.orderNumber),
  },
  {
    accessorKey: 'customer.name',
    header: 'Customer',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.customer?.name || '—'),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, new Date(row.original.createdAt).toLocaleDateString()),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total',
    cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalAmount).toFixed(2)),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(UiBadge, { variant: orderStatusVariant(row.original.status), class: 'text-xs' }, row.original.status),
  },
]

const custodyColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'product.name',
    header: 'Product',
    cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.product?.name || '—'),
  },
  {
    accessorKey: 'product.sku',
    header: 'SKU',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, row.original.product?.sku || '—'),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.quantity).toFixed(3)),
  },
  {
    id: 'value',
    header: 'Value',
    cell: ({ row }) => {
      const value = Number(row.original.quantity) * Number(row.original.product?.sellingPrice || 0)
      return h('span', { class: 'tabular-nums text-muted-foreground block' }, value.toFixed(2))
    },
  },
  {
    id: 'unitPrice',
    header: 'Unit Price',
    cell: ({ row }) => h('span', { class: 'tabular-nums text-muted-foreground block' }, Number(row.original.product?.sellingPrice || 0).toFixed(2)),
  },
]

const operationsColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, new Date(row.original.createdAt).toLocaleString()),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const map: Record<string, string> = {
        PAYMENT_COLLECTED: 'success',
        CASH_HANDOVER: 'warning',
        ADJUSTMENT: 'default',
      }
      return h(UiBadge, { variant: (map[row.original.type] || 'secondary') as any, class: 'text-xs' }, row.original.type)
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.amount).toFixed(2)),
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.notes || '—'),
  },
]

// ---------- Actions (Load / Return) ----------
function openLoad() {
  loadForm.distributorId = distributorId.value
  loadForm.productId = ''
  loadForm.warehouseId = ''
  loadForm.quantity = 0
  loadForm.notes = ''
  showLoadDialog.value = true
}

function openReturn() {
  returnForm.distributorId = distributorId.value
  returnForm.productId = ''
  returnForm.warehouseId = ''
  returnForm.quantity = 0
  returnForm.notes = ''
  showReturnDialog.value = true
}

async function handleLoad() {
  if (!loadForm.productId || !loadForm.warehouseId || loadForm.quantity <= 0) {
    toast.error('Please fill all required fields')
    return
  }
  submitting.value = true
  try {
    await $fetch('/api/distributors/load', { method: 'POST', body: loadForm })
    toast.success('Truck loaded successfully')
    showLoadDialog.value = false
    await Promise.all([fetchDistributor(), loadCustody()])
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to load truck')
  } finally {
    submitting.value = false
  }
}

async function handleReturn() {
  if (!returnForm.productId || !returnForm.warehouseId || returnForm.quantity <= 0) {
    toast.error('Please fill all required fields')
    return
  }
  submitting.value = true
  try {
    await $fetch('/api/distributors/return', { method: 'POST', body: returnForm })
    toast.success('Stock returned successfully')
    showReturnDialog.value = false
    await Promise.all([fetchDistributor(), loadCustody()])
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to return stock')
  } finally {
    submitting.value = false
  }
}

const distributionWarehouses = computed(() =>
  distributor.value?.assignedWarehouses || []
)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/customers/distributors')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader v-if="distributor" :title="distributor.name" description="Distributor Control Center">
        <template #actions>
          <UiBadge :variant="distributor.status === 'ACTIVE' ? 'success' : 'secondary'">
            {{ distributor.status }}
          </UiBadge>
        </template>
      </PageHeader>
    </div>

    <!-- Header / basic info -->
    <div v-if="distributor" class="grid gap-4 lg:grid-cols-3">
      <UiCard>
        <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Contact</UiCardTitle>
        </UiCardHeader>
        <UiCardContent class="space-y-2 text-sm">
          <p class="flex items-center gap-2"><Mail class="size-4 text-muted-foreground" /> {{ distributor.email }}</p>
          <p class="flex items-center gap-2"><Phone class="size-4 text-muted-foreground" /> {{ distributor.phone || '—' }}</p>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Assigned Warehouses</UiCardTitle>
          <MapPin class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent class="space-y-1 text-sm">
          <p v-if="distributionWarehouses.length === 0" class="text-muted-foreground">No warehouses assigned</p>
          <p v-for="w in distributionWarehouses" :key="w.id" class="flex items-center gap-2">
            <Package class="size-4 text-muted-foreground" /> {{ w.name }}{{ w.location ? ` — ${w.location}` : '' }}
          </p>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Quick Actions</UiCardTitle>
        </UiCardHeader>
        <UiCardContent class="flex gap-2">
          <UiButton size="sm" @click="openLoad">
            <Truck class="size-3.5 mr-1" /> Load Truck
          </UiButton>
          <UiButton size="sm" variant="outline" @click="openReturn">
            <RotateCcw class="size-3.5 mr-1" /> Return Stock
          </UiButton>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Summary cards -->
    <div class="grid gap-4 grid-cols-2 lg:grid-cols-3">
      <UiCard>
        <UiCardHeader class="mb-2 flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Active Orders</UiCardTitle>
          <ShoppingCart class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ activeOrders }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="mb-2 flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Completed Orders</UiCardTitle>
          <ShoppingCart class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ completedOrders }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="mb-2 flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Truck Inventory</UiCardTitle>
          <Boxes class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ distributor?.totalCustody ?? 0 }}</p>
          <p class="text-xs text-muted-foreground">{{ store.custodies?.length || 0 }} products</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="mb-2 flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Custody Value</UiCardTitle>
          <DollarSign class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold tabular-nums">{{ Number(store.custodyTotalValue || 0).toFixed(2) }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="mb-2 flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Financial Balance</UiCardTitle>
          <Wallet class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold tabular-nums" :class="(distributor?.balance || 0) > 0 ? 'text-destructive' : 'text-green-600'">
            {{ Number(distributor?.balance || 0).toFixed(2) }}
          </p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="mb-2 flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Current Cash</UiCardTitle>
          <DollarSign class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold tabular-nums">{{ Number(distributor?.cashOnHand || 0).toFixed(2) }}</p>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Tabs -->
    <UiTabs v-model="activeTab" class="space-y-4">
      <UiTabsList>
        <UiTabsTrigger value="orders"><ShoppingCart class="size-4" /> Orders</UiTabsTrigger>
        <UiTabsTrigger value="inventory"><Boxes class="size-4" /> Truck Inventory</UiTabsTrigger>
        <UiTabsTrigger value="ledger"><Wallet class="size-4" /> Ledger</UiTabsTrigger>
        <UiTabsTrigger value="operations"><Activity class="size-4" /> Operations</UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent value="orders">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Delivery Orders</UiCardTitle>
            <UiCardDescription>Recent and active delivery orders for this distributor</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <AppTable
              :data="store.orders"
              :columns="orderColumns"
              :loading="store.loading"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="true"
            >
              <template #empty>
                <EmptyState title="No orders" description="No delivery orders have been assigned to this distributor yet." />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>

      <UiTabsContent value="inventory">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Truck Inventory</UiCardTitle>
            <UiCardDescription>Current quantities and values on the distributor's truck</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <AppTable
              :data="store.custodies"
              :columns="custodyColumns"
              :loading="store.loading"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="true"
            >
              <template #empty>
                <EmptyState title="No inventory" description="No stock currently loaded on this distributor's truck." />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>

      <UiTabsContent value="ledger">
        <div v-if="ledgerStore.summary" class="grid grid-cols-3 gap-3 mb-4">
          <UiCard size="sm">
            <UiCardContent class="flex items-center gap-3 p-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                <Wallet class="size-4 text-red-500" />
              </div>
              <div class="min-w-0">
                <p class="text-xs text-muted-foreground truncate">Total Debit</p>
                <p class="text-sm font-semibold tabular-nums text-destructive">{{ Number(ledgerStore.summary.totalDebit || 0).toFixed(2) }}</p>
              </div>
            </UiCardContent>
          </UiCard>
          <UiCard size="sm">
            <UiCardContent class="flex items-center gap-3 p-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                <Wallet class="size-4 text-green-500" />
              </div>
              <div class="min-w-0">
                <p class="text-xs text-muted-foreground truncate">Total Credit</p>
                <p class="text-sm font-semibold tabular-nums text-green-600">{{ Number(ledgerStore.summary.totalCredit || 0).toFixed(2) }}</p>
              </div>
            </UiCardContent>
          </UiCard>
          <UiCard size="sm">
            <UiCardContent class="flex items-center gap-3 p-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
                <Wallet class="size-4 text-orange-500" />
              </div>
              <div class="min-w-0">
                <p class="text-xs text-muted-foreground truncate">Balance</p>
                <p class="text-sm font-semibold tabular-nums" :class="Number(ledgerStore.summary.balance || 0) > 0 ? 'text-destructive' : 'text-green-600'">{{ Number(ledgerStore.summary.balance || 0).toFixed(2) }}</p>
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Ledger Entries</UiCardTitle>
            <UiCardDescription>Financial transactions history for this distributor</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <AppTable
              :data="ledgerStore.entries"
              :columns="getLedgerColumns()"
              :loading="ledgerStore.loading"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="true"
            >
              <template #empty>
                <EmptyState title="No transactions" description="No ledger entries recorded" />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>

      <UiTabsContent value="operations">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Operations</UiCardTitle>
            <UiCardDescription>Cash movements and distributor activity history</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <AppTable
              :data="store.cashMovements"
              :columns="operationsColumns"
              :loading="store.loading"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="true"
            >
              <template #empty>
                <EmptyState title="No operations" description="No distributor cash operations recorded yet." />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>
    </UiTabs>

    <!-- Load Truck Dialog -->
    <UiDialog :open="showLoadDialog" @update:open="showLoadDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Load Truck</UiDialogTitle>
          <UiDialogDescription>Load inventory onto {{ distributor?.name }}'s truck</UiDialogDescription>
        </UiDialogHeader>
        <form @submit.prevent="handleLoad" class="space-y-4">
          <div class="space-y-2">
            <UiLabel>Distributor</UiLabel>
            <UiInput :model-value="distributor?.name" disabled />
          </div>
          <div class="space-y-2">
            <UiLabel for="load-product">Product *</UiLabel>
            <LookupCombobox v-model="loadForm.productId" :endpoint="fetchProductsLookupApi" label-key="_label" placeholder="Select product" />
          </div>
          <div class="space-y-2">
            <UiLabel for="load-warehouse">From Warehouse *</UiLabel>
            <LookupCombobox v-model="loadForm.warehouseId" :endpoint="fetchWarehousesLookupApi" placeholder="Select warehouse" />
          </div>
          <div class="space-y-2">
            <UiLabel for="load-qty">Quantity *</UiLabel>
            <UiInput id="load-qty" v-model.number="loadForm.quantity" type="number" step="0.001" min="0" placeholder="0.000" />
          </div>
          <div class="space-y-2">
            <UiLabel for="load-notes">Notes</UiLabel>
            <UiInput id="load-notes" v-model="loadForm.notes" placeholder="Optional notes" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showLoadDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="submitting">
              <Loader2 v-if="submitting" class="size-4 mr-1 animate-spin" />
              <Truck v-else class="size-4 mr-1" />
              Load Truck
            </UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Return Stock Dialog -->
    <UiDialog :open="showReturnDialog" @update:open="showReturnDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Return Stock</UiDialogTitle>
          <UiDialogDescription>Return unsold stock from {{ distributor?.name }}'s truck to warehouse</UiDialogDescription>
        </UiDialogHeader>
        <form @submit.prevent="handleReturn" class="space-y-4">
          <div class="space-y-2">
            <UiLabel>Distributor</UiLabel>
            <UiInput :model-value="distributor?.name" disabled />
          </div>
          <div class="space-y-2">
            <UiLabel for="return-product">Product *</UiLabel>
            <LookupCombobox v-model="returnForm.productId" :endpoint="fetchProductsLookupApi" label-key="_label" placeholder="Select product on truck" empty-message="No products on truck" />
          </div>
          <div class="space-y-2">
            <UiLabel for="return-warehouse">To Warehouse *</UiLabel>
            <LookupCombobox v-model="returnForm.warehouseId" :endpoint="fetchWarehousesLookupApi" placeholder="Select warehouse" />
          </div>
          <div class="space-y-2">
            <UiLabel for="return-qty">Quantity *</UiLabel>
            <UiInput id="return-qty" v-model.number="returnForm.quantity" type="number" step="0.001" min="0" placeholder="0.000" />
          </div>
          <div class="space-y-2">
            <UiLabel for="return-notes">Notes</UiLabel>
            <UiInput id="return-notes" v-model="returnForm.notes" placeholder="Optional notes" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showReturnDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="submitting">
              <Loader2 v-if="submitting" class="size-4 mr-1 animate-spin" />
              <RotateCcw v-else class="size-4 mr-1" />
              Return Stock
            </UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>