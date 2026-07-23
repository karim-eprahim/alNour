import { defineStore } from 'pinia';
import { ref } from 'vue';

async function fetchProductionBatchesApi(params) {
  return $fetch("/api/production", { params });
}
async function fetchProductionBatchApi(id) {
  return $fetch(`/api/production/${id}`);
}
async function createProductionBatchApi(payload) {
  return $fetch("/api/production", { method: "POST", body: payload });
}
async function updateProductionBatchApi(id, payload) {
  return $fetch(`/api/production/${id}`, { method: "PATCH", body: payload });
}
async function deleteProductionBatchApi(id) {
  await $fetch(`/api/production/${id}`, { method: "DELETE" });
}
async function completeProductionBatchApi(id) {
  return $fetch(`/api/production/${id}/complete`, { method: "PATCH" });
}
async function fetchProductionReportApi(params) {
  return $fetch("/api/production/report", { params });
}
async function fetchProductionLookupApi(params) {
  return $fetch("/api/production/lookup", { params });
}
const useProductionStore = defineStore("production", () => {
  const batches = ref([]);
  const currentBatch = ref(null);
  const loading = ref(false);
  const total = ref(0);
  const reportBatches = ref([]);
  const reportSummary = ref(null);
  async function fetchBatches(params) {
    loading.value = true;
    try {
      const data = await fetchProductionBatchesApi(params);
      batches.value = data.batches;
      total.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function fetchBatch(id) {
    loading.value = true;
    try {
      const data = await fetchProductionBatchApi(id);
      currentBatch.value = data.batch;
      return data.batch;
    } finally {
      loading.value = false;
    }
  }
  async function createBatch(payload) {
    loading.value = true;
    try {
      const data = await createProductionBatchApi(payload);
      batches.value.unshift(data.batch);
      return data.batch;
    } finally {
      loading.value = false;
    }
  }
  async function updateBatch(id, payload) {
    loading.value = true;
    try {
      const data = await updateProductionBatchApi(id, payload);
      const idx = batches.value.findIndex((b) => b.id === id);
      if (idx !== -1) batches.value[idx] = data.batch;
      if (currentBatch.value?.id === id) currentBatch.value = data.batch;
      return data.batch;
    } finally {
      loading.value = false;
    }
  }
  async function deleteBatch(id) {
    loading.value = true;
    try {
      await deleteProductionBatchApi(id);
      batches.value = batches.value.filter((b) => b.id !== id);
      if (currentBatch.value?.id === id) currentBatch.value = null;
    } finally {
      loading.value = false;
    }
  }
  async function completeBatch(id) {
    loading.value = true;
    try {
      const data = await completeProductionBatchApi(id);
      const idx = batches.value.findIndex((b) => b.id === id);
      if (idx !== -1) batches.value[idx] = data.batch;
      if (currentBatch.value?.id === id) currentBatch.value = data.batch;
      return data.batch;
    } finally {
      loading.value = false;
    }
  }
  async function fetchReport(params) {
    loading.value = true;
    try {
      const data = await fetchProductionReportApi(params);
      reportBatches.value = data.batches;
      reportSummary.value = data.summary;
      return data;
    } finally {
      loading.value = false;
    }
  }
  function clearCurrent() {
    currentBatch.value = null;
  }
  return {
    batches,
    currentBatch,
    loading,
    total,
    reportBatches,
    reportSummary,
    fetchBatches,
    fetchBatch,
    createBatch,
    updateBatch,
    deleteBatch,
    completeBatch,
    fetchReport,
    clearCurrent
  };
});

export { fetchProductionLookupApi as f, useProductionStore as u };
//# sourceMappingURL=store-C09GJ09r.mjs.map
