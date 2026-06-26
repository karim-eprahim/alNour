import type { Expense, CreateExpensePayload, UpdateExpensePayload, ExpenseCategorySummary } from './type'

export async function fetchExpensesApi(params?: {
  category?: string
  search?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}): Promise<{ expenses: Expense[]; total: number; page: number; limit: number; categories: ExpenseCategorySummary[] }> {
  return $fetch('/api/expenses', { params })
}

export async function createExpenseApi(payload: CreateExpensePayload): Promise<{ expense: Expense }> {
  return $fetch('/api/expenses', { method: 'POST', body: payload })
}

export async function updateExpenseApi(id: string, payload: UpdateExpensePayload): Promise<{ expense: Expense }> {
  return $fetch(`/api/expenses/${id}`, { method: 'PATCH', body: payload })
}

export async function deleteExpenseApi(id: string): Promise<void> {
  await $fetch(`/api/expenses/${id}`, { method: 'DELETE' })
}
