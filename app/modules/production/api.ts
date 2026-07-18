import type { LookupResponse, LookupQuery } from '@/types/lookup'
import type { ProductionBatch, CreateProductionPayload, UpdateProductionPayload, ProductionReportSummary } from './type'

export async function fetchProductionBatchesApi(params?: {
  warehouseId?: string
  status?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}): Promise<{ batches: ProductionBatch[]; total: number; page: number; limit: number }> {
  return $fetch('/api/production', { params })
}

export async function fetchProductionBatchApi(id: string): Promise<{ batch: ProductionBatch }> {
  return $fetch(`/api/production/${id}`)
}

export async function createProductionBatchApi(payload: CreateProductionPayload): Promise<{ batch: ProductionBatch }> {
  return $fetch('/api/production', { method: 'POST', body: payload })
}

export async function updateProductionBatchApi(id: string, payload: UpdateProductionPayload): Promise<{ batch: ProductionBatch }> {
  return $fetch(`/api/production/${id}`, { method: 'PATCH', body: payload })
}

export async function deleteProductionBatchApi(id: string): Promise<void> {
  await $fetch(`/api/production/${id}`, { method: 'DELETE' })
}

export async function completeProductionBatchApi(id: string): Promise<{ batch: ProductionBatch }> {
  return $fetch(`/api/production/${id}/complete`, { method: 'PATCH' })
}

export async function fetchProductionReportApi(params?: {
  warehouseId?: string
  startDate?: string
  endDate?: string
}): Promise<{ batches: ProductionBatch[]; summary: ProductionReportSummary }> {
  return $fetch('/api/production/report', { params })
}

export async function fetchProductionLookupApi(params?: LookupQuery): Promise<LookupResponse> {
  return $fetch<LookupResponse>('/api/production/lookup', { params })
}
