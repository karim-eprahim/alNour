<script setup lang="ts">
import { ArrowLeft, CheckCircle2, XCircle, Wallet, HandCoins } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { usePermissions } from '~/composables/usePermissions'
import type { DistributorSettlement } from '@/modules/distributor/type'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'SALES', action: 'READ' },
})

const route = useRoute()
const { can } = usePermissions()

const settlementId = computed(() => route.params.id as string)

const loading = ref(true)
const processing = ref(false)
const settlement = ref<DistributorSettlement | null>(null)
const custodyBalance = ref(0)

const showConfirmDialog = ref(false)
const showRejectDialog = ref(false)
const rejectionReason = ref('')

const statusMeta: Record<string, { label: string; variant: any }> = {
  SUBMITTED: { label: 'Submitted', variant: 'warning' },
  CONFIRMED: { label: 'Confirmed', variant: 'success' },
  REJECTED: { label: 'Rejected', variant: 'destructive' },
}

function statusBadge(status: string) {
  return statusMeta[status] || { label: status, variant: 'secondary' as const }
}

async function load() {
  loading.value = true
  try {
    const data = await $fetch(`/api/sales/settlements/${settlementId.value}`)
    settlement.value = data.settlement as DistributorSettlement
    custodyBalance.value = data.custodySummary?.custody || 0
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to load settlement')
  } finally {
    loading.value = false
  }
}

async function confirmSettlement() {
  processing.value = true
  try {
    const data = await $fetch(`/api/sales/settlements/${settlementId.value}/confirm`, { method: 'POST' })
    settlement.value = data.settlement as DistributorSettlement
    toast.success(`Settlement ${data.settlement.settlementNumber} confirmed`)
    showConfirmDialog.value = false
    await load()
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to confirm settlement')
  } finally {
    processing.value = false
  }
}

async function rejectSettlement() {
  if (!rejectionReason.value.trim()) {
    toast.error('Rejection reason is required')
    return
  }
  processing.value = true
  try {
    const data = await $fetch(`/api/sales/settlements/${settlementId.value}/reject`, {
      method: 'POST',
      body: { rejectionReason: rejectionReason.value.trim() },
    })
    settlement.value = data.settlement as DistributorSettlement
    toast.success(`Settlement ${data.settlement.settlementNumber} rejected`)
    showRejectDialog.value = false
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to reject settlement')
  } finally {
    processing.value = false
  }
}

function formatDate(d?: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleString()
}

function formatMethod(m: string) {
  return m.replace('_', ' ')
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/sales/settlements')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader title="Settlement Details" :description="settlement?.settlementNumber || 'Review distributor settlement'" />
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <LoadingState />
    </div>

    <template v-else-if="settlement">
      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between">
          <div>
            <UiCardTitle class="text-lg">{{ settlement.settlementNumber }}</UiCardTitle>
            <UiCardDescription>Submitted {{ formatDate(settlement.submittedAt) }}</UiCardDescription>
          </div>
          <UiBadge :variant="statusBadge(settlement.status).variant as any">{{ statusBadge(settlement.status).label }}</UiBadge>
        </UiCardHeader>
        <UiCardContent class="space-y-4">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-lg border p-4">
              <p class="text-sm text-muted-foreground">Distributor</p>
              <p class="text-lg font-semibold mt-1">{{ settlement.distributor?.name || '—' }}</p>
            </div>
            <div class="rounded-lg border p-4">
              <p class="text-sm text-muted-foreground">Amount</p>
              <p class="text-lg font-bold text-green-600 mt-1">{{ Number(settlement.amount).toFixed(2) }}</p>
            </div>
            <div class="rounded-lg border p-4">
              <p class="text-sm text-muted-foreground">Payment Method</p>
              <p class="text-lg font-semibold mt-1">{{ formatMethod(settlement.paymentMethod) }}</p>
            </div>
            <div class="rounded-lg border p-4">
              <p class="text-sm text-muted-foreground">Submitted At</p>
              <p class="text-lg font-semibold mt-1">{{ formatDate(settlement.submittedAt) }}</p>
            </div>
            <div class="rounded-lg border p-4">
              <p class="text-sm text-muted-foreground">Current Distributor Custody</p>
              <p class="text-lg font-bold text-amber-600 dark:text-amber-400 mt-1">{{ Number(custodyBalance).toFixed(2) }}</p>
              <p class="text-xs text-muted-foreground">Available to settle after this one</p>
            </div>
          </div>

          <div v-if="settlement.notes" class="rounded-lg border p-4">
            <p class="text-sm text-muted-foreground">Notes</p>
            <p class="text-sm mt-1">{{ settlement.notes }}</p>
          </div>

          <div v-if="settlement.status === 'CONFIRMED'" class="rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 p-4">
            <p class="text-sm font-medium text-green-700 dark:text-green-400 flex items-center gap-2">
              <CheckCircle2 class="size-4" /> Confirmed on {{ formatDate(settlement.confirmedAt) }}
            </p>
            <p v-if="settlement.confirmedByUser" class="text-xs text-muted-foreground mt-1">
              By {{ settlement.confirmedByUser.name }}
            </p>
          </div>

          <div v-if="settlement.status === 'REJECTED'" class="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <p class="text-sm font-medium text-destructive flex items-center gap-2">
              <XCircle class="size-4" /> Rejected
            </p>
            <p v-if="settlement.rejectionReason" class="text-xs text-muted-foreground mt-1">{{ settlement.rejectionReason }}</p>
          </div>

          <div v-if="settlement.status === 'SUBMITTED' && can('SALES', 'UPDATE')" class="flex flex-wrap gap-3 border-t pt-4">
            <UiButton variant="default" :disabled="processing" @click="showConfirmDialog = true">
              <CheckCircle2 class="size-4" /> Confirm Settlement
            </UiButton>
            <UiButton variant="outline" :disabled="processing" @click="showRejectDialog = true">
              <XCircle class="size-4" /> Reject Settlement
            </UiButton>
          </div>
        </UiCardContent>
      </UiCard>
    </template>

    <ConfirmDialog
      v-model:open="showConfirmDialog"
      title="Confirm Settlement"
      :description="`Confirm that the company has received ${Number(settlement?.amount || 0).toFixed(2)} from this distributor. This transfers the amount from distributor custody to company cash.`"
      confirm-text="Confirm Settlement"
      variant="default"
      :loading="processing"
      @confirm="confirmSettlement"
      @cancel="showConfirmDialog = false"
    />

    <UiDialog :open="showRejectDialog" @update:open="showRejectDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Reject Settlement</UiDialogTitle>
          <UiDialogDescription>The settlement will stay in the distributor's custody. Provide a reason for rejection.</UiDialogDescription>
        </UiDialogHeader>
        <form @submit.prevent="rejectSettlement" class="space-y-4">
          <div class="space-y-2">
            <UiLabel for="rejectionReason">Rejection Reason *</UiLabel>
            <UiTextarea id="rejectionReason" v-model="rejectionReason" placeholder="Explain why the settlement was rejected" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showRejectDialog = false">Cancel</UiButton>
            <UiButton type="submit" variant="destructive" :disabled="processing || !rejectionReason.trim()">
              <XCircle v-if="!processing" class="size-4" />
              {{ processing ? 'Rejecting...' : 'Reject Settlement' }}
            </UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
