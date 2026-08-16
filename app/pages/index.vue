<script setup lang="ts">
import {
  AlertTriangle, ArrowDown, ArrowUp, Briefcase, DollarSign, HandCoins,
  Package, RefreshCw, Scale, ShoppingBag, TrendingUp, Truck, Users,
  Wallet, Warehouse,
} from '@lucide/vue'
import type { Component } from 'vue'
import { MOVEMENT_TYPES } from '@/modules/stock/type'
import PageHeader from '~/components/shared/PageHeader.vue'
import SalesOverviewChart from '@/modules/sales/components/SalesOverviewChart.vue'
import SalesByProductChart from '@/modules/sales/components/SalesByProductChart.vue'
import InventoryDistributionChart from '@/modules/stock/components/InventoryDistributionChart.vue'
import FinancialOverviewChart from '@/modules/accounting/components/FinancialOverviewChart.vue'
import RecentOrdersCard from '@/modules/sales/components/RecentOrdersCard.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const authStore = useAuthStore()
const userRole = computed(() => authStore.userRole)
const { can } = usePermissions()

const isStorekeeper = computed(() => userRole.value === 'STOREKEEPER')
const isAccountant = computed(() => userRole.value === 'ACCOUNTANT')
const isAdmin = computed(() => userRole.value === 'ADMIN' || userRole.value === 'MANAGER')
const isDistributor = computed(() => userRole.value === 'DISTRIBUTOR')
const canViewFinancial = computed(() => isAdmin.value || isAccountant.value)
const canViewStock = computed(() => isAdmin.value || isStorekeeper.value)
const showSalesCharts = computed(() => can('SALES', 'READ'))
const showStockCharts = computed(() => can('INVENTORY', 'READ'))
const showAccountingCharts = computed(() => can('ACCOUNTING', 'READ'))
const showGoodsInTransit = computed(() => (isAdmin.value || isAccountant.value) && !!data.value?.goodsInTransit)

const loading = ref(true)
const data = ref<any>(null)

const fmtMoney = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n || 0)
const fmtQty = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }).format(n || 0)
const fmtCount = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n || 0)

interface KpiItem {
  label: string
  value: string
  icon: Component
  hint?: string
  negative?: boolean
}

interface CountItem {
  label: string
  value: string
  icon: Component
}

function invoiceStatusVariant(status: string) {
  const map: Record<string, 'default' | 'secondary' | 'destructive'> = {
    PAID: 'default',
    PARTIAL: 'secondary',
    CANCELLED: 'destructive',
  }
  return map[status] || 'secondary'
}

