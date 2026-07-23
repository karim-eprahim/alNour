import { defineStore } from 'pinia';
import { ref } from 'vue';

async function fetchSalesOrdersApi(params) {
  return $fetch("/api/sales", { params });
}
async function fetchSalesOrderApi(id) {
  return $fetch(`/api/sales/${id}`);
}
async function createSalesOrderApi(payload) {
  return $fetch("/api/sales", { method: "POST", body: payload });
}
async function updateSalesOrderApi(id, payload) {
  return $fetch(`/api/sales/${id}`, { method: "PATCH", body: payload });
}
async function deleteSalesOrderApi(id) {
  await $fetch(`/api/sales/${id}`, { method: "DELETE" });
}
async function fetchInvoicesApi(params) {
  return $fetch("/api/invoices", { params });
}
async function fetchInvoiceApi(id) {
  return $fetch(`/api/invoices/${id}`);
}
async function payInvoiceApi(id, payload) {
  return $fetch(`/api/invoices/${id}/pay`, { method: "POST", body: payload });
}
const useSalesStore = defineStore("sales", () => {
  const orders = ref([]);
  const currentOrder = ref(null);
  const invoices = ref([]);
  const currentInvoice = ref(null);
  const loading = ref(false);
  const total = ref(0);
  const totalInvoices = ref(0);
  async function fetchOrders(params) {
    loading.value = true;
    try {
      const data = await fetchSalesOrdersApi(params);
      orders.value = data.orders;
      total.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function fetchOrder(id) {
    loading.value = true;
    try {
      const data = await fetchSalesOrderApi(id);
      currentOrder.value = data.order;
      return data.order;
    } finally {
      loading.value = false;
    }
  }
  async function createOrder(payload) {
    loading.value = true;
    try {
      const data = await createSalesOrderApi(payload);
      orders.value.unshift(data.order);
      return data.order;
    } finally {
      loading.value = false;
    }
  }
  async function updateOrder(id, payload) {
    loading.value = true;
    try {
      const data = await updateSalesOrderApi(id, payload);
      const idx = orders.value.findIndex((o) => o.id === id);
      if (idx !== -1) orders.value[idx] = data.order;
      if (currentOrder.value?.id === id) currentOrder.value = data.order;
      return data.order;
    } finally {
      loading.value = false;
    }
  }
  async function deleteOrder(id) {
    loading.value = true;
    try {
      await deleteSalesOrderApi(id);
      orders.value = orders.value.filter((o) => o.id !== id);
      if (currentOrder.value?.id === id) currentOrder.value = null;
    } finally {
      loading.value = false;
    }
  }
  async function fetchInvoices(params) {
    loading.value = true;
    try {
      const data = await fetchInvoicesApi(params);
      invoices.value = data.invoices;
      totalInvoices.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function fetchInvoice(id) {
    loading.value = true;
    try {
      const data = await fetchInvoiceApi(id);
      currentInvoice.value = data.invoice;
      return data.invoice;
    } finally {
      loading.value = false;
    }
  }
  async function payInvoice(id, payload) {
    loading.value = true;
    try {
      const data = await payInvoiceApi(id, payload);
      if (currentInvoice.value) {
        currentInvoice.value.paidAmount = (currentInvoice.value.paidAmount || 0) + payload.amount;
        currentInvoice.value.status = currentInvoice.value.paidAmount >= currentInvoice.value.totalAmount ? "PAID" : "PARTIAL";
        if (!currentInvoice.value.payments) currentInvoice.value.payments = [];
        currentInvoice.value.payments.unshift(data.payment);
      }
      return data.payment;
    } finally {
      loading.value = false;
    }
  }
  function clearCurrent() {
    currentOrder.value = null;
    currentInvoice.value = null;
  }
  return {
    orders,
    currentOrder,
    invoices,
    currentInvoice,
    loading,
    total,
    totalInvoices,
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    fetchInvoices,
    fetchInvoice,
    payInvoice,
    clearCurrent
  };
});

export { useSalesStore as u };
//# sourceMappingURL=store-Cqw4f2fz.mjs.map
