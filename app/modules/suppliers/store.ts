import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Supplier, CreateSupplierPayload, UpdateSupplierPayload, LedgerEntry } from './type'
import {
  fetchSuppliersApi,
  fetchSupplierApi,
  createSupplierApi,
  updateSupplierApi,
  deleteSupplierApi,
  addLedgerEntryApi,
} from './api'

export const useSuppliersStore = defineStore('suppliers', () => {
  const suppliers = ref<Supplier[]>([])
  const currentSupplier = ref<(Supplier & { purchaseInvoices: any[]; ledgerEntries: LedgerEntry[] }) | null>(null)
  const loading = ref(false)
  const total = ref(0)

  async function fetchSuppliers(params?: { search?: string }) {
    loading.value = true
    try {
      const data = await fetchSuppliersApi(params)
      suppliers.value = data.suppliers
      total.value = data.total
    } finally {
      loading.value = false
    }
  }

  async function fetchSupplier(id: string) {
    loading.value = true
    try {
      const data = await fetchSupplierApi(id)
      currentSupplier.value = data.supplier as any
      return data.supplier
    } finally {
      loading.value = false
    }
  }

  async function createSupplier(payload: CreateSupplierPayload) {
    loading.value = true
    try {
      const data = await createSupplierApi(payload)
      suppliers.value.unshift(data.supplier)
      return data.supplier
    } finally {
      loading.value = false
    }
  }

  async function updateSupplier(id: string, payload: UpdateSupplierPayload) {
    loading.value = true
    try {
      const data = await updateSupplierApi(id, payload)
      const idx = suppliers.value.findIndex((s) => s.id === id)
      if (idx !== -1) suppliers.value[idx] = data.supplier
      if (currentSupplier.value?.id === id) currentSupplier.value = { ...currentSupplier.value, ...data.supplier }
      return data.supplier
    } finally {
      loading.value = false
    }
  }

  async function deleteSupplier(id: string) {
    loading.value = true
    try {
      await deleteSupplierApi(id)
      suppliers.value = suppliers.value.filter((s) => s.id !== id)
    } finally {
      loading.value = false
    }
  }

  async function addLedgerEntry(supplierId: string, payload: { amount: number; type: 'DEBIT' | 'CREDIT'; description?: string }) {
    loading.value = true
    try {
      const data = await addLedgerEntryApi(supplierId, payload)
      if (currentSupplier.value) {
        currentSupplier.value.ledgerEntries.unshift(data.entry)
      }
      return data.entry
    } finally {
      loading.value = false
    }
  }

  function clearCurrent() {
    currentSupplier.value = null
  }

  return {
    suppliers, currentSupplier, loading, total,
    fetchSuppliers, fetchSupplier,
    createSupplier, updateSupplier, deleteSupplier,
    addLedgerEntry, clearCurrent,
  }
})
