import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PurchaseInvoice, CreatePurchasePayload, PurchaseReportSummary } from './type'
import {
  fetchPurchasesApi,
  fetchPurchaseApi,
  createPurchaseApi,
  payPurchaseApi,
  fetchPurchaseReportApi,
} from './api'

export const usePurchasesStore = defineStore('purchases', () => {
  const invoices = ref<PurchaseInvoice[]>([])
  const currentInvoice = ref<PurchaseInvoice | null>(null)
  const loading = ref(false)
  const total = ref(0)
  const reportInvoices = ref<PurchaseInvoice[]>([])
  const reportSummary = ref<PurchaseReportSummary | null>(null)

  async function fetchPurchases(params?: {
    search?: string
    supplierId?: string
    warehouseId?: string
    startDate?: string
    endDate?: string
    page?: number
    limit?: number
  }) {
    loading.value = true
    try {
      const data = await fetchPurchasesApi(params)
      invoices.value = data.invoices
      total.value = data.total
      return data
    } finally {
      loading.value = false
    }
  }

  async function fetchPurchase(id: string) {
    loading.value = true
    try {
      const data = await fetchPurchaseApi(id)
      currentInvoice.value = data.invoice
      return data.invoice
    } finally {
      loading.value = false
    }
  }

  async function createPurchase(payload: CreatePurchasePayload) {
    loading.value = true
    try {
      const data = await createPurchaseApi(payload)
      invoices.value.unshift(data.invoice)
      return data.invoice
    } finally {
      loading.value = false
    }
  }

  async function payInvoice(id: string, payload: { amount: number; description?: string }) {
    loading.value = true
    try {
      const data = await payPurchaseApi(id, payload)
      const idx = invoices.value.findIndex((i) => i.id === id)
      if (idx !== -1) invoices.value[idx] = data.invoice
      if (currentInvoice.value?.id === id) currentInvoice.value = data.invoice
      return data.invoice
    } finally {
      loading.value = false
    }
  }

  async function fetchReport(params?: {
    supplierId?: string
    warehouseId?: string
    startDate?: string
    endDate?: string
  }) {
    loading.value = true
    try {
      const data = await fetchPurchaseReportApi(params)
      reportInvoices.value = data.invoices
      reportSummary.value = data.summary
      return data
    } finally {
      loading.value = false
    }
  }

  function clearCurrent() {
    currentInvoice.value = null
  }

  return {
    invoices, currentInvoice, loading, total,
    reportInvoices, reportSummary,
    fetchPurchases, fetchPurchase,
    createPurchase, payInvoice,
    fetchReport, clearCurrent,
  }
})
