<script setup lang="ts">
import {
  Package, Warehouse, AlertTriangle, ArrowUp, ArrowDown, Factory,
  DollarSign, TrendingUp, TrendingDown, Users, Briefcase,
  ShoppingBag, Receipt, Scale, RefreshCw, Truck,
} from '@lucide/vue'
import { MOVEMENT_TYPES } from '@/modules/stock/type'
import PageHeader from '~/components/shared/PageHeader.vue'
import { UiBadge } from '#components'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const authStore = useAuthStore()
const userRole = computed(() => authStore.userRole)

const isStorekeeper = computed(() => userRole.value === 'STOREKEEPER')
const isAccountant = computed(() => userRole.value === 'ACCOUNTANT')
const isAdmin = computed(() => userRole.value === 'ADMIN' || userRole.value === 'MANAGER')
const isDistributor = computed(() => userRole.value === 'DISTRIBUTOR')
const canViewFinancial = computed(() => isAdmin.value || isAccountant.value)
const canViewStock = computed(() => isAdmin.value || isStorekeeper.value || true)

const loading = ref(true)
const data = ref<any>(null)

function statusVariant(s: string) {
  const map: Record<string, string> = { PENDING: 'secondary', PROCESSING: 'warning', COMPLETED: 'success', CANCELLED: 'destructive' }
  return (map[s] || 'secondary') as any
}

async function fetchDashboard() {
  loading.value = true
  try {
    data.value = await $fetch('/api/reports/dashboard')
  } finally {
    loading.value = false
  }
}

