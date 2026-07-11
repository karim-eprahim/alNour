<script setup lang="ts">
import { Check, X, Calendar } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'ATTENDANCE', action: 'READ' },
})

const workersStore = useWorkersStore()
const productionStore = useProductionStore()

const selectedDate = ref(new Date().toISOString().split('T')[0] || '')
const selectedBatchId = ref('__none__')
const workerRecords = ref<Record<string, {
  checked: boolean
  status: 'PRESENT' | 'ABSENT' | 'LEAVE'
  dailyWage: number | null
  notes: string
}>>({})

const submitting = ref(false)

const activeWorkers = computed(() => workersStore.workers.filter((w) => w.isActive))

const batchItems = computed(() =>
  productionStore.batches.map(b => ({ ...b, _label: `${b.batchNumber} — ${b.warehouse?.name || ''}` }))
)

function initRecords() {
  workerRecords.value = {}
  console.log(activeWorkers.value,"activeWorkers.value")
  for (const w of activeWorkers.value) {
    workerRecords.value[w.id] = {
      checked: false,
      status: 'PRESENT',
      dailyWage: w.defaultDailyWage ? Number(w.defaultDailyWage) : null,
      notes: '',
    }
  }
}

watch(activeWorkers, initRecords, { immediate: true })

async function load() {
  await Promise.all([
    workersStore.fetchWorkers({ isActive: 'true', limit: 100 }),
    productionStore.fetchBatches({ limit: 50 }),
  ])
  initRecords()
}

async function handleSubmit() {
  const attendanceRecords = Object.entries(workerRecords.value).map(([workerId, rec]) => ({
    workerId,
    status: rec.checked ? 'PRESENT' : rec.status,
    notes: rec.notes || undefined,
  }))

  const dailyWageRecords = Object.entries(workerRecords.value)
    .filter(([_, rec]) => rec.checked && rec.dailyWage !== null && selectedBatchId.value !== '__none__')
    .map(([workerId, rec]) => ({
      workerId,
      dailyWage: rec.dailyWage!,
      notes: rec.notes || undefined,
    }))

  submitting.value = true
  try {
    await workersStore.logAttendance({
      date: selectedDate.value,
      records: attendanceRecords,
    })

    if (dailyWageRecords.length > 0 && selectedBatchId.value !== '__none__') {
      await workersStore.logDailyWages({
        productionBatchId: selectedBatchId.value,
      date: selectedDate.value || new Date().toISOString().split('T')[0],
        records: dailyWageRecords,
      })
      await productionStore.fetchBatches({ limit: 50 })
    }

    toast.success(`Logged attendance for ${attendanceRecords.length} workers`)
  } catch {
    toast.error('Failed to log attendance')
  } finally {
    submitting.value = false
  }
}

function getRec(id: string) {
  const rec = workerRecords.value[id]
  console.log(rec)
  if (!rec) {
    const fallback = { checked: false, status: 'ABSENT' as const, dailyWage: null as number | null, notes: '' }
    workerRecords.value[id] = fallback as any
    return workerRecords.value[id]!
  }
  return rec
}

function toggleAll(checked: boolean) {
  console.log("checked",checked)
  for (const id of Object.keys(workerRecords.value)) {
    getRec(id).checked = checked
  }
}

function setAllStatus(status: 'PRESENT' | 'ABSENT' | 'LEAVE') {
  for (const id of Object.keys(workerRecords.value)) {
    const rec = getRec(id)
    rec.status = status
    rec.checked = status === 'PRESENT'
  }
}

