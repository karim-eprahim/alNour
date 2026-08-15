import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

async function fetchCustodyApi(distributorId) {
  return $fetch("/api/distributors/custody", { params: { distributorId } });
}
async function fetchDistributorOrdersApi(params) {
  return $fetch("/api/distributors/orders", { params });
}
async function fetchDistributorOrderApi(id) {
  return $fetch(`/api/distributors/orders/${id}`);
}
async function updateDistributorOrderStatusApi(id, status) {
  return $fetch(`/api/distributors/orders/${id}/status`, { method: "POST", body: { status } });
}
async function confirmDeliveryApi(id, payload) {
  return $fetch(`/api/distributors/orders/${id}/deliver`, { method: "POST", body: payload });
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
async function fetchRecentCustomersApi() {
  return $fetch("/api/distributors/customers/recent");
}
async function fetchCashMovementsApi(params) {
  return $fetch("/api/distributors/cash/movements", { params });
}
async function fetchDistributorSettlementsApi(params) {
  return $fetch("/api/distributors/settlements", { params });
}
async function createDistributorSettlementApi(payload) {
  return $fetch("/api/distributors/settlements", { method: "POST", body: payload });
}
const useDistributorStore = defineStore("distributor", () => {
  const custodies = ref([]);
  const custodyTotalItems = ref(0);
  const custodyTotalValue = ref(0);
  const orders = ref([]);
  const ordersTotal = ref(0);
  const ordersSummary = ref({});
  const currentOrder = ref(null);
  const invoices = ref([]);
  const invoicesTotal = ref(0);
  const cashOnHand = ref(0);
  const cashMovements = ref([]);
  const cashMovementsTotal = ref(0);
  const settlements = ref([]);
  const settlementsTotal = ref(0);
  const settlementSummary = ref({ collected: 0, confirmed: 0, custody: 0 });
  const recentCustomers = ref([]);
  const loading = ref(false);
  async function fetchCustody(distributorId) {
    loading.value = true;
    try {
      const data = await fetchCustodyApi(distributorId);
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
      ordersSummary.value = data.summary || {};
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function fetchOrder(id) {
    loading.value = true;
    try {
      const data = await fetchDistributorOrderApi(id);
      currentOrder.value = data.order;
      return data.order;
    } finally {
      loading.value = false;
    }
  }
  async function updateOrderStatus(id, status) {
    loading.value = true;
    try {
      const data = await updateDistributorOrderStatusApi(id, status);
      const newStatus = data.order.status;
      if (currentOrder.value) currentOrder.value.status = newStatus;
      const idx = orders.value.findIndex((o) => o.id === id);
      if (idx !== -1 && orders.value[idx]) orders.value[idx].status = newStatus;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function confirmDelivery(id, payload) {
    loading.value = true;
    try {
      const data = await confirmDeliveryApi(id, payload);
      const idx = orders.value.findIndex((o) => o.id === id);
      if (idx !== -1 && orders.value[idx]) {
        orders.value[idx].status = data.order.status;
        orders.value[idx].deliveryResult = data.order.deliveryResult;
      }
      return data;
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
      const custody2 = custodies.value.find((c) => c.productId === payload.productId);
      if (custody2) {
        custody2.quantity -= payload.quantity;
        if (custody2.quantity <= 0) {
          custodies.value = custodies.value.filter((c) => c.productId !== payload.productId);
        }
      }
      custodyTotalItems.value = Math.max(0, custodyTotalItems.value - payload.quantity);
      return data;
    } finally {
      loading.value = false;
    }
  }
  const custody = computed(() => {
    if (custodies.value.length === 0) return null;
    return {
      items: custodies.value,
      warehouseName: ""
    };
  });
  async function fetchRecentCustomers() {
    try {
      const data = await fetchRecentCustomersApi();
      recentCustomers.value = data.customers;
    } catch {
      recentCustomers.value = [];
    }
  }
  async function createReturn(payload) {
    loading.value = true;
    try {
      const results = [];
      for (const item of payload.items) {
        const data = await returnInventoryApi({
          productId: item.productId,
          warehouseId: payload.warehouseId,
          quantity: item.quantity,
          notes: payload.notes
        });
        results.push(data);
      }
      return results;
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
  const custodyBalance = computed(() => settlementSummary.value.custody || 0);
  async function fetchSettlements(params) {
    loading.value = true;
    try {
      const data = await fetchDistributorSettlementsApi(params);
      settlements.value = data.settlements;
      settlementsTotal.value = data.total;
      settlementSummary.value = data.summary;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function createSettlement(payload) {
    loading.value = true;
    try {
      const data = await createDistributorSettlementApi(payload);
      settlements.value.unshift(data.settlement);
      await fetchSettlements();
      return data.settlement;
    } finally {
      loading.value = false;
    }
  }
  return {
    custodies,
    custodyTotalItems,
    custodyTotalValue,
    custody,
    orders,
    ordersTotal,
    ordersSummary,
    currentOrder,
    invoices,
    invoicesTotal,
    cashOnHand,
    cashMovements,
    cashMovementsTotal,
    settlements,
    settlementsTotal,
    settlementSummary,
    custodyBalance,
    recentCustomers,
    loading,
    fetchCustody,
    fetchOrders,
    fetchOrder,
    updateOrderStatus,
    confirmDelivery,
    createDirectSale,
    createReturn,
    fetchInvoices,
    payInvoice,
    returnInventory,
    fetchRecentCustomers,
    fetchCashOnHand,
    fetchCashMovements,
    fetchSettlements,
    createSettlement
  };
});

export { useDistributorStore as u };
//# sourceMappingURL=store-D4WyITIu.mjs.map
