import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Expense, CreateExpensePayload, UpdateExpensePayload, ExpenseCategorySummary } from './type'
import {
  fetchExpensesApi,
  createExpenseApi,
  updateExpenseApi,
  deleteExpenseApi,
} from './api'

export const useExpensesStore = defineStore('expenses', () => {
  const expenses = ref<Expense[]>([])
  const loading = ref(false)
  const total = ref(0)
  const categories = ref<ExpenseCategorySummary[]>([])

  async function fetchExpenses(params?: {
    category?: string
    search?: string
    startDate?: string
    endDate?: string
    page?: number
    limit?: number
  }) {
    loading.value = true
    try {
      const data = await fetchExpensesApi(params)
      expenses.value = data.expenses
      total.value = data.total
      categories.value = data.categories
      return data
    } finally {
      loading.value = false
    }
  }

  async function createExpense(payload: CreateExpensePayload) {
    loading.value = true
    try {
      const data = await createExpenseApi(payload)
      expenses.value.unshift(data.expense)
      return data.expense
    } finally {
      loading.value = false
    }
  }

  async function updateExpense(id: string, payload: UpdateExpensePayload) {
    loading.value = true
    try {
      const data = await updateExpenseApi(id, payload)
      const idx = expenses.value.findIndex((e) => e.id === id)
      if (idx !== -1) expenses.value[idx] = data.expense
      return data.expense
    } finally {
      loading.value = false
    }
  }

  async function deleteExpense(id: string) {
    loading.value = true
    try {
      await deleteExpenseApi(id)
      expenses.value = expenses.value.filter((e) => e.id !== id)
    } finally {
      loading.value = false
    }
  }

  return {
    expenses, loading, total, categories,
    fetchExpenses, createExpense, updateExpense, deleteExpense,
  }
})
