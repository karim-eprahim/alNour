import { defineStore } from 'pinia';
import { ref } from 'vue';

async function fetchSuppliersApi(params) {
  return $fetch("/api/suppliers", { params });
}
async function fetchSupplierApi(id) {
  return $fetch(`/api/suppliers/${id}`);
}
async function createSupplierApi(payload) {
  return $fetch("/api/suppliers", { method: "POST", body: payload });
}
async function updateSupplierApi(id, payload) {
  return $fetch(`/api/suppliers/${id}`, { method: "PATCH", body: payload });
}
async function deleteSupplierApi(id) {
  await $fetch(`/api/suppliers/${id}`, { method: "DELETE" });
}
async function addLedgerEntryApi(supplierId, payload) {
  return $fetch(`/api/suppliers/${supplierId}/ledger`, { method: "POST", body: payload });
}
async function fetchSuppliersLookupApi(params) {
  return $fetch("/api/suppliers/lookup", { params });
}
const useSuppliersStore = defineStore("suppliers", () => {
  const suppliers = ref([]);
  const currentSupplier = ref(null);
  const loading = ref(false);
  const total = ref(0);
  async function fetchSuppliers(params) {
    loading.value = true;
    try {
      const data = await fetchSuppliersApi(params);
      suppliers.value = data.suppliers;
      total.value = data.total;
    } finally {
      loading.value = false;
    }
  }
  async function fetchSupplier(id) {
    loading.value = true;
    try {
      const data = await fetchSupplierApi(id);
      currentSupplier.value = data.supplier;
      return data.supplier;
    } finally {
      loading.value = false;
    }
  }
  async function createSupplier(payload) {
    loading.value = true;
    try {
      const data = await createSupplierApi(payload);
      suppliers.value.unshift(data.supplier);
      return data.supplier;
    } finally {
      loading.value = false;
    }
  }
  async function updateSupplier(id, payload) {
    loading.value = true;
    try {
      const data = await updateSupplierApi(id, payload);
      const idx = suppliers.value.findIndex((s) => s.id === id);
      if (idx !== -1) suppliers.value[idx] = data.supplier;
      if (currentSupplier.value?.id === id) currentSupplier.value = { ...currentSupplier.value, ...data.supplier };
      return data.supplier;
    } finally {
      loading.value = false;
    }
  }
  async function deleteSupplier(id) {
    loading.value = true;
    try {
      await deleteSupplierApi(id);
      suppliers.value = suppliers.value.filter((s) => s.id !== id);
    } finally {
      loading.value = false;
    }
  }
  async function addLedgerEntry(supplierId, payload) {
    loading.value = true;
    try {
      const data = await addLedgerEntryApi(supplierId, payload);
      if (currentSupplier.value) {
        currentSupplier.value.ledgerEntries.unshift(data.entry);
      }
      return data.entry;
    } finally {
      loading.value = false;
    }
  }
  function clearCurrent() {
    currentSupplier.value = null;
  }
  return {
    suppliers,
    currentSupplier,
    loading,
    total,
    fetchSuppliers,
    fetchSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    addLedgerEntry,
    clearCurrent
  };
});

export { fetchSuppliersLookupApi as f, useSuppliersStore as u };
//# sourceMappingURL=store-DXABWweC.mjs.map
