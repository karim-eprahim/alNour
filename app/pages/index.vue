<script setup lang="ts">
import {
  Package, Warehouse, AlertTriangle, ArrowUp, ArrowDown, Factory,
  DollarSign, TrendingUp, TrendingDown, Users, Briefcase,
  ShoppingBag, Receipt, Wallet, RefreshCw, Scale,
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
const canViewFinancial = computed(() => isAdmin.value || isAccountant.value)
const canViewStock = computed(() => isAdmin.value || isStorekeeper.value)

const loading = ref(true)
const dashboardData = ref<any>(null)

function statusVariant(s: string) {
  const map: Record<string, string> = { PENDING: 'secondary', PROCESSING: 'warning', COMPLETED: 'success', CANCELLED: 'destructive' }
  return (map[s] || 'secondary') as any
}

async function fetchDashboard() {
  loading.value = true
  try {
    dashboardData.value = await $fetch('/api/reports/dashboard')
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

    <template v-else-if="dashboardData">
      <!-- Top-level KPI cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UiCard v-if="canViewStock">
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Stock Items</UiCardTitle>
            <Package class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ dashboardData.stockSummary?.totalStockItems || 0 }}</p>
            <p class="text-xs text-muted-foreground">{{ (dashboardData.stockSummary?.totalQuantity || 0).toFixed(1) }} total qty</p>
          </UiCardContent>
        </UiCard>

        <UiCard v-if="canViewFinancial">
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Revenue</UiCardTitle>
            <TrendingUp class="size-4 text-green-500" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold text-green-600">{{ (dashboardData.financialSummary?.totalRevenue || 0).toFixed(2) }}</p>
            <p class="text-xs text-muted-foreground">{{ (dashboardData.financialSummary?.totalCollected || 0).toFixed(2) }} collected</p>
          </UiCardContent>
        </UiCard>

        <UiCard v-if="canViewFinancial">
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Expenses</UiCardTitle>
            <TrendingDown class="size-4 text-destructive" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold text-destructive">{{ (dashboardData.totalExpenses || 0).toFixed(2) }}</p>
            <p class="text-xs text-muted-foreground">Labor: {{ (dashboardData.totalLaborCost || 0).toFixed(2) }}</p>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Products</UiCardTitle>
            <ShoppingBag class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ dashboardData.totalProducts || 0 }}</p>
          </UiCardContent>
        </UiCard>

        <UiCard v-if="canViewFinancial">
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Active Workers</UiCardTitle>
            <Briefcase class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ dashboardData.activeWorkers || 0 }}</p>
            <p class="text-xs text-muted-foreground">Total: {{ dashboardData.totalWorkers || 0 }}</p>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Production Batches</UiCardTitle>
            <Factory class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ dashboardData.productionSummary?.batchStatusCounts?.reduce((s: number, b: any) => s + b._count, 0) || 0 }}</p>
            <p class="text-xs text-muted-foreground">
              <span v-for="b in dashboardData.productionSummary?.batchStatusCounts || []" :key="b.status" class="mr-2">
                {{ b.status }}: {{ b._count }}
              </span>
            </p>
          </UiCardContent>
        </UiCard>
      </div>

      <!-- Stock widgets (STOREKEEPER / ADMIN) -->
      <template v-if="canViewStock">
        <div class="grid gap-6 lg:grid-cols-2">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Low Stock Alerts</UiCardTitle>
              <UiCardDescription>Items with zero or negative stock</UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <div v-if="!dashboardData.stockSummary?.lowStockItems?.length" class="py-6">
                <EmptyState title="All stock levels healthy" description="No low stock alerts" />
              </div>
              <div v-else class="space-y-2">
                <div v-for="item in dashboardData.stockSummary.lowStockItems" :key="item.id" class="flex items-center justify-between rounded-lg border p-3">
                  <div class="flex items-center gap-2">
                    <AlertTriangle class="size-4 text-destructive shrink-0" />
                    <div>
                      <NuxtLink :to="`/products/${item.productId}`" class="text-sm font-medium hover:underline">
                        {{ item.product?.name }}
                      </NuxtLink>
                      <p class="text-xs text-muted-foreground">{{ item.warehouse?.name }}</p>
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
              <div v-if="!dashboardData.recentMovements?.length" class="py-6">
                <EmptyState title="No movements yet" description="Stock movements will appear here" />
              </div>
              <div v-else class="space-y-2">
                <div v-for="m in dashboardData.recentMovements" :key="m.id" class="flex items-center justify-between rounded-lg border p-3">
                  <div class="flex items-center gap-2">
                    <div :class="['size-8 flex items-center justify-center rounded-lg', Number(m.quantity) > 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20']">
                      <ArrowUp v-if="Number(m.quantity) > 0" class="size-4 text-green-600" />
                      <ArrowDown v-else class="size-4 text-red-600" />
                    </div>
                    <div>
                      <NuxtLink :to="`/products/${m.productId}`" class="text-sm font-medium hover:underline">{{ m.product?.name }}</NuxtLink>
                      <p class="text-xs text-muted-foreground">{{ m.warehouse?.name }} · {{ MOVEMENT_TYPES.find((mt: any) => mt.value === m.type)?.label || m.type }}</p>
                    </div>
                  </div>
                  <span class="text-sm font-medium tabular-nums" :class="Number(m.quantity) > 0 ? 'text-green-600' : 'text-red-600'">
                    {{ Number(m.quantity) > 0 ? '+' : '' }}{{ Number(m.quantity).toFixed(3) }}
                  </span>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Warehouse Overview</UiCardTitle>
            <UiCardDescription>Stock distribution across warehouses</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div v-if="!dashboardData.warehouses?.length" class="py-6">
              <EmptyState title="No warehouses" description="Create warehouses first" />
            </div>
            <div v-else class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div v-for="w in dashboardData.warehouses" :key="w.id" class="flex items-center gap-3 rounded-lg border p-3">
                <Warehouse class="size-5 text-muted-foreground shrink-0" />
                <div>
                  <NuxtLink :to="`/warehouses/${w.id}`" class="text-sm font-medium hover:underline">{{ w.name }}</NuxtLink>
                  <p class="text-xs text-muted-foreground">{{ w._count?.stocks || 0 }} products</p>
                </div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </template>

      <!-- Financial widgets (ACCOUNTANT / ADMIN) -->
      <template v-if="canViewFinancial">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Financial Snapshot</UiCardTitle>
            <UiCardDescription>Revenue, expenses, and costs overview</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><DollarSign class="size-3.5" /> Revenue</p>
                <p class="text-xl font-bold text-green-600">{{ (dashboardData.financialSummary?.totalRevenue || 0).toFixed(2) }}</p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><Receipt class="size-3.5" /> Collected</p>
                <p class="text-xl font-bold">{{ (dashboardData.financialSummary?.totalCollected || 0).toFixed(2) }}</p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><TrendingDown class="size-3.5" /> Expenses</p>
                <p class="text-xl font-bold text-destructive">{{ (dashboardData.totalExpenses || 0).toFixed(2) }}</p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><Briefcase class="size-3.5" /> Labor Cost</p>
                <p class="text-xl font-bold text-orange-600">{{ (dashboardData.totalLaborCost || 0).toFixed(2) }}</p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><Scale class="size-3.5" /> Gross Profit</p>
                <p class="text-xl font-bold" :class="((dashboardData.financialSummary?.totalRevenue || 0) - (dashboardData.totalExpenses || 0)) >= 0 ? 'text-green-600' : 'text-destructive'">
                  {{ ((dashboardData.financialSummary?.totalRevenue || 0) - (dashboardData.totalExpenses || 0) - (dashboardData.totalLaborCost || 0)).toFixed(2) }}
                </p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><Users class="size-3.5" /> Customers</p>
                <p class="text-xl font-bold">{{ dashboardData.customerCount || 0 }}</p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><Truck class="size-3.5" /> Suppliers</p>
                <p class="text-xl font-bold">{{ dashboardData.supplierCount || 0 }}</p>
              </div>
              <div class="rounded-lg border p-4">
                <p class="text-sm text-muted-foreground flex items-center gap-1"><Factory class="size-3.5" /> Today's Prod. Cost</p>
                <p class="text-xl font-bold">{{ (dashboardData.todayProductionCost || 0).toFixed(2) }}</p>
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </template>

      <!-- Production batches (visible to all) -->
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Recent Production Batches</UiCardTitle>
          <UiCardDescription>Latest batch activity</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div v-if="!dashboardData.productionSummary?.recentBatches?.length" class="py-6">
            <EmptyState title="No batches yet" description="Create your first production batch" />
          </div>
          <div v-else class="space-y-2">
            <div v-for="b in dashboardData.productionSummary.recentBatches" :key="b.id" class="flex items-center justify-between rounded-lg border p-3">
              <div class="flex items-center gap-3">
                <Factory class="size-5 text-muted-foreground shrink-0" />
                <div>
                  <NuxtLink :to="`/production/${b.id}`" class="text-sm font-medium hover:underline">{{ b.batchNumber }}</NuxtLink>
                  <p class="text-xs text-muted-foreground">{{ b.warehouse?.name }} · {{ new Date(b.createdAt).toLocaleDateString() }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs text-muted-foreground">{{ b._count?.outputs || 0 }} outputs</span>
                <UiBadge :variant="statusVariant(b.status)" class="text-xs">{{ b.status }}</UiBadge>
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </template>
  </div>
</template>