const isAllChecked = computed(() => {
  if (activeWorkers.value.length === 0) return false
  return Object.values(workerRecords.value).every((r) => r.checked)
})

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Attendance & Daily Wages" description="Log daily attendance and assign workers to production batches">
      <template #actions>
        <UiButton v-can="{ module: 'ATTENDANCE', action: 'UPDATE' }" @click="handleSubmit" :disabled="submitting">
          <Check class="size-4" /> {{ submitting ? 'Saving...' : 'Save All' }}
        </UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex flex-wrap items-center gap-3">
          <div class="space-y-1">
            <UiLabel class="text-xs text-muted-foreground">Date</UiLabel>
            <UiInput v-model="selectedDate" type="date" class="w-44" />
          </div>
          <div class="space-y-1">
            <UiLabel class="text-xs text-muted-foreground">Production Batch</UiLabel>
            <LookupCombobox v-model="selectedBatchId" :items="batchItems" label-key="_label" placeholder="No batch (attendance only)" include-all all-value="__none__" all-label="No batch (attendance only)" class="w-56" />
          </div>
          <div class="flex items-end gap-1 pb-1">
            <UiButton variant="outline" size="sm" @click="setAllStatus('PRESENT')">All Present</UiButton>
            <UiButton variant="outline" size="sm" @click="setAllStatus('ABSENT')">All Absent</UiButton>
            <UiButton variant="outline" size="sm" @click="toggleAll(false)">Clear All</UiButton>
          </div>
        </div>
      </UiCardHeader>
      <UiCardContent class="p-0">
        <div class="rounded-md border">
          <UiTable>
            <UiTableHeader>
              <UiTableRow>
                <UiTableHead class="w-12">
                <UiCheckbox
                  v-model="isAllChecked"
                  :indeterminate="Object.values(workerRecords).some((r) => r.checked) && !Object.values(workerRecords).every((r) => r.checked)"
                  @click="toggleAll(!Object.values(workerRecords).every((r) => r.checked))"
                />
                </UiTableHead>
                <UiTableHead>Worker</UiTableHead>
                <UiTableHead>Role</UiTableHead>
                <UiTableHead>Status</UiTableHead>
                <UiTableHead v-if="selectedBatchId !== '__none__'" class="w-40">Daily Wage (EGP)</UiTableHead>
                <UiTableHead>Notes</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
              <UiTableRow v-if="activeWorkers.length === 0">
                <UiTableCell :colspan="selectedBatchId !== '__none__' ? 6 : 5">
                  <EmptyState title="No workers found" description="Add workers first" />
                </UiTableCell>
              </UiTableRow>
              <UiTableRow v-for="w in activeWorkers" :key="w.id">
                <UiTableCell>
                <UiCheckbox
                  v-model="getRec(w.id).checked"
                  @click="getRec(w.id).checked = !getRec(w.id).checked"
                />
                </UiTableCell>
                <UiTableCell>
                  <span class="font-medium">{{ w.name }}</span>
                </UiTableCell>
                <UiTableCell>
                  <span class="text-sm text-muted-foreground">{{ w.role || '—' }}</span>
                </UiTableCell>
                <UiTableCell>
                  <UiSelect
                    v-if="!getRec(w.id).checked"
                    :model-value="getRec(w.id).status"
                    @update:model-value="getRec(w.id).status = $event as 'PRESENT' | 'ABSENT' | 'LEAVE'"
                  >
                    <UiSelectTrigger class="w-32 h-8">
                      <UiSelectValue />
                    </UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem value="ABSENT">Absent</UiSelectItem>
                      <UiSelectItem value="LEAVE">On Leave</UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                  <UiBadge v-else variant="default" class="text-xs bg-green-100 text-green-800 hover:bg-green-100">Present</UiBadge>
                </UiTableCell>
                <UiTableCell v-if="selectedBatchId !== '__none__'">
                  <UiInput
                    v-if="getRec(w.id).checked"
                    v-model="getRec(w.id).dailyWage as unknown as number"
                    type="number"
                    step="0.01"
                    class="w-32 h-8"
                    :placeholder="String(w.defaultDailyWage ? Number(w.defaultDailyWage).toFixed(2) : '0.00')"
                  />
                  <span v-else class="text-sm text-muted-foreground">—</span>
                </UiTableCell>
                <UiTableCell>
                  <UiInput
                    v-model="getRec(w.id).notes"
                    placeholder="Optional note"
                    class="h-8 max-w-40"
                  />
                </UiTableCell>
              </UiTableRow>
            </UiTableBody>
          </UiTable>
        </div>
      </UiCardContent>
    </UiCard>
  </div>
</template>
