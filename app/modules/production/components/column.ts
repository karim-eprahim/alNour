import { h } from 'vue'
import { MoreHorizontal, Eye, Trash2 } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ProductionBatch, ProductionConsumption, ProductionOutput, WorkerProductivity } from '../type'
import { usePermissions } from '~/composables/usePermissions'
import {
  NuxtLink,
  UiBadge,
  UiButton,
  UiDropdownMenu,
  UiDropdownMenuTrigger,
  UiDropdownMenuContent,
  UiDropdownMenuItem,
  UiDropdownMenuSeparator,
} from '#components'

export interface BatchActions {
  onView: (id: string) => void
  onDelete: (id: string) => void
}

function statusVariant(s: string) {
  const map: Record<string, string> = { PENDING: 'secondary', PROCESSING: 'warning', COMPLETED: 'success', CANCELLED: 'destructive' }
  return map[s] || 'secondary'
}

export function getBatchColumns(actions: BatchActions): ColumnDef<ProductionBatch>[] {
  return [
    {
      accessorKey: 'batchNumber',
      header: 'Batch #',
      cell: ({ row }) => h(NuxtLink, { to: `/production/${row.original.id}`, class: 'font-medium hover:underline' }, row.original.batchNumber),
    },
    {
      accessorKey: 'warehouse.name',
      header: 'Warehouse',
      cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.warehouse?.name || '—'),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => h(UiBadge, { variant: statusVariant(row.original.status) as any, class: 'text-xs' }, row.original.status),
    },
    {
      id: 'inputs',
      header: 'Inputs',
      cell: ({ row }) => h('span', { class: 'tabular-nums block' }, String(row.original._count?.consumptions ?? 0)),
    },
    {
      id: 'outputs',
      header: 'Outputs',
      cell: ({ row }) => h('span', { class: 'tabular-nums block' }, String(row.original._count?.outputs ?? 0)),
    },
    {
      accessorKey: 'totalBatchCost',
      header: 'Total Cost',
      cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalBatchCost).toFixed(2)),
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, new Date(row.original.createdAt).toLocaleDateString()),
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => {
        const b = row.original
        const { can } = usePermissions()
        const canDelete = can('PRODUCTION', 'DELETE')
        const buttons: any[] = [
          h(UiButton, { variant: 'ghost', size: 'icon-xs', onClick: () => actions.onView(b.id) }, () => h(Eye, { class: 'size-3.5' })),
        ]
        if (canDelete) {
          buttons.push(h(UiButton, { variant: 'ghost', size: 'icon-xs', class: 'text-destructive', onClick: () => actions.onDelete(b.id) }, () => h(Trash2, { class: 'size-3.5' })))
        }
        return h('div', { class: 'flex gap-1' }, buttons)
      },
    },
  ]
}

export function getConsumptionColumns(): ColumnDef<ProductionConsumption>[] {
  return [
    {
      accessorKey: 'product.name',
      header: 'Product',
      cell: ({ row }) => h('span', { class: 'text-sm' }, `${row.original.product?.name || '—'} (${row.original.product?.sku || ''})`),
    },
    {
      accessorKey: 'quantity',
      header: 'Qty',
      cell: ({ row }) => h('span', { class: 'tabular-nums block' }, Number(row.original.quantity).toFixed(3)),
    },
    {
      accessorKey: 'unitCost',
      header: 'Unit Cost',
      cell: ({ row }) => h('span', { class: 'tabular-nums block' }, Number(row.original.unitCost).toFixed(2)),
    },
    {
      accessorKey: 'totalCost',
      header: 'Total',
      cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalCost).toFixed(2)),
    },
  ]
}

export function getOutputColumns(): ColumnDef<ProductionOutput>[] {
  return [
    {
      accessorKey: 'product.name',
      header: 'Product',
      cell: ({ row }) => {
        const p = row.original.product
        return h(NuxtLink, { to: `/products/${row.original.productId}`, class: 'hover:underline text-sm' }, `${p?.name || '—'} (${p?.sku || ''})`)
      },
    },
    {
      accessorKey: 'quantity',
      header: 'Qty',
      cell: ({ row }) => h('span', { class: 'tabular-nums block' }, Number(row.original.quantity).toFixed(3)),
    },
    {
      accessorKey: 'waste',
      header: 'Waste',
      cell: ({ row }) => h('span', { class: 'tabular-nums text-destructive block' }, Number(row.original.waste).toFixed(3)),
    },
    {
      accessorKey: 'costPerUnit',
      header: 'Cost/Unit',
      cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.costPerUnit).toFixed(2)),
    },
  ]
}

export function getProductivityColumns(): ColumnDef<WorkerProductivity>[] {
  return [
    {
      accessorKey: 'worker.name',
      header: 'Worker',
      cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.worker?.name || '—'),
    },
    {
      accessorKey: 'bagsPacked',
      header: 'Bags Packed',
      cell: ({ row }) => h('span', { class: 'tabular-nums block' }, String(row.original.bagsPacked)),
    },
    {
      accessorKey: 'rewardPerBag',
      header: 'Reward/Bag',
      cell: ({ row }) => h('span', { class: 'tabular-nums block' }, Number(row.original.rewardPerBag).toFixed(2)),
    },
    {
      accessorKey: 'totalReward',
      header: 'Total Reward',
      cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalReward).toFixed(2)),
    },
  ]
}

export function getBatchReportColumns(): ColumnDef<ProductionBatch>[] {
  return [
    {
      accessorKey: 'batchNumber',
      header: 'Batch #',
      cell: ({ row }) => h(NuxtLink, { to: `/production/${row.original.id}`, class: 'font-medium hover:underline' }, row.original.batchNumber),
    },
    {
      accessorKey: 'warehouse.name',
      header: 'Warehouse',
      cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.warehouse?.name || '—'),
    },
    {
      id: 'inputs',
      header: 'Inputs',
      cell: ({ row }) => {
        const total = row.original.consumptions?.reduce((s, c) => s + Number(c.quantity), 0) || 0
        return h('span', { class: 'tabular-nums block' }, total.toFixed(3))
      },
    },
    {
      id: 'output',
      header: 'Output',
      cell: ({ row }) => {
        const total = row.original.outputs?.reduce((s, o) => s + Number(o.quantity), 0) || 0
        return h('span', { class: 'tabular-nums block' }, total.toFixed(3))
      },
    },
    {
      id: 'waste',
      header: 'Waste',
      cell: ({ row }) => {
        const total = row.original.outputs?.reduce((s, o) => s + Number(o.waste), 0) || 0
        return h('span', { class: 'tabular-nums text-destructive block' }, total.toFixed(3))
      },
    },
    {
      id: 'efficiency',
      header: 'Efficiency',
      cell: ({ row }) => {
        const out = row.original.outputs?.reduce((s, o) => s + Number(o.quantity), 0) || 0
        const waste = row.original.outputs?.reduce((s, o) => s + Number(o.waste), 0) || 0
        const total = out + waste
        const pct = total > 0 ? (out / total) * 100 : 0
        return h('span', { class: 'tabular-nums block' }, `${pct.toFixed(1)}%`)
      },
    },
    {
      accessorKey: 'totalBatchCost',
      header: 'Cost',
      cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalBatchCost).toFixed(2)),
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, new Date(row.original.createdAt).toLocaleDateString()),
    },
  ]
}
