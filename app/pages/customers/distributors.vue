<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/customers')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader title="Distributors" description="Distributor management" />
    </div>

    <UiCard>
      <UiCardContent class="py-12">
        <EmptyState
          title="Distributor module coming soon"
          description="Distributors are managed alongside customers. This page will track distributor-specific data."
          action="View Customers"
          @action="navigateTo('/customers')"
        />
      </UiCardContent>
    </UiCard>
  </div>
</template>
