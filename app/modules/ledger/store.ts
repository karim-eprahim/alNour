import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LedgerEntry, CreateLedgerEntryPayload, UpdateLedgerEntryPayload, LedgerSummary, LedgerQueryParams } from './type'
import {
  fetchLedgerEntriesApi,
  fetchLedgerEntryApi,
  createLedgerEntryApi,
  updateLedgerEntryApi,
  deleteLedgerEntryApi,
  fetchLedgerSummaryApi,
} from './api'

export const useLedgerStore = defineStore('ledger', () => {
  const entries = ref<LedgerEntry[]>([])
  const currentEntry = ref<LedgerEntry | null>(null)
  const loading = ref(false)
  const total = ref(0)
  const summary = ref<LedgerSummary | null>(null)

  async function fetchEntries(params?: LedgerQueryParams) {
    loading.value = true
    try {
      const data = await fetchLedgerEntriesApi(params)
      entries.value = data.entries
      total.value = data.total
      return data
    } finally {
      loading.value = false
    }
  }

  async function fetchEntry(id: string) {
    loading.value = true
    try {
      const data = await fetchLedgerEntryApi(id)
      currentEntry.value = data.entry
      return data.entry
    } finally {
      loading.value = false
    }
  }

  async function createEntry(payload: CreateLedgerEntryPayload) {
    loading.value = true
    try {
      const data = await createLedgerEntryApi(payload)
      entries.value.unshift(data.entry)
      return data.entry
    } finally {
      loading.value = false
    }
  }

  async function updateEntry(id: string, payload: UpdateLedgerEntryPayload) {
    loading.value = true
    try {
      const data = await updateLedgerEntryApi(id, payload)
      const idx = entries.value.findIndex((e) => e.id === id)
      if (idx !== -1) entries.value[idx] = data.entry
      if (currentEntry.value?.id === id) currentEntry.value = data.entry
      return data.entry
    } finally {
      loading.value = false
    }
  }

  async function deleteEntry(id: string) {
    loading.value = true
    try {
      await deleteLedgerEntryApi(id)
      entries.value = entries.value.filter((e) => e.id !== id)
      if (currentEntry.value?.id === id) currentEntry.value = null
    } finally {
      loading.value = false
    }
  }

  async function fetchSummary(params?: LedgerQueryParams) {
    try {
      const data = await fetchLedgerSummaryApi(params)
      summary.value = data
      return data
    } catch {
      summary.value = null
    }
  }

  function clearCurrent() {
    currentEntry.value = null
  }

  return {
    entries, currentEntry, loading, total, summary,
    fetchEntries, fetchEntry, createEntry, updateEntry, deleteEntry,
    fetchSummary, clearCurrent,
  }
})
