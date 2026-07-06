<script setup lang="ts">
import { Plus, DollarSign, PieChart } from '@lucide/vue'
import type { Expense, ExpenseCategorySummary } from '@/modules/expenses/type'
import type { ExpenseActions } from '@/modules/expenses/components/column'
import { getExpenseColumns } from '@/modules/expenses/components/column'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'EXPENSES', action: 'READ' },
})

const expensesStore = useExpensesStore()

const search = ref('')
const categoryFilter = ref('__all__')
const page = ref(1)
const limit = 20

const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const editingExpense = ref<Expense | null>(null)
const deletingExpense = ref<Expense | null>(null)

const createForm = reactive({
  title: '',
  amount: null as number | null,
  category: '',
  notes: '',
  date: new Date().toISOString().split('T')[0],
})

const editForm = reactive({
  title: '',
  amount: null as number | null,
  category: '',
  notes: '',
  date: '',
})

const expenseActions: ExpenseActions = {
  onEdit: (expense) => openEdit(expense),
  onDelete: (expense) => openDelete(expense),
}

const columns = getExpenseColumns(expenseActions)

const totalByCategory = computed(() => {
  if (!expensesStore.categories.length) return [] as { category: string; amount: number; count: number }[]
  return expensesStore.categories.map((c: ExpenseCategorySummary) => ({
    category: c.category,
    amount: c._sum.amount || 0,
    count: c._count,
  })).sort((a: any, b: any) => b.amount - a.amount)
})

const totalExpensesAmount = computed(() =>
  expensesStore.expenses.reduce((s: number, e: Expense) => s + Number(e.amount), 0),
)

const debouncedSearch = ref('')
watch(search, (val, _old, onCleanup) => {
  const timer = setTimeout(() => { debouncedSearch.value = val }, 300)
  onCleanup(() => clearTimeout(timer))
})

watch(debouncedSearch, () => { page.value = 1; fetchData() })
watch(categoryFilter, () => { page.value = 1; fetchData() })
watch(page, fetchData)

async function fetchData() {
  await expensesStore.fetchExpenses({
    search: debouncedSearch.value || undefined,
    category: categoryFilter.value === '__all__' ? undefined : categoryFilter.value,
    page: page.value,
    limit,
  })
}

async function handleCreate() {
  if (!createForm.title || !createForm.amount || !createForm.category) {
    toast.error('Title, amount, and category are required')
    return
  }
  try {
    await expensesStore.createExpense(createForm as any)
    showCreateDialog.value = false
    resetCreateForm()
    toast.success('Expense recorded')
  } catch { toast.error('Failed to create expense') }
}

function resetCreateForm() {
  createForm.title = ''
  createForm.amount = null
  createForm.category = ''
  createForm.notes = ''
  createForm.date = new Date().toISOString().split('T')[0]
}

function openEdit(expense: Expense) {
  editingExpense.value = expense
  editForm.title = expense.title
  editForm.amount = Number(expense.amount)
  editForm.category = expense.category
  editForm.notes = expense.notes ?? ''
  editForm.date = expense.date ? expense.date.split('T')[0] || '' : ''
  showEditDialog.value = true
}

async function handleEdit() {
  if (!editingExpense.value) return
  try {
    await expensesStore.updateExpense(editingExpense.value.id, editForm as any)
    showEditDialog.value = false
    editingExpense.value = null
    toast.success('Expense updated')
  } catch { toast.error('Failed to update expense') }
}

function openDelete(expense: Expense) {
  deletingExpense.value = expense
  showDeleteDialog.value = true
}

async function handleDelete() {
  if (!deletingExpense.value) return
  try {
    await expensesStore.deleteExpense(deletingExpense.value.id)
    showDeleteDialog.value = false
    deletingExpense.value = null
    toast.success('Expense deleted')
  } catch { toast.error('Failed to delete expense') }
}

const EXPENSE_CATEGORIES = [
  'Utilities', 'Transport', 'Maintenance', 'Salaries', 'Raw Materials',
  'Packaging', 'Equipment', 'Rent', 'Office', 'Marketing', 'Other',
]

