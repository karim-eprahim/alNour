import { defineStore } from 'pinia'
import { ref } from 'vue'
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
import {
  fetchWorkersApi,
  fetchWorkerApi,
  createWorkerApi,
  updateWorkerApi,
  deleteWorkerApi,
  logAttendanceApi,
  fetchAttendanceApi,
  createAdvanceApi,
  fetchAdvancesApi,
  logDailyWagesApi,
  fetchDailyWagesApi,
  fetchWorkerReportApi,
} from './api'

export const useWorkersStore = defineStore('workers', () => {
  const workers = ref<Worker[]>([])
  const currentWorker = ref<Worker | null>(null)
  const loading = ref(false)
  const total = ref(0)

  const attendanceRecords = ref<Attendance[]>([])
  const attendanceTotal = ref(0)

  const advances = ref<WorkerAdvance[]>([])
  const advancesTotal = ref(0)

  const dailyWages = ref<WorkerDailyWage[]>([])
  const dailyWagesTotal = ref(0)

  const workerReport = ref<WorkerReport | null>(null)

  async function fetchWorkers(params?: {
    search?: string
    isActive?: string
    role?: string
    page?: number
    limit?: number
  }) {
    loading.value = true
    try {
      const data = await fetchWorkersApi(params)
      workers.value = data.workers
      total.value = data.total
      return data
    } finally {
      loading.value = false
    }
  }

  async function fetchWorker(id: string) {
    loading.value = true
    try {
      const data = await fetchWorkerApi(id)
      currentWorker.value = data.worker
      return data.worker
    } finally {
      loading.value = false
    }
  }

  async function createWorker(payload: CreateWorkerPayload) {
    loading.value = true
    try {
      const data = await createWorkerApi(payload)
      workers.value.unshift(data.worker)
      return data.worker
    } finally {
      loading.value = false
    }
  }

  async function updateWorker(id: string, payload: UpdateWorkerPayload) {
    loading.value = true
    try {
      const data = await updateWorkerApi(id, payload)
      const idx = workers.value.findIndex((w) => w.id === id)
      if (idx !== -1) workers.value[idx] = data.worker
      if (currentWorker.value?.id === id) currentWorker.value = data.worker
      return data.worker
    } finally {
      loading.value = false
    }
  }

  async function deleteWorker(id: string) {
    loading.value = true
    try {
      await deleteWorkerApi(id)
      workers.value = workers.value.filter((w) => w.id !== id)
      if (currentWorker.value?.id === id) currentWorker.value = null
    } finally {
      loading.value = false
    }
  }

  async function logAttendance(payload: LogAttendancePayload) {
    loading.value = true
    try {
      return await logAttendanceApi(payload)
    } finally {
      loading.value = false
    }
  }

  async function fetchAttendance(params?: {
    workerId?: string
    status?: string
    startDate?: string
    endDate?: string
    page?: number
    limit?: number
  }) {
    loading.value = true
    try {
      const data = await fetchAttendanceApi(params)
      attendanceRecords.value = data.attendance
      attendanceTotal.value = data.total
      return data
    } finally {
      loading.value = false
    }
  }

  async function createAdvance(payload: CreateAdvancePayload) {
    loading.value = true
    try {
      const data = await createAdvanceApi(payload)
      advances.value.unshift(data.advance)
      return data.advance
    } finally {
      loading.value = false
    }
  }

  async function fetchAdvances(params?: {
    workerId?: string
    startDate?: string
    endDate?: string
    page?: number
    limit?: number
  }) {
    loading.value = true
    try {
      const data = await fetchAdvancesApi(params)
      advances.value = data.advances
      advancesTotal.value = data.total
      return data
    } finally {
      loading.value = false
    }
  }

  async function logDailyWages(payload: LogDailyWagesPayload) {
    loading.value = true
    try {
      return await logDailyWagesApi(payload)
    } finally {
      loading.value = false
    }
  }

  async function fetchDailyWages(params?: {
    workerId?: string
    productionBatchId?: string
    startDate?: string
    endDate?: string
    page?: number
    limit?: number
  }) {
    loading.value = true
    try {
      const data = await fetchDailyWagesApi(params)
      dailyWages.value = data.dailyWages
      dailyWagesTotal.value = data.total
      return data
    } finally {
      loading.value = false
    }
  }

  async function fetchReport(id: string, params?: { startDate?: string; endDate?: string }) {
    loading.value = true
    try {
      const data = await fetchWorkerReportApi(id, params)
      workerReport.value = data.report
      return data.report
    } finally {
      loading.value = false
    }
  }

  function clearCurrent() {
    currentWorker.value = null
    workerReport.value = null
  }

  return {
    workers, currentWorker, loading, total,
    attendanceRecords, attendanceTotal,
    advances, advancesTotal,
    dailyWages, dailyWagesTotal,
    workerReport,
    fetchWorkers, fetchWorker, createWorker, updateWorker, deleteWorker,
    logAttendance, fetchAttendance,
    createAdvance, fetchAdvances,
    logDailyWages, fetchDailyWages,
    fetchReport, clearCurrent,
  }
})
