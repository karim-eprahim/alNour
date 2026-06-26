<script setup lang="ts">
import { Plus } from '@lucide/vue'
import { getAdvanceColumns } from '@/modules/workers/components/column'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const workersStore = useWorkersStore()
const workersList = computed(() => workersStore.workers)

const showCreateDialog = ref(false)
const page = ref(1)
const limit = 50
const workerFilter = ref('__all__')

const createForm = reactive({
  workerId: '',
  amount: null as number | null,
  date: new Date().toISOString().split('T')[0],
  notes: '',
})

const columns = getAdvanceColumns()

watch(workerFilter, () => { page.value = 1; fetchData() })
watch(page, fetchData)

async function fetchData() {
  await Promise.all([
    workersStore.fetchAdvances({
      workerId: workerFilter.value === '__all__' ? undefined : workerFilter.value,
      page: page.value,
      limit,
    }),
    workersStore.fetchWorkers({ limit: 100 }),
  ])
}

async function handleCreate() {
  if (!createForm.workerId || !createForm.amount) {
    toast.error('Worker and amount are required')
    return
  }
  try {
    await workersStore.createAdvance({
      workerId: createForm.workerId,
      amount: createForm.amount,
      date: createForm.date || undefined,
      notes: createForm.notes || undefined,
    })
    showCreateDialog.value = false
    createForm.workerId = ''
    createForm.amount = null
    createForm.date = new Date().toISOString().split('T')[0]
    createForm.notes = ''
    toast.success('Advance recorded')
  } catch { toast.error('Failed to record advance') }
}

onMounted(fetchData)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Worker Advances" description="Track financial advances given to workers">
      <template #actions>
        <UiButton @click="showCreateDialog = true">
          <Plus class="size-4" /> New Advance
        </UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <UiSelect v-model="workerFilter">
            <UiSelectTrigger class="w-56">
              <UiSelectValue placeholder="All Workers" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="__all__">All Workers</UiSelectItem>
              <UiSelectItem v-for="w in workersList" :key="w.id" :value="w.id">{{ w.name }}</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="workersStore.advances"
          :columns="columns"
          :loading="workersStore.loading"
          :server-total="workersStore.advancesTotal"
          show-search
          search-placeholder="Search..."
        >
          <template #empty>
            <EmptyState title="No advances" description="No advances recorded yet" action="New Advance" @action="showCreateDialog = true" />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>

    <!-- Create Advance Dialog -->
    <UiDialog :open="showCreateDialog" @update:open="showCreateDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Record Advance</UiDialogTitle>
          <UiDialogDescription>Record a financial advance for a worker</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleCreate">
          <div class="space-y-2">
            <UiLabel for="adv-worker">Worker *</UiLabel>
            <UiSelect v-model="createForm.workerId">
              <UiSelectTrigger id="adv-worker">
                <UiSelectValue placeholder="Select worker" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="w in workersList" :key="w.id" :value="w.id">{{ w.name }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="adv-amount">Amount (EGP) *</UiLabel>
              <UiInput id="adv-amount" v-model="createForm.amount as number" type="number" step="0.01" placeholder="0.00" required />
            </div>
            <div class="space-y-2">
              <UiLabel for="adv-date">Date</UiLabel>
              <UiInput id="adv-date" v-model="createForm.date" type="date" />
            </div>
          </div>
          <div class="space-y-2">
            <UiLabel for="adv-notes">Notes</UiLabel>
            <UiTextarea id="adv-notes" v-model="createForm.notes" placeholder="Optional notes" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreateDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="workersStore.loading">Record</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
