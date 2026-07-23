import { h } from 'vue';
import { DollarSign, Eye } from '@lucide/vue';
import { b as usePermissions } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-B_K_Hg2R.mjs';
import { _ as _sfc_main } from './index-DcmArl0H.mjs';
import { _ as _sfc_main$1 } from './index-OEEPQgbM.mjs';

function orderStatusVariant(s) {
  const map = { PENDING: "secondary", CONFIRMED: "warning", COMPLETED: "success", CANCELLED: "destructive" };
  return map[s] || "secondary";
}
function invoiceStatusVariant(s) {
  const map = { UNPAID: "destructive", PARTIAL: "warning", PAID: "success", CANCELLED: "secondary" };
  return map[s] || "secondary";
}
function getOrderColumns(actions) {
  return [
    {
      accessorKey: "orderNumber",
      header: "Order #",
      cell: ({ row }) => h(__nuxt_component_0, { to: `/sales/${row.original.id}`, class: "font-medium hover:underline" }, row.original.orderNumber)
    },
    {
      accessorKey: "customer.name",
      header: "Customer",
      cell: ({ row }) => h("span", { class: "text-sm" }, row.original.customer?.name || "—")
    },
    {
      accessorKey: "warehouse.name",
      header: "Warehouse",
      cell: ({ row }) => h("span", { class: "text-muted-foreground text-sm" }, row.original.warehouse?.name || "—")
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => h(_sfc_main, { variant: orderStatusVariant(row.original.status), class: "text-xs" }, row.original.status)
    },
    {
      id: "items",
      header: "Items",
      cell: ({ row }) => h("span", { class: "tabular-nums block" }, String(row.original._count?.items ?? 0))
    },
    {
      accessorKey: "totalAmount",
      header: "Total",
      cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.totalAmount).toFixed(2))
    },
    {
      id: "paid",
      header: "Paid",
      cell: ({ row }) => {
        const paid = row.original.invoices?.reduce((s, inv) => s + Number(inv.paidAmount), 0) || 0;
        return h("span", { class: "tabular-nums block" }, paid.toFixed(2));
      }
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, new Date(row.original.createdAt).toLocaleDateString())
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const { can } = usePermissions();
        if (!can("SALES", "READ")) return h("span");
        return h(_sfc_main$1, { variant: "ghost", size: "icon-xs", onClick: () => actions.onView(row.original.id) }, () => h(Eye, { class: "size-3.5" }));
      }
    }
  ];
}
function getOrderItemColumns() {
  return [
    {
      accessorKey: "product.name",
      header: "Product",
      cell: ({ row }) => {
        const item = row.original;
        return h(__nuxt_component_0, { to: `/products/${item.productId}`, class: "hover:underline" }, `${item.product?.name || "—"} (${item.product?.sku || ""})`);
      }
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => h("span", { class: "tabular-nums block" }, Number(row.original.quantity).toFixed(3))
    },
    {
      accessorKey: "unitPrice",
      header: "Unit Price",
      cell: ({ row }) => h("span", { class: "tabular-nums block" }, Number(row.original.unitPrice).toFixed(2))
    },
    {
      accessorKey: "totalPrice",
      header: "Total",
      cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.totalPrice).toFixed(2))
    }
  ];
}
function getInvoiceColumns(actions) {
  return [
    {
      accessorKey: "invoiceNumber",
      header: "Invoice #",
      cell: ({ row }) => h("span", { class: "font-medium" }, row.original.invoiceNumber)
    },
    {
      accessorKey: "customer.name",
      header: "Customer",
      cell: ({ row }) => h("span", { class: "text-sm" }, row.original.customer?.name || "—")
    },
    {
      accessorKey: "salesOrder.orderNumber",
      header: "Order",
      cell: ({ row }) => h("span", { class: "text-muted-foreground text-sm" }, row.original.salesOrder?.orderNumber || "—")
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => h(_sfc_main, { variant: invoiceStatusVariant(row.original.status), class: "text-xs" }, row.original.status)
    },
    {
      accessorKey: "totalAmount",
      header: "Total",
      cell: ({ row }) => h("span", { class: "tabular-nums block" }, Number(row.original.totalAmount).toFixed(2))
    },
    {
      accessorKey: "paidAmount",
      header: "Paid",
      cell: ({ row }) => h("span", { class: "tabular-nums text-green-600 block" }, Number(row.original.paidAmount).toFixed(2))
    },
    {
      id: "due",
      header: "Due",
      cell: ({ row }) => {
        const due = Number(row.original.totalAmount) - Number(row.original.paidAmount);
        return h("span", { class: "tabular-nums font-medium text-destructive block" }, due.toFixed(2));
      }
    },
    {
      id: "payments",
      header: "Payments",
      cell: ({ row }) => h("span", { class: "tabular-nums block" }, String(row.original._count?.payments ?? 0))
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, new Date(row.original.createdAt).toLocaleDateString())
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const inv = row.original;
        const due = Number(inv.totalAmount) - Number(inv.paidAmount);
        const { can } = usePermissions();
        const buttons = [];
        if (can("SALES", "UPDATE") && due > 0) {
          buttons.push(h(_sfc_main$1, { variant: "ghost", size: "icon-xs", onClick: () => actions.onPay(inv) }, () => h(DollarSign, { class: "size-3.5" })));
        }
        if (can("SALES", "READ")) {
          buttons.push(h(_sfc_main$1, { variant: "ghost", size: "icon-xs", onClick: () => actions.onViewOrder(inv.salesOrderId) }, () => h(Eye, { class: "size-3.5" })));
        }
        return h("div", { class: "flex gap-1" }, buttons);
      }
    }
  ];
}

export { getOrderColumns as a, getOrderItemColumns as b, getInvoiceColumns as g };
//# sourceMappingURL=column-Cts9qjtS.mjs.map
