<script setup lang="ts">
import { h } from 'vue'
import { Eye, HandCoins } from '@lucide/vue'
import { toast } from 'vue-sonner'
import type { ColumnDef } from '@tanstack/vue-table'
import { UiBadge, UiButton, NuxtLink } from '#components'
import { fetchDistributorsLookupApi } from '@/modules/customers/api'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'SALES', action: 'READ' },
})

interface SettlementRow {
  id: string
  settlementNumber: string
  amount: number
  paymentMethod: string
  status: string
  submittedAt: string
  confirmedAt: string | null
  rejectionReason?: string | null
  distributor?: { id: string; name: string } | null
}

const settlements = ref<SettlementRow[]>([])
const total = ref(0)
const loading = ref(false)

const statusFilter = ref('__all__')
const distributorFilter = ref('__all__')
const paymentMethodFilter = ref('__all__')
const dateFrom = ref('')
const dateTo = ref('')
const page = ref(1)
const limit = 20

function statusVariant(s: string) {
  const map: Record<string, string> = { SUBMITTED: 'warning', CONFIRMED: 'success', REJECTED: 'destructive' }
  return (map[s] || 'secondary') as any
}

const columns: ColumnDef<SettlementRow>[] = [
  {
    accessorKey: 'settlementNumber',
    header: 'Settlement #',
    cell: ({ row }) => h(NuxtLink, { to: `/sales/settlements/${row.original.id}`, class: 'font-medium hover:underline' }, row.original.settlementNumber),
  },
  {
    accessorKey: 'distributor.name',
    header: 'Distributor',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.distributor?.name || '—'),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.amount).toFixed(2)),
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.paymentMethod.replace('_', ' ')),
  },
  {
    accessorKey: 'submittedAt',
    header: 'Submitted At',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, new Date(row.original.submittedAt).toLocaleDateString()),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(UiBadge, { variant: statusVariant(row.original.status), class: 'text-xs' }, row.original.status),
  },
  {
    accessorKey: 'confirmedAt',
    header: 'Confirmed At',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, row.original.confirmedAt ? new Date(row.original.confirmedAt).toLocaleDateString() : '—'),
  },
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    cell: ({ row }) => h(UiButton, { variant: 'ghost', size: 'icon-xs', onClick: () => navigateTo(`/sales/settlements/${row.original.id}`) }, () => h(Eye, { class: 'size-3.5' })),
  },
]

async function load() {
  loading.value = true
  try {
    const data = await $fetch('/api/sales/settlements', {
      params: {
        status: statusFilter.value !== '__all__' ? statusFilter.value : undefined,
        distributorId: distributorFilter.value !== '__all__' ? distributorFilter.value : undefined,
        paymentMethod: paymentMethodFilter.value !== '__all__' ? paymentMethodFilter.value : undefined,
        dateFrom: dateFrom.value || undefined,
        dateTo: dateTo.value || undefined,
        page: page.value,
        limit,
      },
    })
    settlements.value = data.settlements
    total.value = data.total
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to load settlements')
  } finally {
    loading.value = false
  }
}

watch([statusFilter, distributorFilter, paymentMethodFilter, dateFrom, dateTo], () => { page.value = 1; load() })
watch(page, load)
onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Distributor Settlements" description="Review and confirm cash handed over by distributors">
      <template #actions>
        <UiButton variant="outline" @click="load"><HandCoins class="size-4" /> Refresh</UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex flex-wrap items-center gap-2">
          <LookupCombobox v-model="distributorFilter" :endpoint="fetchDistributorsLookupApi" placeholder="All Distributors" include-all all-value="__all__" all-label="All Distributors" class="w-44" />
          <UiSelect v-model="statusFilter">
            <UiSelectTrigger class="w-36"><UiSelectValue placeholder="All Status" /></UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="__all__">All Status</UiSelectItem>
              <UiSelectItem value="SUBMITTED">Submitted</UiSelectItem>
              <UiSelectItem value="CONFIRMED">Confirmed</UiSelectItem>
              <UiSelectItem value="REJECTED">Rejected</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
          <UiSelect v-model="paymentMethodFilter">
            <UiSelectTrigger class="w-40"><UiSelectValue placeholder="All Methods" /></UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="__all__">All Methods</UiSelectItem>
              <UiSelectItem value="CASH">Cash</UiSelectItem>
              <UiSelectItem value="BANK_TRANSFER">Bank Transfer</UiSelectItem>
              <UiSelectItem value="CHECK">Check</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
          <UiInput v-model="dateFrom" type="date" class="w-40" />
          <UiInput v-model="dateTo" type="date" class="w-40" />
        </div>
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="settlements"
          :columns="columns"
          :loading="loading"
          :server-total="total"
          :show-search="false"
          :show-column-toggle="false"
        >
          <template #empty>
            <EmptyState title="No settlements found" description="Settlements appear when distributors submit cash handovers" />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>
  </div>
</template>
