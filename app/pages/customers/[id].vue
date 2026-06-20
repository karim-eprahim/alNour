<script setup lang="ts">
import { h } from 'vue'
import { ArrowLeft, FileText, Phone, MapPin } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { UiBadge } from '#components'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const route = useRoute()
const customersStore = useCustomersStore()

const customer = computed(() => customersStore.currentCustomer)

const ledgerColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, new Date(row.original.createdAt).toLocaleDateString()),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.description || '—'),
  },
  {
    id: 'debit',
    header: 'Debit',
    cell: ({ row }) => {
      const amt = row.original.type === 'DEBIT' ? Number(row.original.amount).toFixed(2) : '—'
      return h('span', { class: 'tabular-nums text-destructive block' }, amt)
    },
  },
  {
    id: 'credit',
    header: 'Credit',
    cell: ({ row }) => {
      const amt = row.original.type === 'CREDIT' ? Number(row.original.amount).toFixed(2) : '—'
      return h('span', { class: 'tabular-nums text-green-600 block' }, amt)
    },
  },
]

onMounted(async () => {
  await customersStore.fetchCustomer(route.params.id as string)
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/customers')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader v-if="customer" :title="customer.name" description="Customer details">
        <template #actions>
          <UiBadge :class="(customer.balance || 0) > 0 ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'">
            Balance: {{ (customer.balance || 0).toFixed(2) }}
          </UiBadge>
        </template>
      </PageHeader>
    </div>

    <template v-if="customer">
      <div class="grid gap-4 sm:grid-cols-3">
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Phone</UiCardTitle>
            <Phone class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-lg font-medium">{{ customer.phone || '—' }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Address</UiCardTitle>
            <MapPin class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-lg font-medium">{{ customer.address || '—' }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Orders / Invoices</UiCardTitle>
            <FileText class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-lg font-medium">{{ customer.salesOrders?.length || 0 }} / {{ customer.invoices?.length || 0 }}</p>
          </UiCardContent>
        </UiCard>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Ledger Entries</UiCardTitle>
          <UiCardDescription>Financial transactions history</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <AppTable
            :data="customer.ledgerEntries || []"
            :columns="ledgerColumns"
            :show-search="false"
            :show-column-toggle="false"
            :show-pagination="false"
          >
            <template #empty>
              <EmptyState title="No transactions" description="No ledger entries recorded" />
            </template>
          </AppTable>
        </UiCardContent>
      </UiCard>
    </template>
  </div>
</template>
