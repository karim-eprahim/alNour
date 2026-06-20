import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProductionBatch, CreateProductionPayload, UpdateProductionPayload, ProductionReportSummary } from './type'
import {
  fetchProductionBatchesApi,
  fetchProductionBatchApi,
  createProductionBatchApi,
  updateProductionBatchApi,
  deleteProductionBatchApi,
  completeProductionBatchApi,
  fetchProductionReportApi,
} from './api'

export const useProductionStore = defineStore('production', () => {
  const batches = ref<ProductionBatch[]>([])
  const currentBatch = ref<ProductionBatch | null>(null)
  const loading = ref(false)
  const total = ref(0)
  const reportBatches = ref<ProductionBatch[]>([])
  const reportSummary = ref<ProductionReportSummary | null>(null)

  async function fetchBatches(params?: {
    warehouseId?: string
    status?: string
    startDate?: string
    endDate?: string
    page?: number
    limit?: number
  }) {
    loading.value = true
    try {
      const data = await fetchProductionBatchesApi(params)
      batches.value = data.batches
      total.value = data.total
      return data
    } finally {
      loading.value = false
    }
  }

  async function fetchBatch(id: string) {
    loading.value = true
    try {
      const data = await fetchProductionBatchApi(id)
      currentBatch.value = data.batch
      return data.batch
    } finally {
      loading.value = false
    }
  }

  async function createBatch(payload: CreateProductionPayload) {
    loading.value = true
    try {
      const data = await createProductionBatchApi(payload)
      batches.value.unshift(data.batch)
      return data.batch
    } finally {
      loading.value = false
    }
  }

  async function updateBatch(id: string, payload: UpdateProductionPayload) {
    loading.value = true
    try {
      const data = await updateProductionBatchApi(id, payload)
      const idx = batches.value.findIndex((b) => b.id === id)
      if (idx !== -1) batches.value[idx] = data.batch
      if (currentBatch.value?.id === id) currentBatch.value = data.batch
      return data.batch
    } finally {
      loading.value = false
    }
  }

  async function deleteBatch(id: string) {
    loading.value = true
    try {
      await deleteProductionBatchApi(id)
      batches.value = batches.value.filter((b) => b.id !== id)
      if (currentBatch.value?.id === id) currentBatch.value = null
    } finally {
      loading.value = false
    }
  }

  async function completeBatch(id: string) {
    loading.value = true
    try {
      const data = await completeProductionBatchApi(id)
      const idx = batches.value.findIndex((b) => b.id === id)
      if (idx !== -1) batches.value[idx] = data.batch
      if (currentBatch.value?.id === id) currentBatch.value = data.batch
      return data.batch
    } finally {
      loading.value = false
    }
  }

  async function fetchReport(params?: {
    warehouseId?: string
    startDate?: string
    endDate?: string
  }) {
    loading.value = true
    try {
      const data = await fetchProductionReportApi(params)
      reportBatches.value = data.batches
      reportSummary.value = data.summary
      return data
    } finally {
      loading.value = false
    }
  }

  function clearCurrent() {
    currentBatch.value = null
  }

  return {
    batches, currentBatch, loading, total,
    reportBatches, reportSummary,
    fetchBatches, fetchBatch, createBatch, updateBatch,
    deleteBatch, completeBatch, fetchReport, clearCurrent,
  }
})
