import { h } from 'vue'
import { MoreHorizontal, Eye, Pencil, Trash2, ImageOff, Package } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Product } from '../type'
import {
  NuxtLink,
  UiAvatar,
  UiAvatarFallback,
  UiBadge,
  UiButton,
  UiDropdownMenu,
  UiDropdownMenuTrigger,
  UiDropdownMenuContent,
  UiDropdownMenuItem,
  UiDropdownMenuSeparator,
} from '#components'

export interface ProductActions {
  onView: (id: string) => void
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

function typeVariant(type: string) {
  const map: Record<string, string> = {
    RAW_CHARCOAL: 'default',
    PACKAGED_CHARCOAL: 'secondary',
    OTHER: 'outline',
  }
  return map[type] || 'outline'
}

export function getProductColumns(actions: ProductActions): ColumnDef<Product>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Product',
      cell: ({ row }) => {
        const p = row.original
        return h('div', { class: 'flex items-center gap-3' }, [
          h('div', { class: 'size-9 flex items-center justify-center rounded-lg bg-muted overflow-hidden' }, [
            p.image
              ? h('img', { src: p.image, alt: p.name, class: 'size-full object-cover' })
              : h(ImageOff, { class: 'size-4 text-muted-foreground' }),
          ]),
          h('div', null, [
            h(NuxtLink, { to: `/products/${p.id}`, class: 'text-sm font-medium hover:underline' }, p.name),
            h('p', { class: 'text-xs text-muted-foreground' }, p.sku),
          ]),
        ])
      },
    },
    {
      accessorKey: 'nameAr',
      header: 'Name (AR)',
      cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.nameAr),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => h(UiBadge, { variant: typeVariant(row.original.type) as any, class: 'text-xs' }, row.original.type.replace('_', ' ')),
    },
    {
      id: 'stock',
      header: 'Stock',
      cell: ({ row }) => {
        const stocks = row.original.stocks
        if (!stocks || stocks.length === 0) return h('span', { class: 'text-xs text-muted-foreground' }, '—')
        const total = stocks.reduce((s, st) => s + Number(st.quantity), 0)
        return h('span', { class: 'text-sm font-medium' }, Number(total).toFixed(3))
      },
    },
    {
      accessorKey: 'sellingPrice',
      header: 'Price',
      cell: ({ row }) => {
        const price = row.original.sellingPrice
        return h('span', { class: 'text-sm' }, price ? `${Number(price).toFixed(2)}` : '—')
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => {
        const p = row.original
        return h('div', [
          h(UiDropdownMenu, null, {
            default: () => [
              h(UiDropdownMenuTrigger, { 'as-child': true }, {
                default: () => h(UiButton, { variant: 'ghost', size: 'icon-sm' }, {
                  default: () => h(MoreHorizontal, { class: 'size-4' }),
                }),
              }),
              h(UiDropdownMenuContent, { align: 'end', class: 'w-36' }, [
                h(UiDropdownMenuItem, { onClick: () => actions.onView(p.id) }, [
                  h(Eye, { class: 'size-4' }),
                  ' View',
                ]),
                h(UiDropdownMenuItem, { onClick: () => actions.onEdit(p) }, [
                  h(Pencil, { class: 'size-4' }),
                  ' Edit',
                ]),
                h(UiDropdownMenuSeparator),
                h(UiDropdownMenuItem, { variant: 'destructive', onClick: () => actions.onDelete(p) }, [
                  h(Trash2, { class: 'size-4' }),
                  ' Delete',
                ]),
              ]),
            ],
          }),
        ])
      },
    },
  ]
}
