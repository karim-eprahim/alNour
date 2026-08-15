<script setup lang="ts">
import { HandCoins, History, Plus, Wallet, CheckCircle2, XCircle, Clock3 } from '@lucide/vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()

const page = ref(1)
const limit = 20

const totalPages = computed(() => Math.max(1, Math.ceil(store.settlementsTotal / limit)))

async function load() {
  await store.fetchSettlements({ page: page.value, limit })
}

watch(page, load)
onMounted(load)

const showCreateDialog = ref(false)
const saving = ref(false)
const form = reactive({
  amount: 0 as number,
  paymentMethod: 'CASH' as string,
  notes: '',
})

function openCreate() {
  form.amount = store.custodyBalance
  form.paymentMethod = 'CASH'
  form.notes = ''
  showCreateDialog.value = true
}

async function submitSettlement() {
  if (!form.amount || form.amount <= 0) {
    toast.error('Amount must be positive')
    return
  }
  if (form.amount > store.custodyBalance) {
    toast.error(`Cannot exceed available custody of ${Number(store.custodyBalance).toFixed(2)}`)
    return
  }
  saving.value = true
  try {
    await store.createSettlement({
      amount: form.amount,
      paymentMethod: form.paymentMethod,
      notes: form.notes || undefined,
    })
    toast.success('Settlement submitted for review')
    showCreateDialog.value = false
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || err?.message || 'Failed to submit settlement')
  } finally {
    saving.value = false
  }
}

const statusMeta: Record<string, { label: string; variant: any; icon: any }> = {
  SUBMITTED: { label: 'Submitted', variant: 'warning', icon: Clock3 },
  CONFIRMED: { label: 'Confirmed', variant: 'success', icon: CheckCircle2 },
  REJECTED: { label: 'Rejected', variant: 'destructive', icon: XCircle },
}

function statusBadge(status: string) {
  return statusMeta[status] || { label: status, variant: 'secondary' as const, icon: History }
}

function formatDate(d?: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString()
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">Settlements</h1>
        <p class="text-sm text-muted-foreground">Hand over collected cash to the company</p>
      </div>
    </div>

    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2">
        <div>
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Distributor Custody</UiCardTitle>
        </div>
        <HandCoins class="size-5 text-amber-500" />
      </UiCardHeader>
      <UiCardContent>
        <p class="text-3xl font-bold text-amber-600 dark:text-amber-400">
          {{ Number(store.custodyBalance).toFixed(2) }}
        </p>
        <p class="text-xs text-muted-foreground mb-4">Available to settle</p>
        <UiButton class="w-full" :disabled="store.custodyBalance <= 0" @click="openCreate">
          <Plus class="size-4" /> Create Settlement
        </UiButton>
        <p v-if="store.custodyBalance <= 0" class="mt-2 text-xs text-muted-foreground text-center">
          Collect customer payments first to build up custody
        </p>
      </UiCardContent>
    </UiCard>

    <UiCard>
      <UiCardHeader>
        <UiCardTitle class="text-base">Settlement History</UiCardTitle>
        <UiCardDescription>Money you have handed over to the company</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div v-if="store.loading" class="flex justify-center py-8">
          <LoadingState />
        </div>

        <div v-else-if="store.settlements.length === 0" class="text-center py-8 text-sm text-muted-foreground">
          <History class="mx-auto mb-2 size-6 text-muted-foreground/60" />
          <p>No settlements yet</p>
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="s in store.settlements"
            :key="s.id"
            class="rounded-lg border p-3"
          >
            <div class="flex items-center justify-between">
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <p class="text-sm font-medium truncate">{{ s.settlementNumber }}</p>
                  <UiBadge :variant="statusBadge(s.status).variant as any" class="text-[10px]">
                    {{ statusBadge(s.status).label }}
                  </UiBadge>
                </div>
                <p class="text-xs text-muted-foreground mt-0.5">
                  {{ formatDate(s.submittedAt) }} · {{ s.paymentMethod.replace('_', ' ') }}
                </p>
                <p v-if="s.status === 'REJECTED' && s.rejectionReason" class="text-xs text-destructive mt-1">
                  {{ s.rejectionReason }}
                </p>
                <p v-else-if="s.status === 'CONFIRMED'" class="text-xs text-green-600 mt-1">
                  Confirmed on {{ formatDate(s.confirmedAt) }}
                </p>
              </div>
              <span class="text-sm font-semibold shrink-0 ml-2">{{ Number(s.amount).toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <div
          v-if="!store.loading && store.settlementsTotal > 0"
          class="flex flex-wrap items-center justify-between gap-3 py-4"
        >
          <p class="text-sm text-muted-foreground">
            {{ store.settlements.length }} of {{ store.settlementsTotal }} row(s)
          </p>
          <div class="flex items-center gap-2">
            <UiButton variant="outline" size="sm" :disabled="page <= 1" @click="page--">Previous</UiButton>
            <p class="text-sm text-muted-foreground min-w-20 text-center">Page {{ page }} of {{ totalPages }}</p>
            <UiButton variant="outline" size="sm" :disabled="page >= totalPages" @click="page++">Next</UiButton>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <UiDialog :open="showCreateDialog" @update:open="showCreateDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Create Settlement</UiDialogTitle>
          <UiDialogDescription>Hand over cash to the company for confirmation</UiDialogDescription>
        </UiDialogHeader>
        <form @submit.prevent="submitSettlement" class="space-y-4">
          <div class="rounded-lg border bg-muted/30 px-3 py-2 flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Available to settle</span>
            <span class="text-sm font-semibold">{{ Number(store.custodyBalance).toFixed(2) }}</span>
          </div>
          <div class="space-y-2">
            <UiLabel for="settlementAmount">Amount *</UiLabel>
            <UiInput
              id="settlementAmount"
              v-model.number="form.amount"
              type="number"
              step="0.01"
              min="0"
              :max="store.custodyBalance"
              placeholder="0.00"
            />
            <p class="text-xs text-muted-foreground">Max: {{ Number(store.custodyBalance).toFixed(2) }}</p>
          </div>
          <div class="space-y-2">
            <UiLabel for="settlementMethod">Payment Method</UiLabel>
            <UiSelect v-model="form.paymentMethod">
              <UiSelectTrigger id="settlementMethod"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="CASH">Cash</UiSelectItem>
                <UiSelectItem value="BANK_TRANSFER">Bank Transfer</UiSelectItem>
                <UiSelectItem value="CHECK">Check</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="settlementNotes">Notes</UiLabel>
            <UiTextarea id="settlementNotes" v-model="form.notes" placeholder="Optional" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreateDialog = false">Cancel</UiButton>
            <UiButton
              type="submit"
              :disabled="saving || !form.amount || form.amount <= 0 || form.amount > store.custodyBalance"
            >
              <Wallet v-if="!saving" class="size-4" />
              {{ saving ? 'Submitting...' : 'Submit Settlement' }}
            </UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
