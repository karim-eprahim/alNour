import { h } from 'vue'
import { Eye } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { DistributorOrder } from '../type'
import { UiBadge, UiButton, NuxtLink } from '#components'

export interface DistributorOrderActions {
  onView: (id: string) => void
}

export function orderStatusVariant(s: string) {
  const map: Record<string, string> = {
    ASSIGNED: 'default',
    ACCEPTED: 'warning',
    OUT_FOR_DELIVERY: 'default',
    COMPLETED: 'success',
    CANCELLED: 'destructive',
  }
  return (map[s] || 'secondary') as any
}

export function orderStatusLabel(s: string) {
  const map: Record<string, string> = {
    ASSIGNED: 'Assigned',
    ACCEPTED: 'Accepted',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
  }
  return map[s] || s
}

export function deliveryResultVariant(r: string) {
  const map: Record<string, string> = {
    FULL: 'success',
    PARTIAL: 'warning',
    FAILED: 'destructive',
    CANCELLED: 'destructive',
    NONE: 'secondary',
  }
  return (map[r] || 'secondary') as any
}

export function deliveryResultLabel(r: string) {
  const map: Record<string, string> = {
    FULL: 'Full Delivery',
    PARTIAL: 'Partial Delivery',
    FAILED: 'Delivery Failed',
    CANCELLED: 'Cancelled',
    NONE: 'Not Delivered',
  }
  return map[r] || r
}

export function priorityVariant(p: string) {
  return (p === 'URGENT' ? 'destructive' : 'secondary') as any
}

export function getDistributorOrderColumns(actions: DistributorOrderActions): ColumnDef<DistributorOrder>[] {
  return [
    {
      accessorKey: 'orderNumber',
      header: 'Order Number',
      cell: ({ row }) => h(NuxtLink, { to: `/distributor/orders/${row.original.id}`, class: 'font-medium hover:underline' }, row.original.orderNumber),
    },
    {
      accessorKey: 'customer.name',
      header: 'Customer',
      cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.customer?.name || '—'),
    },
    {
      accessorKey: 'customer.phone',
      header: 'Phone',
      cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, row.original.customer?.phone || '—'),
    },
    {
      accessorKey: 'expectedDeliveryDate',
      header: 'Delivery Date',
      cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, row.original.expectedDeliveryDate ? new Date(row.original.expectedDeliveryDate).toLocaleDateString() : '—'),
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => h(UiBadge, { variant: priorityVariant(row.original.priority), class: 'text-xs' }, row.original.priority || 'NORMAL'),
    },
    {
      accessorKey: 'totalAmount',
      header: 'Total',
      cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalAmount).toFixed(2)),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => h(UiBadge, { variant: orderStatusVariant(row.original.status), class: 'text-xs' }, orderStatusLabel(row.original.status)),
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => h(UiButton, { variant: 'ghost', size: 'icon-xs', onClick: () => actions.onView(row.original.id) }, () => h(Eye, { class: 'size-3.5' })),
    },
  ]
}