const kpis = computed<KpiItem[]>(() => {
  const d = data.value
  if (!d) return []

  if (isDistributor.value && d.distributor) {
    return [
      { label: 'My Custody', value: fmtQty(d.distributor.totalCustody), icon: Truck, hint: 'bags on truck' },
      { label: "Today's Sales", value: fmtCount(d.distributor.salesToday), icon: ShoppingBag, hint: 'orders created today' },
      {
        label: 'Outstanding', value: fmtMoney(d.distributor.outstanding), icon: DollarSign,
        hint: d.distributor.outstanding > 0 ? 'balance due' : 'no outstanding dues',
        negative: d.distributor.outstanding > 0,
      },
      { label: 'Cash Collected', value: fmtMoney(d.distributor.cashCollected), icon: Wallet, hint: `${fmtMoney(d.distributor.cashConfirmed)} confirmed` },
    ]
  }

  const items: KpiItem[] = []

  if (canViewFinancial.value && d.financials) {
    const f = d.financials
    items.push({ label: 'Total Revenue', value: fmtMoney(f.totalRevenue), icon: TrendingUp, hint: 'total invoiced' })
    items.push({ label: 'Net Profit', value: fmtMoney(f.netProfit), icon: Scale, hint: 'after costs & expenses', negative: f.netProfit < 0 })
  }

  if (canViewStock.value && d.inventory) {
    items.push({
      label: 'Stock', value: fmtQty(d.inventory.totalStockQuantity), icon: Package,
      hint: `${d.inventory.warehouseCount || 0} warehouses`,
    })
  }

  if (isStorekeeper.value && d.inventory) {
    items.push({
      label: 'Low Stock', value: fmtCount(d.inventory.lowStockAlerts?.count || 0), icon: AlertTriangle,
      hint: 'items to restock', negative: (d.inventory.lowStockAlerts?.count || 0) > 0,
    })
  }

  if (isStorekeeper.value && d.goodsInTransit) {
    items.push({
      label: 'Goods in Transit', value: fmtQty(d.goodsInTransit.totalQuantity), icon: Truck,
      hint: `${d.goodsInTransit.distributorCount || 0} distributors`,
    })
  }

  if (isStorekeeper.value) {
    items.push({ label: 'Warehouses', value: fmtCount(d.inventory?.warehouseCount || 0), icon: Warehouse, hint: 'operational sites' })
  }

  if (isAccountant.value && d.financials) {
    items.push({ label: 'Cash & Bank', value: fmtMoney(d.financials.companyCash), icon: Wallet, hint: 'money with the company' })
  }

  if (canViewFinancial.value && d.financials) {
    const outstanding = (d.financials.totalRevenue || 0) - (d.financials.totalCollected || 0)
    items.push({ label: 'Outstanding', value: fmtMoney(outstanding), icon: HandCoins, hint: 'unpaid invoices', negative: outstanding > 0 })
  }

  return items
})

const cashRows = computed(() => {
  const dist = data.value?.distributor
  if (!dist) return []
  return [
    { label: 'Cash Collected', value: fmtMoney(dist.cashCollected) },
    { label: 'Cash Confirmed', value: fmtMoney(dist.cashConfirmed) },
    { label: 'Cash Custody', value: fmtMoney(dist.cashCustody) },
  ]
})

