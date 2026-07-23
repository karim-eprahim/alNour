import { defineStore } from 'pinia';
import { ref } from 'vue';
import { c as createMovementApi, f as fetchMovementsApi, a as fetchStockApi } from './api-Czl-Z3XJ.mjs';

const useStockStore = defineStore("stock", () => {
  const stocks = ref([]);
  const movements = ref([]);
  const loading = ref(false);
  const totalStocks = ref(0);
  const totalMovements = ref(0);
  async function fetchStocks(params) {
    loading.value = true;
    try {
      const data = await fetchStockApi(params);
      stocks.value = data.stocks;
      totalStocks.value = data.total;
      console.log(data);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function fetchMovements(params) {
    loading.value = true;
    try {
      const data = await fetchMovementsApi(params);
      movements.value = data.movements;
      totalMovements.value = data.total;
      return data;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function createMovement(payload) {
    loading.value = true;
    try {
      const data = await createMovementApi(payload);
      movements.value.unshift(data.movement);
      return data.movement;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  return {
    stocks,
    movements,
    loading,
    totalStocks,
    totalMovements,
    fetchStocks,
    fetchMovements,
    createMovement
  };
});

export { useStockStore as u };
//# sourceMappingURL=store-BHVa8pyv.mjs.map
