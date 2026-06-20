import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Customer, CreateCustomerPayload } from './type'
import {
  fetchCustomersApi,
  fetchCustomerApi,
  createCustomerApi,
  updateCustomerApi,
  deleteCustomerApi,
} from './api'

export const useCustomersStore = defineStore('customers', () => {
  const customers = ref<Customer[]>([])
  const currentCustomer = ref<Customer | null>(null)
  const loading = ref(false)
  const total = ref(0)

  async function fetchCustomers(params?: { search?: string; page?: number; limit?: number }) {
    loading.value = true
    try {
      const data = await fetchCustomersApi(params)
      customers.value = data.customers
      total.value = data.total
      return data
    } finally {
      loading.value = false
    }
  }

  async function fetchCustomer(id: string) {
    loading.value = true
    try {
      const data = await fetchCustomerApi(id)
      currentCustomer.value = data.customer
      return data.customer
    } finally {
      loading.value = false
    }
  }

  async function createCustomer(payload: CreateCustomerPayload) {
    loading.value = true
    try {
      const data = await createCustomerApi(payload)
      customers.value.unshift(data.customer)
      return data.customer
    } finally {
      loading.value = false
    }
  }

  async function updateCustomer(id: string, payload: Partial<CreateCustomerPayload>) {
    loading.value = true
    try {
      const data = await updateCustomerApi(id, payload)
      const idx = customers.value.findIndex((c) => c.id === id)
      if (idx !== -1) customers.value[idx] = data.customer
      if (currentCustomer.value?.id === id) currentCustomer.value = data.customer
      return data.customer
    } finally {
      loading.value = false
    }
  }

  async function deleteCustomer(id: string) {
    loading.value = true
    try {
      await deleteCustomerApi(id)
      customers.value = customers.value.filter((c) => c.id !== id)
      if (currentCustomer.value?.id === id) currentCustomer.value = null
    } finally {
      loading.value = false
    }
  }

  function clearCurrent() {
    currentCustomer.value = null
  }

  return {
    customers, currentCustomer, loading, total,
    fetchCustomers, fetchCustomer, createCustomer, updateCustomer, deleteCustomer, clearCurrent,
  }
})
