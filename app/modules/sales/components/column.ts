import { h } from 'vue'
import { Eye, DollarSign } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { SalesOrder, Invoice, SalesOrderItem } from '../type'
import {
  NuxtLink,
  UiBadge,
  UiButton,
} from '#components'

export interface OrderActions {
  onView: (id: string) => void
}

export interface InvoiceActions {
  onPay: (invoice: Invoice) => void
  onViewOrder: (orderId: string) => void
}

function orderStatusVariant(s: string) {
  const map: Record<string, string> = { PENDING: 'secondary', CONFIRMED: 'warning', COMPLETED: 'success', CANCELLED: 'destructive' }
  return map[s] || 'secondary'
}

function invoiceStatusVariant(s: string) {
  const map: Record<string, string> = { UNPAID: 'destructive', PARTIAL: 'warning', PAID: 'success', CANCELLED: 'secondary' }
  return map[s] || 'secondary'
}

export function getOrderColumns(actions: OrderActions): ColumnDef<SalesOrder>[] {
  return [
    {
      accessorKey: 'orderNumber',
      header: 'Order #',
      cell: ({ row }) => h(NuxtLink, { to: `/sales/${row.original.id}`, class: 'font-medium hover:underline' }, row.original.orderNumber),
    },
    {
      accessorKey: 'customer.name',
      header: 'Customer',
      cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.customer?.name || '—'),
    },
    {
      accessorKey: 'warehouse.name',
      header: 'Warehouse',
      cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, row.original.warehouse?.name || '—'),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => h(UiBadge, { variant: orderStatusVariant(row.original.status) as any, class: 'text-xs' }, row.original.status),
    },
    {
      id: 'items',
      header: 'Items',
      cell: ({ row }) => h('span', { class: 'tabular-nums block' }, String(row.original._count?.items ?? 0)),
    },
    {
      accessorKey: 'totalAmount',
      header: 'Total',
      cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalAmount).toFixed(2)),
    },
    {
      id: 'paid',
      header: 'Paid',
      cell: ({ row }) => {
        const paid = row.original.invoices?.reduce((s, inv) => s + Number(inv.paidAmount), 0) || 0
        return h('span', { class: 'tabular-nums block' }, paid.toFixed(2))
      },
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
      cell: ({ row }) => h(UiButton, { variant: 'ghost', size: 'icon-xs', onClick: () => actions.onView(row.original.id) }, () => h(Eye, { class: 'size-3.5' })),
    },
  ]
}

export function getOrderItemColumns(): ColumnDef<SalesOrderItem>[] {
  return [
    {
      accessorKey: 'product.name',
      header: 'Product',
      cell: ({ row }) => {
        const item = row.original
        return h(NuxtLink, { to: `/products/${item.productId}`, class: 'hover:underline' }, `${item.product?.name || '—'} (${item.product?.sku || ''})`)
      },
    },
    {
      accessorKey: 'quantity',
      header: 'Qty',
      cell: ({ row }) => h('span', { class: 'tabular-nums block' }, Number(row.original.quantity).toFixed(3)),
    },
    {
      accessorKey: 'unitPrice',
      header: 'Unit Price',
      cell: ({ row }) => h('span', { class: 'tabular-nums block' }, Number(row.original.unitPrice).toFixed(2)),
    },
    {
      accessorKey: 'totalPrice',
      header: 'Total',
      cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalPrice).toFixed(2)),
    },
  ]
}

export function getInvoiceColumns(actions: InvoiceActions): ColumnDef<Invoice>[] {
  return [
    {
      accessorKey: 'invoiceNumber',
      header: 'Invoice #',
      cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.invoiceNumber),
    },
    {
      accessorKey: 'customer.name',
      header: 'Customer',
      cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.customer?.name || '—'),
    },
    {
      accessorKey: 'salesOrder.orderNumber',
      header: 'Order',
      cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, row.original.salesOrder?.orderNumber || '—'),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => h(UiBadge, { variant: invoiceStatusVariant(row.original.status) as any, class: 'text-xs' }, row.original.status),
    },
    {
      accessorKey: 'totalAmount',
      header: 'Total',
      cell: ({ row }) => h('span', { class: 'tabular-nums block' }, Number(row.original.totalAmount).toFixed(2)),
    },
    {
      accessorKey: 'paidAmount',
      header: 'Paid',
      cell: ({ row }) => h('span', { class: 'tabular-nums text-green-600 block' }, Number(row.original.paidAmount).toFixed(2)),
    },
    {
      id: 'due',
      header: 'Due',
      cell: ({ row }) => {
        const due = Number(row.original.totalAmount) - Number(row.original.paidAmount)
        return h('span', { class: 'tabular-nums font-medium text-destructive block' }, due.toFixed(2))
      },
    },
    {
      id: 'payments',
      header: 'Payments',
      cell: ({ row }) => h('span', { class: 'tabular-nums block' }, String(row.original._count?.payments ?? 0)),
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
        const inv = row.original
        const due = Number(inv.totalAmount) - Number(inv.paidAmount)
        return h('div', { class: 'flex gap-1' }, [
          h(UiButton, { variant: 'ghost', size: 'icon-xs', disabled: due <= 0, onClick: () => actions.onPay(inv) }, () => h(DollarSign, { class: 'size-3.5' })),
          h(UiButton, { variant: 'ghost', size: 'icon-xs', onClick: () => actions.onViewOrder(inv.salesOrderId) }, () => h(Eye, { class: 'size-3.5' })),
        ])
      },
    },
  ]
}
