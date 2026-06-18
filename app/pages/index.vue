<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Dashboard" description="Welcome back to Al Nour Management System">
      <template #actions>
        <UiButton>Download Report</UiButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Products</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">1,284</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Active Orders</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">48</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Warehouse Stock</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">256.8 t</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Today's Production</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">12.4 t</p>
        </UiCardContent>
      </UiCard>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Recent Orders</UiCardTitle>
          <UiCardDescription>Latest 5 orders from today</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <EmptyState description="No recent orders to display." />
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Stock Alerts</UiCardTitle>
          <UiCardDescription>Items below minimum threshold</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <EmptyState description="All stock levels are healthy." />
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
