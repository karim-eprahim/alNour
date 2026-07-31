<script setup lang="ts">
import {
  useVueTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  FlexRender,
  type ColumnDef,
  type SortingState,
  type ExpandedState,
  type PaginationState,
} from '@tanstack/vue-table'
import { valueUpdater } from '~/components/ui/table/utils'
import { ChevronDown, ChevronRight, ChevronsUpDown, EyeOff, ChevronUp } from '@lucide/vue'

const props = withDefaults(defineProps<{
  data: any[]
  columns: ColumnDef<any>[]
  loading?: boolean
  serverTotal?: number
  defaultPageSize?: number
  pageSizeOptions?: number[]
  searchPlaceholder?: string
  showSearch?: boolean
  showColumnToggle?: boolean
  showPagination?: boolean
  enableExpand?: boolean
}>(), {
  loading: false,
  serverTotal: 0,
  defaultPageSize: 10,
  pageSizeOptions: () => [10, 20, 30, 50],
  searchPlaceholder: 'Search...',
  showSearch: true,
  showColumnToggle: true,
  showPagination: true,
  enableExpand: false,
})

const sorting = ref<SortingState>([])
const expanded = ref<ExpandedState>({})
const globalFilter = ref('')
const columnVisibility = ref({})
const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: props.defaultPageSize,
})

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  state: {
    get sorting() { return sorting.value },
    get expanded() { return expanded.value },
    get globalFilter() { return globalFilter.value },
    get columnVisibility() { return columnVisibility.value },
    get pagination() { return pagination.value },
  },
  onSortingChange: (updater) => valueUpdater(updater, sorting),
  onExpandedChange: (updater) => valueUpdater(updater, expanded),
  onGlobalFilterChange: (updater) => valueUpdater(updater, globalFilter),
  onColumnVisibilityChange: (updater) => valueUpdater(updater, columnVisibility),
  onPaginationChange: (updater) => valueUpdater(updater, pagination),
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  globalFilterFn: 'includesString',
  enableExpanding: props.enableExpand,
  getRowCanExpand: () => props.enableExpand,
  enableSortingRemoval: false,
})

const totalFiltered = computed(() => table.getFilteredRowModel().rows.length)
const totalData = computed(() => props.data.length)

const mobileRows = computed(() =>
  table.getRowModel().rows.map((row) => {
    const cells = row.getVisibleCells()
    return {
      row,
      primary: cells[0],
      actions: cells.find((c) => c.column.id === 'actions'),
      secondary: cells.filter((c, i) => i !== 0 && c.column.id !== 'actions'),
    }
  }),
)

const columnLength = computed(() => table.getAllColumns().length)
const pageCount = computed(() => {
  if (props.serverTotal) {
    return Math.ceil(props.serverTotal / table.getState().pagination.pageSize)
  }
  return table.getPageCount()
})
</script>

