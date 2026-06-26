export interface Expense {
  id: string
  title: string
  amount: number
  category: string
  notes?: string | null
  createdById: string
  date: string
  createdAt: string
  createdBy?: { id: string; name: string }
}

export interface CreateExpensePayload {
  title: string
  amount: number
  category: string
  notes?: string
  date?: string
}

export interface UpdateExpensePayload {
  title?: string
  amount?: number
  category?: string
  notes?: string
  date?: string
}

export interface ExpenseCategorySummary {
  category: string
  _sum: { amount: number | null }
  _count: number
}
