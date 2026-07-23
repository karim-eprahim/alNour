import { defineStore } from 'pinia';
import { ref } from 'vue';

async function fetchPurchasesApi(params) {
  return $fetch("/api/purchases", { params });
}
async function fetchPurchaseApi(id) {
  return $fetch(`/api/purchases/${id}`);
}
async function createPurchaseApi(payload) {
  return $fetch("/api/purchases", { method: "POST", body: payload });
}
async function payPurchaseApi(id, payload) {
  return $fetch(`/api/purchases/${id}/pay`, { method: "POST", body: payload });
}
async function createWeightTicketApi(payload) {
  return $fetch("/api/purchases/weight-tickets", { method: "POST", body: payload });
}
async function deleteWeightTicketApi(id) {
  await $fetch(`/api/purchases/weight-tickets/${id}`, { method: "DELETE" });
}
async function fetchPurchaseReportApi(params) {
  return $fetch("/api/purchases/report", { params });
}
const usePurchasesStore = defineStore("purchases", () => {
  const invoices = ref([]);
  const currentInvoice = ref(null);
  const loading = ref(false);
  const total = ref(0);
  const reportInvoices = ref([]);
  const reportSummary = ref(null);
  async function fetchPurchases(params) {
    loading.value = true;
    try {
      const data = await fetchPurchasesApi(params);
      invoices.value = data.invoices;
      total.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function fetchPurchase(id) {
    loading.value = true;
    try {
      const data = await fetchPurchaseApi(id);
      currentInvoice.value = data.invoice;
      return data.invoice;
    } finally {
      loading.value = false;
    }
  }
  async function createPurchase(payload) {
    loading.value = true;
    try {
      const data = await createPurchaseApi(payload);
      invoices.value.unshift(data.invoice);
      return data.invoice;
    } finally {
      loading.value = false;
    }
  }
  async function payInvoice(id, payload) {
    loading.value = true;
    try {
      const data = await payPurchaseApi(id, payload);
      const idx = invoices.value.findIndex((i) => i.id === id);
      if (idx !== -1) invoices.value[idx] = data.invoice;
      if (currentInvoice.value?.id === id) currentInvoice.value = data.invoice;
      return data.invoice;
    } finally {
      loading.value = false;
    }
  }
  async function fetchReport(params) {
    loading.value = true;
    try {
      const data = await fetchPurchaseReportApi(params);
      reportInvoices.value = data.invoices;
      reportSummary.value = data.summary;
      return data;
    } finally {
      loading.value = false;
    }
  }
  function clearCurrent() {
    currentInvoice.value = null;
  }
  return {
    invoices,
    currentInvoice,
    loading,
    total,
    reportInvoices,
    reportSummary,
    fetchPurchases,
    fetchPurchase,
    createPurchase,
    payInvoice,
    fetchReport,
    clearCurrent
  };
});

export { createWeightTicketApi as c, deleteWeightTicketApi as d, usePurchasesStore as u };
//# sourceMappingURL=store-B0h3miBc.mjs.map
