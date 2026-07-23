import { defineStore } from 'pinia';
import { ref } from 'vue';

async function fetchCustomersApi(params) {
  return $fetch("/api/customers", { params });
}
async function fetchCustomerApi(id) {
  return $fetch(`/api/customers/${id}`);
}
async function createCustomerApi(payload) {
  return $fetch("/api/customers", { method: "POST", body: payload });
}
async function updateCustomerApi(id, payload) {
  return $fetch(`/api/customers/${id}`, { method: "PATCH", body: payload });
}
async function deleteCustomerApi(id) {
  await $fetch(`/api/customers/${id}`, { method: "DELETE" });
}
async function fetchCustomersLookupApi(params) {
  return $fetch("/api/customers/lookup", { params });
}
const useCustomersStore = defineStore("customers", () => {
  const customers = ref([]);
  const currentCustomer = ref(null);
  const loading = ref(false);
  const total = ref(0);
  async function fetchCustomers(params) {
    loading.value = true;
    try {
      const data = await fetchCustomersApi(params);
      customers.value = data.customers;
      total.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function fetchCustomer(id) {
    loading.value = true;
    try {
      const data = await fetchCustomerApi(id);
      currentCustomer.value = data.customer;
      return data.customer;
    } finally {
      loading.value = false;
    }
  }
  async function createCustomer(payload) {
    loading.value = true;
    try {
      const data = await createCustomerApi(payload);
      customers.value.unshift(data.customer);
      return data.customer;
    } finally {
      loading.value = false;
    }
  }
  async function updateCustomer(id, payload) {
    loading.value = true;
    try {
      const data = await updateCustomerApi(id, payload);
      const idx = customers.value.findIndex((c) => c.id === id);
      if (idx !== -1) customers.value[idx] = data.customer;
      if (currentCustomer.value?.id === id) currentCustomer.value = data.customer;
      return data.customer;
    } finally {
      loading.value = false;
    }
  }
  async function deleteCustomer(id) {
    loading.value = true;
    try {
      await deleteCustomerApi(id);
      customers.value = customers.value.filter((c) => c.id !== id);
      if (currentCustomer.value?.id === id) currentCustomer.value = null;
    } finally {
      loading.value = false;
    }
  }
  function clearCurrent() {
    currentCustomer.value = null;
  }
  return {
    customers,
    currentCustomer,
    loading,
    total,
    fetchCustomers,
    fetchCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    clearCurrent
  };
});

export { fetchCustomersLookupApi as f, useCustomersStore as u };
//# sourceMappingURL=store-KONj_zbv.mjs.map
