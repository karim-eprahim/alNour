import type { LookupResponse, LookupQuery } from '@/types/lookup'
import type {
  Worker,
  Attendance,
  WorkerAdvance,
  WorkerDailyWage,
  CreateWorkerPayload,
  UpdateWorkerPayload,
  LogAttendancePayload,
  CreateAdvancePayload,
  LogDailyWagesPayload,
  WorkerReport,
} from './type'

export async function fetchWorkersApi(params?: {
  search?: string
  isActive?: string
  role?: string
  page?: number
  limit?: number
}): Promise<{ workers: Worker[]; total: number; page: number; limit: number }> {
  return $fetch('/api/workers', { params })
}

export async function fetchWorkerApi(id: string): Promise<{ worker: Worker }> {
  return $fetch(`/api/workers/${id}`)
}

export async function createWorkerApi(payload: CreateWorkerPayload): Promise<{ worker: Worker }> {
  return $fetch('/api/workers', { method: 'POST', body: payload })
}

export async function updateWorkerApi(id: string, payload: UpdateWorkerPayload): Promise<{ worker: Worker }> {
  return $fetch(`/api/workers/${id}`, { method: 'PATCH', body: payload })
}

export async function deleteWorkerApi(id: string): Promise<void> {
  await $fetch(`/api/workers/${id}`, { method: 'DELETE' })
}

export async function logAttendanceApi(payload: LogAttendancePayload): Promise<{ attendance: Attendance[] }> {
  return $fetch('/api/workers/attendance', { method: 'POST', body: payload })
}

export async function fetchAttendanceApi(params?: {
  workerId?: string
  status?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}): Promise<{ attendance: Attendance[]; total: number; page: number; limit: number }> {
  return $fetch('/api/workers/attendance', { params })
}

export async function createAdvanceApi(payload: CreateAdvancePayload): Promise<{ advance: WorkerAdvance }> {
  return $fetch('/api/workers/advances', { method: 'POST', body: payload })
}

export async function fetchAdvancesApi(params?: {
  workerId?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}): Promise<{ advances: WorkerAdvance[]; total: number; page: number; limit: number }> {
  return $fetch('/api/workers/advances', { params })
}

export async function logDailyWagesApi(payload: LogDailyWagesPayload): Promise<{ dailyWages: WorkerDailyWage[] }> {
  return $fetch('/api/workers/daily-wages', { method: 'POST', body: payload })
}

export async function fetchDailyWagesApi(params?: {
  workerId?: string
  productionBatchId?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}): Promise<{ dailyWages: WorkerDailyWage[]; total: number; page: number; limit: number }> {
  return $fetch('/api/workers/daily-wages', { params })
}

export async function fetchWorkerReportApi(id: string, params?: {
  startDate?: string
  endDate?: string
}): Promise<{ report: WorkerReport }> {
  return $fetch(`/api/workers/report/${id}`, { params })
}

export async function fetchWorkersLookupApi(params?: LookupQuery): Promise<LookupResponse> {
  return $fetch<LookupResponse>('/api/workers/lookup', { params })
}