onMounted(fetchData)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Expenses" description="Track and manage all operating expenses">
      <template #actions>
        <UiButton v-can="{ module: 'EXPENSES', action: 'CREATE' }" @click="showCreateDialog = true">
          <Plus class="size-4" /> Add Expense
        </UiButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UiCard>
        <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Expenses</UiCardTitle>
          <DollarSign class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold text-destructive">{{ totalExpensesAmount.toFixed(2) }}</p>
          <p class="text-xs text-muted-foreground">{{ expensesStore.total }} records</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Categories</UiCardTitle>
          <PieChart class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ totalByCategory.length }}</p>
        </UiCardContent>
      </UiCard>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <UiCard>
          <UiCardHeader class="pb-3">
            <div class="flex items-center gap-2">
              <UiInput v-model="search" placeholder="Search expenses..." class="max-w-xs" />
              <UiSelect v-model="categoryFilter">
                <UiSelectTrigger class="w-40">
                  <UiSelectValue placeholder="All categories" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem value="__all__">All categories</UiSelectItem>
                  <UiSelectItem v-for="c in EXPENSE_CATEGORIES" :key="c" :value="c">{{ c }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </UiCardHeader>
          <UiCardContent>
            <AppTable
              :data="expensesStore.expenses"
              :columns="columns"
              :loading="expensesStore.loading"
              :server-total="expensesStore.total"
              show-search
              search-placeholder="Search..."
            >
              <template #empty>
                <EmptyState title="No expenses found" description="Record your first expense" action="Add Expense" @action="showCreateDialog = true" />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>
      </div>

      <div>
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>By Category</UiCardTitle>
            <UiCardDescription>Expense breakdown</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div v-if="totalByCategory.length === 0" class="py-6">
              <EmptyState title="No data" description="No expenses recorded" />
            </div>
            <div v-else class="space-y-3">
              <div v-for="c in totalByCategory" :key="c.category" class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="size-2 rounded-full bg-primary/60" />
                  <span class="text-sm">{{ c.category }}</span>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium tabular-nums">{{ c.amount.toFixed(2) }}</p>
                  <p class="text-xs text-muted-foreground">{{ c.count }} entries</p>
                </div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </div>
    </div>

    <!-- Create Dialog -->
    <UiDialog :open="showCreateDialog" @update:open="showCreateDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Add Expense</UiDialogTitle>
          <UiDialogDescription>Record a new expense entry</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleCreate">
          <div class="space-y-2">
            <UiLabel for="create-title">Title *</UiLabel>
            <UiInput id="create-title" v-model="createForm.title" placeholder="Expense title" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="create-amount">Amount (EGP) *</UiLabel>
              <UiInput id="create-amount" v-model="createForm.amount as number" type="number" step="0.01" placeholder="0.00" required />
            </div>
            <div class="space-y-2">
              <UiLabel for="create-date">Date</UiLabel>
              <UiInput id="create-date" v-model="createForm.date" type="date" />
            </div>
          </div>
          <div class="space-y-2">
            <UiLabel for="create-category">Category *</UiLabel>
            <UiSelect v-model="createForm.category">
              <UiSelectTrigger id="create-category">
                <UiSelectValue placeholder="Select category" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="c in EXPENSE_CATEGORIES" :key="c" :value="c">{{ c }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="create-notes">Notes</UiLabel>
            <UiTextarea id="create-notes" v-model="createForm.notes" placeholder="Optional notes" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreateDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="expensesStore.loading">Create</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Edit Dialog -->
    <UiDialog :open="showEditDialog" @update:open="showEditDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Edit Expense</UiDialogTitle>
          <UiDialogDescription>Update expense information</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleEdit">
          <div class="space-y-2">
            <UiLabel for="edit-title">Title</UiLabel>
            <UiInput id="edit-title" v-model="editForm.title" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="edit-amount">Amount</UiLabel>
              <UiInput id="edit-amount" v-model="editForm.amount as number" type="number" step="0.01" />
            </div>
            <div class="space-y-2">
              <UiLabel for="edit-date">Date</UiLabel>
              <UiInput id="edit-date" v-model="editForm.date" type="date" />
            </div>
          </div>
          <div class="space-y-2">
            <UiLabel for="edit-category">Category</UiLabel>
            <UiSelect v-model="editForm.category">
              <UiSelectTrigger id="edit-category">
                <UiSelectValue />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="c in EXPENSE_CATEGORIES" :key="c" :value="c">{{ c }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="edit-notes">Notes</UiLabel>
            <UiTextarea id="edit-notes" v-model="editForm.notes" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showEditDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="expensesStore.loading">Save</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Delete Confirm -->
    <ConfirmDialog
      v-model:open="showDeleteDialog"
      title="Delete Expense"
      :description="`Are you sure you want to delete ${deletingExpense?.title}?`"
      confirm-text="Delete"
      variant="destructive"
      :loading="expensesStore.loading"
      @confirm="handleDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>