<template>
  <div>
    <div v-if="showSearch || showColumnToggle" class="flex flex-wrap items-center justify-between gap-2 pb-4">
      <UiInput
        v-if="showSearch"
        v-model="globalFilter"
        :placeholder="searchPlaceholder"
        class="w-full sm:max-w-sm"
      />
      <UiDropdownMenu v-if="showColumnToggle">
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="outline" size="sm">
            <EyeOff class="size-4" />
            Columns
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="end" class="w-48">
          <UiDropdownMenuLabel>Column Visibility</UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem
            v-for="column in table.getAllColumns().filter(col => col.getCanHide())"
            :key="column.id"
            @click="column.toggleVisibility()"
          >
            <div class="flex items-center gap-2">
              <UiCheckbox
                :model-value="column.getIsVisible()"
                @click.stop="column.toggleVisibility()"
              />
              <span class="capitalize">{{ column.id }}</span>
            </div>
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>

    <div class="hidden sm:block rounded-md border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead v-if="enableExpand" class="w-10" />
            <UiTableHead
              v-for="header in table.getFlatHeaders()"
              :key="header.id"
              :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <div class="flex items-center gap-1">
                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                <ChevronsUpDown
                  v-if="header.column.getCanSort() && !header.column.getIsSorted()"
                  class="size-3.5 text-muted-foreground"
                />
                <ChevronUp
                  v-else-if="header.column.getIsSorted() === 'asc'"
                  class="size-3.5"
                />
                <ChevronDown
                  v-else-if="header.column.getIsSorted() === 'desc'"
                  class="size-3.5"
                />
              </div>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-if="loading">
            <UiTableCell :colspan="columnLength + (enableExpand ? 1 : 0)" class="p-0">
              <LoadingState :count="5" />
            </UiTableCell>
          </UiTableRow>
          <UiTableRow v-else-if="table.getRowModel().rows.length === 0">
            <UiTableCell :colspan="columnLength + (enableExpand ? 1 : 0)">
              <slot name="empty">
                <EmptyState
                  title="No results"
                  description="No data found matching your criteria."
                />
              </slot>
            </UiTableCell>
          </UiTableRow>
          <template v-for="row in table.getRowModel().rows" :key="row.id">
            <UiTableRow>
              <UiTableCell v-if="enableExpand && row.getCanExpand()" class="w-10">
                <UiButton
                  variant="ghost"
                  size="icon-xs"
                  @click="row.toggleExpanded()"
                >
                  <ChevronRight v-if="!row.getIsExpanded()" class="size-4" />
                  <ChevronDown v-else class="size-4" />
                </UiButton>
              </UiTableCell>
              <UiTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <slot
                  :name="`cell-${cell.column.id}`"
                  :row="row"
                  :cell="cell"
                  :get-value="cell.getValue"
                >
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </slot>
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-if="enableExpand && row.getIsExpanded()">
              <UiTableCell :colspan="columnLength + 1">
                <slot name="expand" :row="row">
                  <div class="text-muted-foreground p-4 text-center text-sm">
                    No expand content provided.
                  </div>
                </slot>
              </UiTableCell>
            </UiTableRow>
          </template>
        </UiTableBody>
      </UiTable>
    </div>

    <div class="grid gap-3 sm:hidden">
      <template v-for="item in mobileRows" :key="item.row.id">
        <div class="rounded-lg border bg-card p-4">
          <div v-if="enableExpand && item.row.getCanExpand()" class="mb-2">
            <UiButton variant="ghost" size="icon-xs" @click="item.row.toggleExpanded()">
              <ChevronRight v-if="!item.row.getIsExpanded()" class="size-4" />
              <ChevronDown v-else class="size-4" />
            </UiButton>
          </div>

          <div v-if="item.primary" class="flex items-start justify-between gap-3">
            <div class="min-w-0 flex-1">
              <slot
                :name="`cell-${item.primary.column.id}`"
                :row="item.row"
                :cell="item.primary"
                :get-value="item.primary.getValue"
              >
                <FlexRender :render="item.primary.column.columnDef.cell" :props="item.primary.getContext()" />
              </slot>
            </div>
            <div v-if="item.actions" class="shrink-0">
              <slot
                :name="`cell-${item.actions.column.id}`"
                :row="item.row"
                :cell="item.actions"
                :get-value="item.actions.getValue"
              >
                <FlexRender :render="item.actions.column.columnDef.cell" :props="item.actions.getContext()" />
              </slot>
            </div>
          </div>

          <div v-if="item.secondary.length" class="mt-3 space-y-2 border-t pt-3">
            <div
              v-for="cell in item.secondary"
              :key="cell.id"
              class="flex items-center justify-between gap-3 text-sm"
            >
              <span class="shrink-0 text-xs text-muted-foreground">
                <template v-if="typeof cell.column.columnDef.header === 'string'">{{ cell.column.columnDef.header }}</template>
              </span>
              <span class="min-w-0 text-right">
                <slot
                  :name="`cell-${cell.column.id}`"
                  :row="item.row"
                  :cell="cell"
                  :get-value="cell.getValue"
                >
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </slot>
              </span>
            </div>
          </div>

          <div v-if="enableExpand && item.row.getIsExpanded()" class="mt-3 border-t pt-3">
            <slot name="expand" :row="item.row">
              <div class="text-muted-foreground p-4 text-center text-sm">
                No expand content provided.
              </div>
            </slot>
          </div>
        </div>
      </template>
    </div>

    <div
      v-if="showPagination && pageCount > 0"
      class="flex flex-wrap items-center justify-between gap-3 py-4"
    >
      <p class="text-sm text-muted-foreground">
        {{ totalFiltered }} of {{ totalData }} row(s)
      </p>
      <div class="flex items-center gap-2">
        <UiButton
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </UiButton>
        <p class="text-sm text-muted-foreground min-w-20 text-center">
          Page {{ table.getState().pagination.pageIndex + 1 }} of {{ pageCount }}
        </p>
        <UiButton
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </UiButton>
        <UiSelect
          :model-value="String(table.getState().pagination.pageSize)"
          @update:model-value="table.setPageSize(Number($event))"
        >
          <UiSelectTrigger class="w-[70px]">
            <UiSelectValue />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem v-for="size in pageSizeOptions" :key="size" :value="String(size)">
              {{ size }}
            </UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>
    </div>
  </div>
</template>
