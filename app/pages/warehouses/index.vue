<script setup lang="ts">
import { h } from 'vue'
import { MoreHorizontal, Eye, Pencil, Trash2, MapPin, Package } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Warehouse } from '@/modules/warehouses/type'
import { NuxtLink, UiBadge, UiButton, UiDropdownMenu, UiDropdownMenuTrigger, UiDropdownMenuContent, UiDropdownMenuItem, UiDropdownMenuSeparator } from '#components'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const warehousesStore = useWarehousesStore()
const search = ref('')
const debouncedSearch = refDebounced(search, 300)

const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const editingWarehouse = ref<Warehouse | null>(null)
const deletingWarehouse = ref<Warehouse | null>(null)

const createForm = reactive({ name: '', location: '' })
const editForm = reactive({ name: '', location: '' })

watch(debouncedSearch, () => warehousesStore.fetchWarehouses({ search: debouncedSearch.value || undefined }))

function openEdit(w: Warehouse) {
  editingWarehouse.value = w
  editForm.name = w.name
  editForm.location = w.location ?? ''
  showEditDialog.value = true
}

function openDelete(w: Warehouse) {
  deletingWarehouse.value = w
  showDeleteDialog.value = true
}

async function handleCreate() {
  try {
    await warehousesStore.createWarehouse(createForm)
    showCreateDialog.value = false
    createForm.name = ''
    createForm.location = ''
    useSonner().success('Warehouse created')
  } catch {}
}

async function handleEdit() {
  if (!editingWarehouse.value) return
  try {
    await warehousesStore.updateWarehouse(editingWarehouse.value.id, editForm)
    showEditDialog.value = false
    editingWarehouse.value = null
    useSonner().success('Warehouse updated')
  } catch {}
}

async function handleDelete() {
  if (!deletingWarehouse.value) return
  try {
    await warehousesStore.deleteWarehouse(deletingWarehouse.value.id)
    showDeleteDialog.value = false
    deletingWarehouse.value = null
    useSonner().success('Warehouse deleted')
  } catch {}
}

const columns: ColumnDef<Warehouse>[] = [
  {
    accessorKey: 'name',
    header: 'Warehouse',
    cell: ({ row }) => h('div', { class: 'flex items-center gap-3' }, [
      h('div', { class: 'size-8 flex items-center justify-center rounded-lg bg-muted' }, [
        h(Warehouse, { class: 'size-4 text-muted-foreground' }),
      ]),
      h(NuxtLink, { to: `/warehouses/${row.original.id}`, class: 'text-sm font-medium hover:underline' }, row.original.name),
    ]),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => {
      const loc = row.original.location
      if (!loc) return h('span', { class: 'text-xs text-muted-foreground' }, '—')
      return h('div', { class: 'flex items-center gap-1.5 text-sm' }, [
        h(MapPin, { class: 'size-3.5 text-muted-foreground' }),
        loc,
      ])
    },
  },
  {
    id: 'stocks',
    header: 'Products',
    cell: ({ row }) => h('span', { class: 'text-sm' }, String(row.original._count?.stocks ?? 0)),
  },
  {
    id: 'movements',
    header: 'Movements',
    cell: ({ row }) => h('span', { class: 'text-sm' }, String(row.original._count?.movements ?? 0)),
  },
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    cell: ({ row }) => {
      const w = row.original
      return h('div', [
        h(UiDropdownMenu, null, {
          default: () => [
            h(UiDropdownMenuTrigger, { 'as-child': true }, {
              default: () => h(UiButton, { variant: 'ghost', size: 'icon-sm' }, {
                default: () => h(MoreHorizontal, { class: 'size-4' }),
              }),
            }),
            h(UiDropdownMenuContent, { align: 'end', class: 'w-36' }, [
              h(UiDropdownMenuItem, { onClick: () => navigateTo(`/warehouses/${w.id}`) }, [
                h(Eye, { class: 'size-4' }), ' View',
              ]),
              h(UiDropdownMenuItem, { onClick: () => openEdit(w) }, [
                h(Pencil, { class: 'size-4' }), ' Edit',
              ]),
              h(UiDropdownMenuSeparator),
              h(UiDropdownMenuItem, { variant: 'destructive', onClick: () => openDelete(w) }, [
                h(Trash2, { class: 'size-4' }), ' Delete',
              ]),
            ]),
          ],
        }),
      ])
    },
  },
]

onMounted(() => warehousesStore.fetchWarehouses())
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Warehouses" description="Manage storage locations and inventory">
      <template #actions>
        <UiButton @click="showCreateDialog = true">Add Warehouse</UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <UiInput v-model="search" placeholder="Search warehouses..." class="max-w-xs" />
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="warehousesStore.warehouses"
          :columns="columns"
          :loading="warehousesStore.loading"
          :server-total="warehousesStore.total"
          :show-search="false"
          :show-column-toggle="false"
        >
          <template #empty>
            <EmptyState title="No warehouses" description="Create your first warehouse to get started" action="Add Warehouse" @action="showCreateDialog = true" />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>

    <UiDialog :open="showCreateDialog" @update:open="showCreateDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Add Warehouse</UiDialogTitle>
          <UiDialogDescription>Create a new storage location</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleCreate">
          <div class="space-y-2">
            <UiLabel for="create-name">Name</UiLabel>
            <UiInput id="create-name" v-model="createForm.name" placeholder="Warehouse name" required />
          </div>
          <div class="space-y-2">
            <UiLabel for="create-location">Location</UiLabel>
            <UiInput id="create-location" v-model="createForm.location" placeholder="Optional location" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreateDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="warehousesStore.loading">Create</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <UiDialog :open="showEditDialog" @update:open="showEditDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Edit Warehouse</UiDialogTitle>
          <UiDialogDescription>Update warehouse information</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleEdit">
          <div class="space-y-2">
            <UiLabel for="edit-name">Name</UiLabel>
            <UiInput id="edit-name" v-model="editForm.name" required />
          </div>
          <div class="space-y-2">
            <UiLabel for="edit-location">Location</UiLabel>
            <UiInput id="edit-location" v-model="editForm.location" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showEditDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="warehousesStore.loading">Save</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <ConfirmDialog
      v-model:open="showDeleteDialog"
      title="Delete Warehouse"
      :description="`Are you sure you want to delete ${deletingWarehouse?.name}?`"
      confirm-text="Delete"
      variant="destructive"
      :loading="warehousesStore.loading"
      @confirm="handleDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>
