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
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/sales/invoices')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader title="Payments" description="View all payments on the invoices page" />
    </div>

    <UiCard>
      <UiCardContent class="py-12">
        <EmptyState
          title="Payments are tracked per invoice"
          description="Go to the invoices page to view and record payments for each invoice"
          action="View Invoices"
          @action="navigateTo('/sales/invoices')"
        />
      </UiCardContent>
    </UiCard>
  </div>
</template>
