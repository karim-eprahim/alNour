import { h } from 'vue';
import { Eye } from '@lucide/vue';
import { _ as _sfc_main } from './index-BJ9JiLtz.mjs';
import { _ as _sfc_main$1 } from './index-CUpQupPt.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CZynLBtj.mjs';

function orderStatusVariant(s) {
  const map = {
    ASSIGNED: "default",
    ACCEPTED: "warning",
    OUT_FOR_DELIVERY: "default",
    COMPLETED: "success",
    CANCELLED: "destructive"
  };
  return map[s] || "secondary";
}
function orderStatusLabel(s) {
  const map = {
    ASSIGNED: "Assigned",
    ACCEPTED: "Accepted",
    OUT_FOR_DELIVERY: "Out for Delivery",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled"
  };
  return map[s] || s;
}
function deliveryResultVariant(r) {
  const map = {
    FULL: "success",
    PARTIAL: "warning",
    FAILED: "destructive",
    CANCELLED: "destructive",
    NONE: "secondary"
  };
  return map[r] || "secondary";
}
function deliveryResultLabel(r) {
  const map = {
    FULL: "Full Delivery",
    PARTIAL: "Partial Delivery",
    FAILED: "Delivery Failed",
    CANCELLED: "Cancelled",
    NONE: "Not Delivered"
  };
  return map[r] || r;
}
function priorityVariant(p) {
  return p === "URGENT" ? "destructive" : "secondary";
}
function getDistributorOrderColumns(actions) {
  return [
    {
      accessorKey: "orderNumber",
      header: "Order Number",
      cell: ({ row }) => h(__nuxt_component_0, { to: `/distributor/orders/${row.original.id}`, class: "font-medium hover:underline" }, row.original.orderNumber)
    },
    {
      accessorKey: "customer.name",
      header: "Customer",
      cell: ({ row }) => h("span", { class: "text-sm" }, row.original.customer?.name || "—")
    },
    {
      accessorKey: "customer.phone",
      header: "Phone",
      cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, row.original.customer?.phone || "—")
    },
    {
      accessorKey: "expectedDeliveryDate",
      header: "Delivery Date",
      cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, row.original.expectedDeliveryDate ? new Date(row.original.expectedDeliveryDate).toLocaleDateString() : "—")
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => h(_sfc_main, { variant: priorityVariant(row.original.priority), class: "text-xs" }, row.original.priority || "NORMAL")
    },
    {
      accessorKey: "totalAmount",
      header: "Total",
      cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.totalAmount).toFixed(2))
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => h(_sfc_main, { variant: orderStatusVariant(row.original.status), class: "text-xs" }, orderStatusLabel(row.original.status))
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => h(_sfc_main$1, { variant: "ghost", size: "icon-xs", onClick: () => actions.onView(row.original.id) }, () => h(Eye, { class: "size-3.5" }))
    }
  ];
}

export { orderStatusLabel as a, deliveryResultLabel as b, deliveryResultVariant as d, getDistributorOrderColumns as g, orderStatusVariant as o, priorityVariant as p };
//# sourceMappingURL=orderColumns-HgPmrwV4.mjs.map
