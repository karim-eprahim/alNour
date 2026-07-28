import type { LedgerEntry, CreateLedgerEntryPayload, UpdateLedgerEntryPayload, LedgerSummary, LedgerQueryParams } from './type'

export async function fetchLedgerEntriesApi(params?: LedgerQueryParams): Promise<{ entries: LedgerEntry[]; total: number; page: number; limit: number }> {
  return $fetch('/api/ledger', { params })
}

export async function fetchLedgerEntryApi(id: string): Promise<{ entry: LedgerEntry }> {
  return $fetch(`/api/ledger/${id}`)
}

export async function createLedgerEntryApi(payload: CreateLedgerEntryPayload): Promise<{ entry: LedgerEntry }> {
  return $fetch('/api/ledger', { method: 'POST', body: payload })
}

export async function updateLedgerEntryApi(id: string, payload: UpdateLedgerEntryPayload): Promise<{ entry: LedgerEntry }> {
  return $fetch(`/api/ledger/${id}`, { method: 'PATCH', body: payload })
}

export async function deleteLedgerEntryApi(id: string): Promise<void> {
  await $fetch(`/api/ledger/${id}`, { method: 'DELETE' })
}

export async function fetchLedgerSummaryApi(params?: LedgerQueryParams): Promise<LedgerSummary> {
  return $fetch('/api/ledger/summary', { params })
}
