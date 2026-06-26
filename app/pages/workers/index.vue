<script setup lang="ts">
import type { Worker } from '@/modules/workers/type'
import type { WorkerActions } from '@/modules/workers/components/column'
import { getWorkerColumns } from '@/modules/workers/components/column'
import PageHeader from '~/components/shared/PageHeader.vue'
import { Plus } from '@lucide/vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const workersStore = useWorkersStore()

const search = ref('')
const statusFilter = ref('__all__')
const page = ref(1)
const limit = 20

const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const editingWorker = ref<Worker | null>(null)
const deletingWorker = ref<Worker | null>(null)

const createForm = reactive({
  name: '',
  phone: '',
  role: '',
  defaultDailyWage: null as number | null,
})

const editForm = reactive({
  name: '',
  phone: '',
  role: '',
  defaultDailyWage: null as number | null,
  isActive: true,
})

const workerActions: WorkerActions = {
  onView: (id) => navigateTo(`/workers/${id}`),
  onEdit: (worker) => openEdit(worker),
  onDelete: (worker) => openDelete(worker),
}

const columns = getWorkerColumns(workerActions)

const debouncedSearch = ref('')
watch(search, (val, _old, onCleanup) => {
  const timer = setTimeout(() => { debouncedSearch.value = val }, 300)
  onCleanup(() => clearTimeout(timer))
})

watch(debouncedSearch, () => { page.value = 1; fetchData() })
watch(statusFilter, () => { page.value = 1; fetchData() })
watch(page, fetchData)

async function fetchData() {
  await workersStore.fetchWorkers({
    search: debouncedSearch.value || undefined,
    isActive: statusFilter.value === '__all__' ? undefined : statusFilter.value,
    page: page.value,
    limit,
  })
}

async function handleCreate() {
  try {
    await workersStore.createWorker(createForm as any)
    showCreateDialog.value = false
    resetCreateForm()
    toast.success('Worker created successfully')
  } catch { toast.error('Failed to create worker') }
}

function resetCreateForm() {
  createForm.name = ''
  createForm.phone = ''
  createForm.role = ''
  createForm.defaultDailyWage = null
}

function openEdit(worker: Worker) {
  editingWorker.value = worker
  editForm.name = worker.name
  editForm.phone = worker.phone ?? ''
  editForm.role = worker.role ?? ''
  editForm.defaultDailyWage = worker.defaultDailyWage ? Number(worker.defaultDailyWage) : null
  editForm.isActive = worker.isActive
  showEditDialog.value = true
}

async function handleEdit() {
  if (!editingWorker.value) return
  try {
    await workersStore.updateWorker(editingWorker.value.id, editForm as any)
    showEditDialog.value = false
    editingWorker.value = null
    toast.success('Worker updated successfully')
  } catch { toast.error('Failed to update worker') }
}

function openDelete(worker: Worker) {
  deletingWorker.value = worker
  showDeleteDialog.value = true
}

async function handleDelete() {
  if (!deletingWorker.value) return
  try {
    await workersStore.deleteWorker(deletingWorker.value.id)
    showDeleteDialog.value = false
    deletingWorker.value = null
    toast.success('Worker deleted successfully')
  } catch { toast.error('Failed to delete worker') }
}

onMounted(fetchData)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Workers" description="Manage all workers, track wages and advances">
      <template #actions>
        <UiButton @click="showCreateDialog = true">
          <Plus class="size-4" /> Add Worker
        </UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <UiInput v-model="search" placeholder="Search by name or phone..." class="max-w-xs" />
          <UiSelect v-model="statusFilter">
            <UiSelectTrigger class="w-40">
              <UiSelectValue placeholder="All Status" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="__all__">All Status</UiSelectItem>
              <UiSelectItem value="true">Active</UiSelectItem>
              <UiSelectItem value="false">Inactive</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="workersStore.workers"
          :columns="columns"
          :loading="workersStore.loading"
          :server-total="workersStore.total"
          show-search
          search-placeholder="Search..."
        >
          <template #empty>
            <EmptyState
              title="No workers found"
              description="Add your first worker to get started"
              action="Add Worker"
              @action="showCreateDialog = true"
            />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>

    <!-- Create Worker Dialog -->
    <UiDialog :open="showCreateDialog" @update:open="showCreateDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Add Worker</UiDialogTitle>
          <UiDialogDescription>Register a new worker in the system</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleCreate">
          <div class="space-y-2">
            <UiLabel for="create-name">Name *</UiLabel>
            <UiInput id="create-name" v-model="createForm.name" placeholder="Worker name" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="create-phone">Phone</UiLabel>
              <UiInput id="create-phone" v-model="createForm.phone" placeholder="Phone number" />
            </div>
            <div class="space-y-2">
              <UiLabel for="create-role">Role</UiLabel>
              <UiInput id="create-role" v-model="createForm.role" placeholder="e.g. Packer, Loader" />
            </div>
          </div>
          <div class="space-y-2">
            <UiLabel for="create-wage">Default Daily Wage (EGP)</UiLabel>
            <UiInput id="create-wage" v-model="createForm.defaultDailyWage as number" type="number" step="0.01" placeholder="0.00" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreateDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="workersStore.loading">Create</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Edit Worker Dialog -->
    <UiDialog :open="showEditDialog" @update:open="showEditDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Edit Worker</UiDialogTitle>
          <UiDialogDescription>Update worker information</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleEdit">
          <div class="space-y-2">
            <UiLabel for="edit-name">Name *</UiLabel>
            <UiInput id="edit-name" v-model="editForm.name" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="edit-phone">Phone</UiLabel>
              <UiInput id="edit-phone" v-model="editForm.phone" />
            </div>
            <div class="space-y-2">
              <UiLabel for="edit-role">Role</UiLabel>
              <UiInput id="edit-role" v-model="editForm.role" />
            </div>
          </div>
          <div class="space-y-2">
            <UiLabel for="edit-wage">Default Daily Wage (EGP)</UiLabel>
            <UiInput id="edit-wage" v-model="editForm.defaultDailyWage as number" type="number" step="0.01" />
          </div>
          <div class="flex items-center gap-2">
            <UiSwitch id="edit-active" v-model:checked="editForm.isActive" />
            <UiLabel for="edit-active">Active Worker</UiLabel>
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showEditDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="workersStore.loading">Save</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Delete Confirm -->
    <ConfirmDialog
      v-model:open="showDeleteDialog"
      title="Delete Worker"
      :description="`Are you sure you want to delete ${deletingWorker?.name}? This action cannot be undone.`"
      confirm-text="Delete"
      variant="destructive"
      :loading="workersStore.loading"
      @confirm="handleDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>
