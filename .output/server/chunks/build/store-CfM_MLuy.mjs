import { defineStore } from 'pinia';
import { ref } from 'vue';
import { d as deleteWarehouseApi, u as updateWarehouseApi, c as createWarehouseApi, a as fetchWarehouseApi, b as fetchWarehousesApi } from './api-CBXtItch.mjs';

const useWarehousesStore = defineStore("warehouses", () => {
  const warehouses = ref([]);
  const currentWarehouse = ref(null);
  const loading = ref(false);
  const total = ref(0);
  async function fetchWarehouses(params) {
    loading.value = true;
    try {
      const data = await fetchWarehousesApi(params);
      warehouses.value = data.warehouses;
      total.value = data.total;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function fetchWarehouse(id) {
    loading.value = true;
    try {
      const data = await fetchWarehouseApi(id);
      currentWarehouse.value = data.warehouse;
      return data.warehouse;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function createWarehouse(payload) {
    loading.value = true;
    try {
      const data = await createWarehouseApi(payload);
      warehouses.value.unshift(data.warehouse);
      return data.warehouse;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function updateWarehouse(id, payload) {
    loading.value = true;
    try {
      const data = await updateWarehouseApi(id, payload);
      const idx = warehouses.value.findIndex((w) => w.id === id);
      if (idx !== -1) warehouses.value[idx] = data.warehouse;
      if (currentWarehouse.value?.id === id) currentWarehouse.value = data.warehouse;
      return data.warehouse;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function deleteWarehouse(id) {
    loading.value = true;
    try {
      await deleteWarehouseApi(id);
      warehouses.value = warehouses.value.filter((w) => w.id !== id);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  function clearCurrent() {
    currentWarehouse.value = null;
  }
  return {
    warehouses,
    currentWarehouse,
    loading,
    total,
    fetchWarehouses,
    fetchWarehouse,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    clearCurrent
  };
});

export { useWarehousesStore as u };
//# sourceMappingURL=store-CfM_MLuy.mjs.map
