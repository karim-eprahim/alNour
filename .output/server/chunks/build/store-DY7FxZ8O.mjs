import { defineStore } from 'pinia';
import { ref } from 'vue';
import { d as deleteCustomerApi, u as updateCustomerApi, c as createCustomerApi, f as fetchCustomerApi, a as fetchCustomersApi } from './api-BZnrPRgb.mjs';

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

export { useCustomersStore as u };
//# sourceMappingURL=store-DY7FxZ8O.mjs.map