onMounted(fetchDashboard)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Dashboard" description="Welcome back to Al Nour Management System">
      <template #actions>
        <UiButton variant="outline" @click="fetchDashboard">
          <RefreshCw class="size-4" /> Refresh
        </UiButton>
      </template>
    </PageHeader>

    <div v-if="loading" class="flex justify-center py-12">
      <LoadingState />
    </div>

    <template v-else-if="data">
      <!-- Top-level KPI cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UiCard v-if="canViewStock">
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Stock Quantity</UiCardTitle>
            <Package class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ (data.inventory?.totalStockQuantity || 0).toFixed(1) }}</p>
            <p class="text-xs text-muted-foreground">{{ data.inventory?.warehouseCount || 0 }} warehouses</p>
          </UiCardContent>
        </UiCard>

        <UiCard v-if="canViewFinancial">
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Revenue</UiCardTitle>
            <TrendingUp class="size-4 text-green-500" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold text-green-600">{{ (data.financials?.totalRevenue || 0).toFixed(2) }}</p>
            <p class="text-xs text-muted-foreground">{{ (data.financials?.totalCollected || 0).toFixed(2) }} collected</p>
          </UiCardContent>
        </UiCard>

        <UiCard v-if="canViewFinancial">
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Net Profit</UiCardTitle>
            <Scale class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold" :class="(data.financials?.netProfit || 0) >= 0 ? 'text-green-600' : 'text-destructive'">
              {{ (data.financials?.netProfit || 0).toFixed(2) }}
            </p>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Products</UiCardTitle>
            <ShoppingBag class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ data.counts?.totalProducts || 0 }}</p>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Workers</UiCardTitle>
            <Briefcase class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ data.counts?.totalWorkers || 0 }}</p>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Customers</UiCardTitle>
            <Users class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ data.counts?.totalCustomers || 0 }}</p>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Suppliers</UiCardTitle>
            <Truck class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ data.counts?.totalSuppliers || 0 }}</p>
          </UiCardContent>
        </UiCard>
      </div>

      <!-- DISTRIBUTOR WIDGETS — DISTRIBUTOR ROLE -->
      <template v-if="isDistributor && data.distributor">
        <div class="grid gap-4 sm:grid-cols-3">
          <UiCard>
            <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
              <UiCardTitle class="text-sm font-medium text-muted-foreground">My Custody</UiCardTitle>
              <Truck class="size-4 text-muted-foreground" />
            </UiCardHeader>
            <UiCardContent>
              <p class="text-2xl font-bold">{{ (data.distributor.totalCustody || 0).toFixed(3) }}</p>
              <p class="text-xs text-muted-foreground">bags currently on truck</p>
              <div v-if="data.distributor.custodies?.length" class="mt-3 space-y-1 border-t pt-3">
                <div v-for="c in data.distributor.custodies" :key="c.productId" class="flex justify-between text-xs">
                  <span class="text-muted-foreground">{{ c.productName }}</span>
                  <span class="font-medium tabular-nums">{{ c.quantity.toFixed(3) }}</span>
                </div>
              </div>
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
              <UiCardTitle class="text-sm font-medium text-muted-foreground">Today's Sales</UiCardTitle>
              <ShoppingBag class="size-4 text-muted-foreground" />
            </UiCardHeader>
            <UiCardContent>
              <p class="text-2xl font-bold">{{ data.distributor.salesToday || 0 }}</p>
              <p class="text-xs text-muted-foreground">orders created today</p>
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
              <UiCardTitle class="text-sm font-medium text-muted-foreground">Financial Outstanding</UiCardTitle>
              <DollarSign class="size-4 text-muted-foreground" />
            </UiCardHeader>
            <UiCardContent>
              <p class="text-2xl font-bold" :class="(data.distributor.outstanding || 0) > 0 ? 'text-destructive' : 'text-green-600'">
                {{ (data.distributor.outstanding || 0).toFixed(2) }}
              </p>
              <p class="text-xs text-muted-foreground">{{ (data.distributor.outstanding || 0) > 0 ? 'balance due' : 'no outstanding dues' }}</p>
            </UiCardContent>
          </UiCard>
        </div>
      </template>

      <!-- GOODS IN TRANSIT WIDGET — ADMIN / ACCOUNTANT -->
      <template v-if="(isAdmin || isAccountant) && data.goodsInTransit">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle class="flex items-center gap-2">
              <Truck class="size-5" /> Goods in Transit / With Distributors
            </UiCardTitle>
            <UiCardDescription>Total inventory currently loaded on distributor trucks</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground">Total Bags in Transit</p>
                <p class="text-2xl font-bold">{{ (data.goodsInTransit.totalQuantity || 0).toFixed(3) }}</p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground">Active Distributors</p>
                <p class="text-2xl font-bold">{{ data.goodsInTransit.distributorCount || 0 }}</p>
              </div>
            </div>
            <div v-if="data.goodsInTransit.byDistributor?.length" class="space-y-3">
              <div v-for="d in data.goodsInTransit.byDistributor" :key="d.name" class="rounded-lg border p-3">
                <div class="flex items-center justify-between mb-1">
                  <p class="text-sm font-medium">{{ d.name }}</p>
                  <span class="text-sm font-bold tabular-nums">{{ d.totalQty.toFixed(3) }}</span>
                </div>
                <div class="space-y-0.5">
                  <div v-for="p in d.products" :key="p.name" class="flex justify-between text-xs text-muted-foreground pl-2">
                    <span>{{ p.name }}</span>
                    <span class="tabular-nums">{{ p.qty.toFixed(3) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <EmptyState title="No goods in transit" description="All distributor trucks are empty" />
            </div>
          </UiCardContent>
        </UiCard>
      </template>

      <!-- INVENTORY WIDGETS — STOREKEEPER / ADMIN -->
      <template v-if="canViewStock && data.inventory">
        <div class="grid gap-6 lg:grid-cols-2">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Low Stock Alerts</UiCardTitle>
              <UiCardDescription>Items with zero or negative stock</UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <div v-if="!data.inventory.lowStockAlerts?.items?.length" class="py-6">
                <EmptyState title="All stock levels healthy" description="No low stock alerts" />
              </div>
              <div v-else class="space-y-2">
                <div v-for="item in data.inventory.lowStockAlerts.items" :key="item.id" class="flex items-center justify-between rounded-lg border p-3">
                  <div class="flex items-center gap-2">
                    <AlertTriangle class="size-4 text-destructive shrink-0" />
                    <div>
                      <NuxtLink :to="`/products/${item.productId}`" class="text-sm font-medium hover:underline">
                        {{ item.productName }}
                      </NuxtLink>
                      <p class="text-xs text-muted-foreground">{{ item.warehouseName }}</p>
                    </div>
                  </div>
                  <UiBadge variant="destructive" class="text-xs">{{ Number(item.quantity).toFixed(3) }}</UiBadge>
                </div>
              </div>
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Recent Stock Movements</UiCardTitle>
              <UiCardDescription>Latest inventory transactions</UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <div v-if="!data.inventory.recentMovements?.length" class="py-6">
                <EmptyState title="No movements yet" description="Stock movements will appear here" />
              </div>
              <div v-else class="space-y-2">
                <div v-for="m in data.inventory.recentMovements" :key="m.id" class="flex items-center justify-between rounded-lg border p-3">
                  <div class="flex items-center gap-2">
                    <div :class="['size-8 flex items-center justify-center rounded-lg', m.quantity > 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20']">
                      <ArrowUp v-if="m.quantity > 0" class="size-4 text-green-600" />
                      <ArrowDown v-else class="size-4 text-red-600" />
                    </div>
                    <div>
                      <NuxtLink :to="`/products/${m.productId}`" class="text-sm font-medium hover:underline">{{ m.productName }}</NuxtLink>
                      <p class="text-xs text-muted-foreground">{{ m.warehouseName }} · {{ MOVEMENT_TYPES.find((mt: any) => mt.value === m.type)?.label || m.type }}</p>
                    </div>
                  </div>
                  <span class="text-sm font-medium tabular-nums" :class="m.quantity > 0 ? 'text-green-600' : 'text-red-600'">
                    {{ m.quantity > 0 ? '+' : '' }}{{ Number(m.quantity).toFixed(3) }}
                  </span>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>
      </template>

      <!-- FINANCIAL WIDGETS — ACCOUNTANT / ADMIN -->
      <template v-if="canViewFinancial && data.financials">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Financial Snapshot</UiCardTitle>
            <UiCardDescription>Revenue, costs, expenses, and profit overview</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><DollarSign class="size-3.5" /> Revenue</p>
                <p class="text-xl font-bold text-green-600">{{ data.financials.totalRevenue.toFixed(2) }}</p>
                <p class="text-xs text-muted-foreground">{{ data.financials.totalCollected.toFixed(2) }} collected</p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><TrendingDown class="size-3.5" /> COGS</p>
                <p class="text-xl font-bold text-amber-600">{{ data.financials.totalCogs.toFixed(2) }}</p>
                <p class="text-xs text-muted-foreground">Raw materials consumed</p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><Briefcase class="size-3.5" /> Labor Costs</p>
                <p class="text-xl font-bold text-orange-600">{{ data.financials.totalLaborCosts.toFixed(2) }}</p>
                <p class="text-xs text-muted-foreground">Worker daily wages</p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><Receipt class="size-3.5" /> Expenses</p>
                <p class="text-xl font-bold text-destructive">{{ data.financials.totalExpenses.toFixed(2) }}</p>
                <p class="text-xs text-muted-foreground">Operating expenses</p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><Scale class="size-3.5" /> Gross Profit</p>
                <p class="text-xl font-bold" :class="data.financials.grossProfit >= 0 ? 'text-green-600' : 'text-destructive'">
                  {{ data.financials.grossProfit.toFixed(2) }}
                </p>
                <p class="text-xs text-muted-foreground">Revenue − COGS</p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><Scale class="size-3.5" /> Net Profit</p>
                <p class="text-xl font-bold" :class="data.financials.netProfit >= 0 ? 'text-green-600' : 'text-destructive'">
                  {{ data.financials.netProfit.toFixed(2) }}
                </p>
                <p class="text-xs text-muted-foreground">Gross − Labor − Expenses</p>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <div class="grid gap-6 lg:grid-cols-2">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Recent Expenses</UiCardTitle>
              <UiCardDescription>Latest 5 expense entries</UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <div v-if="!data.financials.recentExpenses?.length" class="py-6">
                <EmptyState title="No expenses" description="No expenses recorded yet" />
              </div>
              <div v-else class="space-y-2">
                <div v-for="e in data.financials.recentExpenses" :key="e.id" class="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p class="text-sm font-medium">{{ e.title }}</p>
                    <p class="text-xs text-muted-foreground">{{ e.category }} · {{ new Date(e.date).toLocaleDateString() }}</p>
                  </div>
                  <span class="text-sm font-medium tabular-nums text-destructive">{{ Number(e.amount).toFixed(2) }}</span>
                </div>
              </div>
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Recent Invoices</UiCardTitle>
              <UiCardDescription>Latest 5 invoice totals</UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <div v-if="!data.financials.recentInvoices?.length" class="py-6">
                <EmptyState title="No invoices" description="No invoices created yet" />
              </div>
              <div v-else class="space-y-2">
                <div v-for="inv in data.financials.recentInvoices" :key="inv.id" class="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <NuxtLink :to="`/sales/invoices`" class="text-sm font-medium hover:underline">{{ inv.invoiceNumber }}</NuxtLink>
                    <p class="text-xs text-muted-foreground">{{ inv.customer?.name || '—' }} · {{ new Date(inv.createdAt).toLocaleDateString() }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium tabular-nums">{{ Number(inv.totalAmount).toFixed(2) }}</p>
                    <UiBadge :variant="inv.status === 'PAID' ? 'default' as any : inv.status === 'PARTIAL' ? 'secondary' as any : 'destructive' as any" class="text-[10px]">{{ inv.status }}</UiBadge>
                  </div>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>
      </template>
    </template>
  </div>
</template>