const counts = computed<CountItem[]>(() => {
  const c = data.value?.counts
  if (!c) return []
  return [
    { label: 'Products', value: fmtCount(c.totalProducts), icon: ShoppingBag },
    { label: 'Customers', value: fmtCount(c.totalCustomers), icon: Users },
    { label: 'Suppliers', value: fmtCount(c.totalSuppliers), icon: Truck },
    { label: 'Workers', value: fmtCount(c.totalWorkers), icon: Briefcase },
  ]
})

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
        <UiButton variant="outline" size="sm" @click="fetchDashboard">
          <RefreshCw class="size-4" /> Refresh
        </UiButton>
      </template>
    </PageHeader>

    <div v-if="loading" class="flex justify-center py-12">
      <LoadingState />
    </div>

    <template v-else-if="data">
      <!-- ===== KPI ===== -->
      <div v-if="kpis.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UiCard
          v-for="kpi in kpis"
          :key="kpi.label"
          class="shadow-sm transition-shadow hover:shadow-md"
        >
          <UiCardContent class="flex items-start justify-between gap-4 p-5">
            <div class="min-w-0">
              <p class="truncate text-sm text-muted-foreground">{{ kpi.label }}</p>
              <p
                class="mt-2 truncate text-2xl font-semibold tracking-tight tabular-nums"
                :class="kpi.negative ? 'text-destructive' : 'text-foreground'"
              >
                {{ kpi.value }}
              </p>
              <p v-if="kpi.hint" class="mt-1 truncate text-xs text-muted-foreground">{{ kpi.hint }}</p>
            </div>
            <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <component :is="kpi.icon" class="size-5 text-primary" />
            </div>
          </UiCardContent>
        </UiCard>
      </div>

      <!-- ===== DISTRIBUTOR DETAIL ===== -->
      <template v-if="isDistributor && data.distributor">
        <div class="grid gap-6 lg:grid-cols-2">
          <UiCard class="shadow-sm transition-shadow hover:shadow-md">
            <UiCardHeader>
              <UiCardTitle>My Custody</UiCardTitle>
              <UiCardDescription>Products currently loaded on your truck</UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <div v-if="!data.distributor.custodies?.length" class="py-4">
                <EmptyState title="No custody" description="Your truck is empty" />
              </div>
              <div v-else class="space-y-2">
                <div
                  v-for="c in data.distributor.custodies"
                  :key="c.productId"
                  class="flex items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <span class="text-sm font-medium">{{ c.productName }}</span>
                  <span class="text-sm font-medium tabular-nums">{{ fmtQty(c.quantity) }}</span>
                </div>
              </div>
            </UiCardContent>
          </UiCard>

          <UiCard class="shadow-sm transition-shadow hover:shadow-md">
            <UiCardHeader>
              <UiCardTitle>Cash & Settlements</UiCardTitle>
              <UiCardDescription>Collected, confirmed, and held funds</UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <div class="space-y-2">
                <div
                  v-for="row in cashRows"
                  :key="row.label"
                  class="flex items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <span class="text-sm text-muted-foreground">{{ row.label }}</span>
                  <span class="text-sm font-medium tabular-nums">{{ row.value }}</span>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>
      </template>

      <!-- ===== STANDARD DASHBOARD ===== -->
      <template v-else>
        <!-- Main analytics -->
        <div v-if="showSalesCharts || showStockCharts" class="grid gap-6 lg:grid-cols-12">
          <div v-if="showSalesCharts" :class="showStockCharts ? 'lg:col-span-8' : 'lg:col-span-12'">
            <SalesOverviewChart />
          </div>
          <div v-if="showStockCharts" :class="showSalesCharts ? 'lg:col-span-4' : 'lg:col-span-12'">
            <InventoryDistributionChart />
          </div>
        </div>

        <!-- Secondary analytics -->
        <div v-if="showSalesCharts || showAccountingCharts" class="grid gap-6 lg:grid-cols-2">
          <div v-if="showSalesCharts" :class="showAccountingCharts ? '' : 'lg:col-span-2'">
            <SalesByProductChart />
          </div>
          <div v-if="showAccountingCharts" :class="showSalesCharts ? '' : 'lg:col-span-2'">
            <FinancialOverviewChart />
          </div>
        </div>

        <!-- Operational -->
        <div v-if="showSalesCharts || (canViewStock && data.inventory)" class="grid gap-6 lg:grid-cols-2">
          <div v-if="showSalesCharts" :class="canViewStock && data.inventory ? '' : 'lg:col-span-2'">
            <RecentOrdersCard class="h-full" />
          </div>
          <div v-if="canViewStock && data.inventory" :class="showSalesCharts ? '' : 'lg:col-span-2'">
            <UiCard class="h-full shadow-sm transition-shadow hover:shadow-md">
              <UiCardHeader class="flex flex-row items-start justify-between gap-4">
                <div>
                  <UiCardTitle>Low Stock Alerts</UiCardTitle>
                  <UiCardDescription>Items with zero or negative stock</UiCardDescription>
                </div>
                <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                  <AlertTriangle class="size-4 text-destructive" />
                </div>
              </UiCardHeader>
              <UiCardContent>
                <div v-if="!data.inventory.lowStockAlerts?.items?.length" class="py-4">
                  <EmptyState title="All stock levels healthy" description="No low stock alerts" />
                </div>
                <div v-else class="space-y-2">
                  <div
                    v-for="item in data.inventory.lowStockAlerts.items"
                    :key="item.id"
                    class="flex items-center justify-between gap-3 rounded-lg border p-3"
                  >
                    <div class="flex min-w-0 items-center gap-3">
                      <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                        <AlertTriangle class="size-4 text-destructive" />
                      </div>
                      <div class="min-w-0">
                        <NuxtLink
                          :to="`/products/${item.productId}`"
                          class="block truncate text-sm font-medium hover:underline"
                        >
                          {{ item.productName }}
                        </NuxtLink>
                        <p class="truncate text-xs text-muted-foreground">{{ item.warehouseName }}</p>
                      </div>
                    </div>
                    <UiBadge variant="destructive" class="shrink-0">{{ fmtQty(item.quantity) }}</UiBadge>
                  </div>
                </div>
              </UiCardContent>
            </UiCard>
          </div>
        </div>

        <!-- Activity -->
        <div v-if="(canViewStock && data.inventory) || showGoodsInTransit" class="grid gap-6 lg:grid-cols-2">
          <div v-if="canViewStock && data.inventory" :class="showGoodsInTransit ? '' : 'lg:col-span-2'">
            <UiCard class="h-full shadow-sm transition-shadow hover:shadow-md">
              <UiCardHeader class="flex flex-row items-start justify-between gap-4">
                <div>
                  <UiCardTitle>Recent Stock Movements</UiCardTitle>
                  <UiCardDescription>Latest inventory transactions</UiCardDescription>
                </div>
                <UiButton as="NuxtLink" to="/stock/movements" variant="ghost" size="sm" class="h-7 px-2 text-xs text-muted-foreground">
                  View all
                </UiButton>
              </UiCardHeader>
              <UiCardContent>
                <div v-if="!data.inventory.recentMovements?.length" class="py-4">
                  <EmptyState title="No movements yet" description="Stock movements will appear here" />
                </div>
                <div v-else class="space-y-2">
                  <div
                    v-for="m in data.inventory.recentMovements"
                    :key="m.id"
                    class="flex items-center justify-between gap-3 rounded-lg border p-3"
                  >
                    <div class="flex min-w-0 items-center gap-3">
                      <div
                        class="flex size-8 shrink-0 items-center justify-center rounded-lg"
                        :class="m.quantity > 0 ? 'bg-primary/10' : 'bg-destructive/10'"
                      >
                        <ArrowUp v-if="m.quantity > 0" class="size-4 text-primary" />
                        <ArrowDown v-else class="size-4 text-destructive" />
                      </div>
                      <div class="min-w-0">
                        <NuxtLink
                          :to="`/products/${m.productId}`"
                          class="block truncate text-sm font-medium hover:underline"
                        >
                          {{ m.productName }}
                        </NuxtLink>
                        <p class="truncate text-xs text-muted-foreground">
                          {{ m.warehouseName }} · {{ MOVEMENT_TYPES.find((mt: any) => mt.value === m.type)?.label || m.type }}
                        </p>
                      </div>
                    </div>
                    <span
                      class="shrink-0 text-sm font-medium tabular-nums"
                      :class="m.quantity > 0 ? 'text-primary' : 'text-destructive'"
                    >
                      {{ m.quantity > 0 ? '+' : '' }}{{ fmtQty(m.quantity) }}
                    </span>
                  </div>
                </div>
              </UiCardContent>
            </UiCard>
          </div>

          <div v-if="showGoodsInTransit" :class="canViewStock && data.inventory ? '' : 'lg:col-span-2'">
            <UiCard class="h-full shadow-sm transition-shadow hover:shadow-md">
              <UiCardHeader class="flex flex-row items-start justify-between gap-4">
                <div>
                  <UiCardTitle>Goods in Transit</UiCardTitle>
                  <UiCardDescription>Inventory loaded on distributor trucks</UiCardDescription>
                </div>
                <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Truck class="size-4 text-primary" />
                </div>
              </UiCardHeader>
              <UiCardContent>
                <div class="mb-3 flex items-center justify-between gap-3 rounded-lg border p-3">
                  <div>
                    <p class="text-xs text-muted-foreground">Total in transit</p>
                    <p class="text-lg font-semibold tabular-nums">{{ fmtQty(data.goodsInTransit.totalQuantity) }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-muted-foreground">Active distributors</p>
                    <p class="text-lg font-semibold tabular-nums">{{ data.goodsInTransit.distributorCount }}</p>
                  </div>
                </div>
                <div v-if="data.goodsInTransit.byDistributor?.length" class="space-y-2">
                  <div v-for="d in data.goodsInTransit.byDistributor" :key="d.name" class="rounded-lg border p-3">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium">{{ d.name }}</p>
                      <span class="text-sm font-medium tabular-nums">{{ fmtQty(d.totalQty) }}</span>
                    </div>
                    <div class="mt-1 space-y-0.5">
                      <div
                        v-for="p in d.products"
                        :key="p.name"
                        class="flex justify-between pl-2 text-xs text-muted-foreground"
                      >
                        <span>{{ p.name }}</span>
                        <span class="tabular-nums">{{ fmtQty(p.qty) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="py-4">
                  <EmptyState title="No goods in transit" description="All distributor trucks are empty" />
                </div>
              </UiCardContent>
            </UiCard>
          </div>
        </div>

        <!-- Finance -->
        <div v-if="canViewFinancial && data.financials" class="grid gap-6 lg:grid-cols-2">
          <UiCard class="shadow-sm transition-shadow hover:shadow-md">
            <UiCardHeader class="flex flex-row items-start justify-between gap-4">
              <div>
                <UiCardTitle>Recent Invoices</UiCardTitle>
                <UiCardDescription>Latest 5 invoice totals</UiCardDescription>
              </div>
              <UiButton as="NuxtLink" to="/sales/invoices" variant="ghost" size="sm" class="h-7 px-2 text-xs text-muted-foreground">
                View all
              </UiButton>
            </UiCardHeader>
            <UiCardContent>
              <div v-if="!data.financials.recentInvoices?.length" class="py-4">
                <EmptyState title="No invoices" description="No invoices created yet" />
              </div>
              <div v-else class="space-y-2">
                <div
                  v-for="inv in data.financials.recentInvoices"
                  :key="inv.id"
                  class="flex items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <div class="min-w-0">
                    <NuxtLink to="/sales/invoices" class="block truncate text-sm font-medium hover:underline">
                      {{ inv.invoiceNumber }}
                    </NuxtLink>
                    <p class="truncate text-xs text-muted-foreground">
                      {{ inv.customer?.name || '—' }} · {{ new Date(inv.createdAt).toLocaleDateString() }}
                    </p>
                  </div>
                  <div class="flex shrink-0 items-center gap-2">
                    <span class="text-sm font-medium tabular-nums">{{ fmtMoney(inv.totalAmount) }}</span>
                    <UiBadge :variant="invoiceStatusVariant(inv.status)">{{ inv.status }}</UiBadge>
                  </div>
                </div>
              </div>
            </UiCardContent>
          </UiCard>

          <UiCard class="shadow-sm transition-shadow hover:shadow-md">
            <UiCardHeader>
              <UiCardTitle>Recent Expenses</UiCardTitle>
              <UiCardDescription>Latest 5 expense entries</UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <div v-if="!data.financials.recentExpenses?.length" class="py-4">
                <EmptyState title="No expenses" description="No expenses recorded yet" />
              </div>
              <div v-else class="space-y-2">
                <div
                  v-for="e in data.financials.recentExpenses"
                  :key="e.id"
                  class="flex items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <div class="min-w-0">
                    <p class="truncate text-sm font-medium">{{ e.title }}</p>
                    <p class="truncate text-xs text-muted-foreground">
                      {{ e.category }} · {{ new Date(e.date).toLocaleDateString() }}
                    </p>
                  </div>
                  <span class="shrink-0 text-sm font-medium tabular-nums text-destructive">{{ fmtMoney(e.amount) }}</span>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        <!-- Counts -->
        <div v-if="counts.length" class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            v-for="c in counts"
            :key="c.label"
            class="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm"
          >
            <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <component :is="c.icon" class="size-4 text-muted-foreground" />
            </div>
            <div class="min-w-0">
              <p class="text-lg font-semibold leading-none tabular-nums">{{ c.value }}</p>
              <p class="mt-1 truncate text-xs text-muted-foreground">{{ c.label }}</p>
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>