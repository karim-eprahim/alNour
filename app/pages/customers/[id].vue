<script setup lang="ts">
import { ArrowLeft, FileText, Phone, MapPin, Link, ArrowLeftRight } from '@lucide/vue'
import { getLedgerColumns } from '@/modules/customers/components/column'
import { UiBadge } from '#components'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: {
    module: 'CUSTOMERS',
    action: 'VIEW'
  }
})

const route = useRoute()
const customersStore = useCustomersStore()

const customer = computed(() => customersStore.currentCustomer)
const ledgerColumns = getLedgerColumns()

const showContraDialog = ref(false)
const contraForm = reactive({ amount: null as number | null })

const linkedSupplier = computed(() => (customer.value as any)?.linkedSupplier ?? null)
const linkedSupplierBalance = computed(() => linkedSupplier.value?.balance ?? 0)
const netBalance = computed(() => (customer.value as any)?.netBalance ?? (customer.value?.balance ?? 0))

async function handleContraSettlement() {
  if (!contraForm.amount && contraForm.amount !== 0) return
  try {
    await $fetch('/api/accounting/reconcile-partner', {
      method: 'POST',
      body: {
        supplierId: linkedSupplier.value.id,
        customerId: route.params.id,
        amount: contraForm.amount,
      },
    })
    showContraDialog.value = false
    contraForm.amount = null
    toast.success('Contra settlement completed')
    await customersStore.fetchCustomer(route.params.id as string)
  } catch (e: any) {
    toast.error(e?.data?.statusMessage || 'Settlement failed')
  }
}

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

    <div v-if="linkedSupplier" class="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20 p-4">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div class="flex items-center gap-2">
          <Link class="size-4 text-blue-600" />
          <span class="text-sm font-medium">Linked to Supplier: <NuxtLink :to="`/suppliers/${linkedSupplier.id}`" class="text-blue-600 hover:underline">{{ linkedSupplier.name }}</NuxtLink></span>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="text-xs text-muted-foreground">Customer Balance</p>
            <p class="text-sm font-medium tabular-nums" :class="(customer?.balance ?? 0) > 0 ? 'text-destructive' : 'text-green-600'">{{ Number(customer?.balance ?? 0).toFixed(2) }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-muted-foreground">Supplier Balance</p>
            <p class="text-sm font-medium tabular-nums" :class="linkedSupplierBalance > 0 ? 'text-destructive' : 'text-green-600'">{{ Number(linkedSupplierBalance).toFixed(2) }}</p>
          </div>
          <div class="text-right border-l pl-4">
            <p class="text-xs text-muted-foreground">Net Balance</p>
            <p class="text-sm font-bold tabular-nums" :class="netBalance > 0 ? 'text-destructive' : netBalance < 0 ? 'text-green-600' : ''">
              {{ netBalance > 0 ? `مدين لنا بـ ${Number(netBalance).toFixed(2)}` : netBalance < 0 ? `نحن مدينون له بـ ${Number(Math.abs(netBalance)).toFixed(2)}` : 'صفر' }}
            </p>
          </div>
          <UiButton size="sm" variant="outline" class="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-400" @click="showContraDialog = true">
            <ArrowLeftRight class="size-4" /> مقاصة مالية
          </UiButton>
        </div>
      </div>
    </div>

    <UiCard v-if="customer">
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
    </UiCard>

    <UiDialog :open="showContraDialog" @update:open="showContraDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Contra Settlement (مقاصة مالية)</UiDialogTitle>
          <UiDialogDescription>Settle outstanding balances between {{ customer?.name }} and {{ linkedSupplier?.name }}</UiDialogDescription>
        </UiDialogHeader>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between"><span>Customer Balance:</span><span :class="(customer?.balance ?? 0) > 0 ? 'text-destructive' : 'text-green-600'" class="font-medium">{{ Number(customer?.balance ?? 0).toFixed(2) }}</span></div>
          <div class="flex justify-between"><span>Supplier Balance:</span><span :class="linkedSupplierBalance > 0 ? 'text-destructive' : 'text-green-600'" class="font-medium">{{ Number(linkedSupplierBalance).toFixed(2) }}</span></div>
          <div class="flex justify-between border-t pt-2"><span>Current Net:</span><span class="font-bold" :class="netBalance > 0 ? 'text-destructive' : netBalance < 0 ? 'text-green-600' : ''">{{ Number(netBalance).toFixed(2) }}</span></div>
        </div>
        <form class="space-y-4" @submit.prevent="handleContraSettlement">
          <div class="space-y-2">
            <UiLabel for="contra-amount">Settlement Amount</UiLabel>
            <UiInput id="contra-amount" v-model="contraForm.amount as number" type="number" step="0.01" placeholder="0.00" required />
            <p class="text-xs text-muted-foreground">Leave empty to auto-calculate the minimum of both balances</p>
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showContraDialog = false">Cancel</UiButton>
            <UiButton type="submit">Execute Settlement</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
