import { defineStore } from 'pinia';
import { ref } from 'vue';

async function fetchCustodyApi() {
  return $fetch("/api/distributors/custody");
}
async function fetchDistributorOrdersApi(params) {
  return $fetch("/api/distributors/orders", { params });
}
async function completeDeliveryApi(id, payload) {
  return $fetch(`/api/distributors/orders/${id}/complete`, { method: "POST", body: payload });
}
async function createDirectSaleApi(payload) {
  return $fetch("/api/distributors/sales", { method: "POST", body: payload });
}
async function fetchDistributorInvoicesApi(params) {
  return $fetch("/api/invoices", { params: { ...params, saleSource: "DIRECT_DISTRIBUTOR" } });
}
async function payInvoiceApi(id, payload) {
  return $fetch(`/api/invoices/${id}/pay`, { method: "POST", body: payload });
}
async function returnInventoryApi(payload) {
  return $fetch("/api/distributors/return", { method: "POST", body: payload });
}
async function fetchCashOnHandApi(distributorId) {
  return $fetch("/api/distributors/cash", { params: { distributorId } });
}
async function fetchCashMovementsApi(params) {
  return $fetch("/api/distributors/cash/movements", { params });
}
const useDistributorStore = defineStore("distributor", () => {
  const custodies = ref([]);
  const custodyTotalItems = ref(0);
  const custodyTotalValue = ref(0);
  const orders = ref([]);
  const ordersTotal = ref(0);
  const invoices = ref([]);
  const invoicesTotal = ref(0);
  const cashOnHand = ref(0);
  const cashMovements = ref([]);
  const cashMovementsTotal = ref(0);
  const loading = ref(false);
  async function fetchCustody() {
    loading.value = true;
    try {
      const data = await fetchCustodyApi();
      custodies.value = data.custodies;
      custodyTotalItems.value = data.totalItems;
      custodyTotalValue.value = data.totalValue;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function fetchOrders(params) {
    loading.value = true;
    try {
      const data = await fetchDistributorOrdersApi(params);
      orders.value = data.orders;
      ordersTotal.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function completeDelivery(id, payload) {
    loading.value = true;
    try {
      const data = await completeDeliveryApi(id, payload);
      const idx = orders.value.findIndex((o) => o.id === id);
      if (idx !== -1) orders.value[idx].status = "DELIVERED";
      return data.invoice;
    } finally {
      loading.value = false;
    }
  }
  async function createDirectSale(payload) {
    loading.value = true;
    try {
      const data = await createDirectSaleApi(payload);
      invoices.value.unshift(data.invoice);
      return data.invoice;
    } finally {
      loading.value = false;
    }
  }
  async function fetchInvoices(params) {
    loading.value = true;
    try {
      const data = await fetchDistributorInvoicesApi(params);
      invoices.value = data.invoices;
      invoicesTotal.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function payInvoice(id, payload) {
    loading.value = true;
    try {
      const data = await payInvoiceApi(id, payload);
      const inv = invoices.value.find((i) => i.id === id);
      if (inv) {
        inv.paidAmount = (inv.paidAmount || 0) + payload.amount;
        inv.status = inv.paidAmount >= inv.totalAmount ? "PAID" : "PARTIAL";
        if (!inv.payments) inv.payments = [];
        inv.payments.unshift(data.payment);
      }
      return data.payment;
    } finally {
      loading.value = false;
    }
  }
  async function returnInventory(payload) {
    loading.value = true;
    try {
      const data = await returnInventoryApi(payload);
      const custody = custodies.value.find((c) => c.productId === payload.productId);
      if (custody) {
        custody.quantity -= payload.quantity;
        if (custody.quantity <= 0) {
          custodies.value = custodies.value.filter((c) => c.productId !== payload.productId);
        }
      }
      custodyTotalItems.value = Math.max(0, custodyTotalItems.value - payload.quantity);
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function fetchCashOnHand() {
    try {
      const data = await fetchCashOnHandApi();
      cashOnHand.value = data.distributor.cashOnHand;
      return data.distributor;
    } finally {
    }
  }
  async function fetchCashMovements(params) {
    loading.value = true;
    try {
      const data = await fetchCashMovementsApi(params);
      cashMovements.value = data.movements;
      cashMovementsTotal.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  return {
    custodies,
    custodyTotalItems,
    custodyTotalValue,
    orders,
    ordersTotal,
    invoices,
    invoicesTotal,
    cashOnHand,
    cashMovements,
    cashMovementsTotal,
    loading,
    fetchCustody,
    fetchOrders,
    completeDelivery,
    createDirectSale,
    fetchInvoices,
    payInvoice,
    returnInventory,
    fetchCashOnHand,
    fetchCashMovements
  };
});

export { useDistributorStore as u };
//# sourceMappingURL=store-c63gT4nW.mjs.map
