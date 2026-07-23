<script setup lang="ts">
import {
  Package,
  ClipboardList,
  DollarSign,
  TrendingUp,
  Receipt,
  PlusCircle,
  CreditCard,
  Eye,
} from '@lucide/vue'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()
const todaySales = ref(0)
const outstandingCollections = ref(0)

async function loadDashboard() {
  await Promise.all([
    store.fetchCustody(),
    store.fetchCashOnHand(),
    store.fetchOrders({ status: 'ASSIGNED,ACCEPTED,OUT_FOR_DELIVERY', limit: 5 }),
  ])
}

onMounted(loadDashboard)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p class="text-sm text-muted-foreground">Welcome back, {{ useAuthStore().user?.name }}</p>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">My Stock</UiCardTitle>
          <Package class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ store.custodyTotalItems.toFixed(1) }}</p>
          <p class="text-xs text-muted-foreground">{{ store.custodies.length }} products</p>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Cash On Hand</UiCardTitle>
          <DollarSign class="size-4 text-green-500" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold text-green-600">{{ store.cashOnHand.toFixed(2) }}</p>
          <p class="text-xs text-muted-foreground">Available cash</p>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Assigned Orders</UiCardTitle>
          <ClipboardList class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ store.orders.length }}</p>
          <p class="text-xs text-muted-foreground">Pending delivery</p>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Today's Sales</UiCardTitle>
          <TrendingUp class="size-4 text-blue-500" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold text-blue-600">{{ todaySales.toFixed(2) }}</p>
          <p class="text-xs text-muted-foreground">Total invoiced today</p>
        </UiCardContent>
      </UiCard>
    </div>

    <div v-if="store.orders.length > 0">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle class="text-base">Active Orders</UiCardTitle>
          <UiCardDescription>Orders assigned to you that need delivery</UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="space-y-3">
          <div
            v-for="order in store.orders.slice(0, 5)"
            :key="order.id"
            class="flex items-center justify-between rounded-lg border p-3"
          >
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium truncate">{{ order.orderNumber }}</p>
              <p class="text-xs text-muted-foreground truncate">{{ order.customer?.name }}</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <UiBadge variant="secondary" class="text-[10px]">{{ order.status }}</UiBadge>
              <p class="text-sm font-semibold">{{ order.totalAmount.toFixed(2) }}</p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <UiCard class="cursor-pointer transition-colors hover:bg-accent/50" @click="navigateTo('/distributor/customers')">
        <UiCardContent class="flex flex-col items-center gap-2 py-6">
          <PlusCircle class="size-8 text-primary" />
          <p class="text-sm font-medium">New Sale</p>
          <p class="text-xs text-muted-foreground text-center">Create a direct invoice</p>
        </UiCardContent>
      </UiCard>

      <UiCard class="cursor-pointer transition-colors hover:bg-accent/50" @click="navigateTo('/distributor/payments')">
        <UiCardContent class="flex flex-col items-center gap-2 py-6">
          <CreditCard class="size-8 text-primary" />
          <p class="text-sm font-medium">Collect Payment</p>
          <p class="text-xs text-muted-foreground text-center">Record a payment</p>
        </UiCardContent>
      </UiCard>

      <UiCard class="cursor-pointer transition-colors hover:bg-accent/50" @click="navigateTo('/distributor/orders')">
        <UiCardContent class="flex flex-col items-center gap-2 py-6">
          <Eye class="size-8 text-primary" />
          <p class="text-sm font-medium">View Orders</p>
          <p class="text-xs text-muted-foreground text-center">See assigned orders</p>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
