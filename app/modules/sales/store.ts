import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SalesOrder, CreateSalesOrderPayload, Invoice, Payment, CreatePaymentPayload } from './type'
import {
  fetchSalesOrdersApi,
  fetchSalesOrderApi,
  createSalesOrderApi,
  updateSalesOrderApi,
  deleteSalesOrderApi,
  fetchInvoicesApi,
  fetchInvoiceApi,
  payInvoiceApi,
} from './api'

export const useSalesStore = defineStore('sales', () => {
  const orders = ref<SalesOrder[]>([])
  const currentOrder = ref<SalesOrder | null>(null)
  const invoices = ref<Invoice[]>([])
  const currentInvoice = ref<Invoice | null>(null)
  const loading = ref(false)
  const total = ref(0)
  const totalInvoices = ref(0)

  async function fetchOrders(params?: {
    search?: string
    customerId?: string
    warehouseId?: string
    status?: string
    startDate?: string
    endDate?: string
    page?: number
    limit?: number
  }) {
    loading.value = true
    try {
      const data = await fetchSalesOrdersApi(params)
      orders.value = data.orders
      total.value = data.total
      return data
    } finally {
      loading.value = false
    }
  }

  async function fetchOrder(id: string) {
    loading.value = true
    try {
      const data = await fetchSalesOrderApi(id)
      currentOrder.value = data.order
      return data.order
    } finally {
      loading.value = false
    }
  }

  async function createOrder(payload: CreateSalesOrderPayload) {
    loading.value = true
    try {
      const data = await createSalesOrderApi(payload)
      orders.value.unshift(data.order)
      return data.order
    } finally {
      loading.value = false
    }
  }

  async function updateOrder(id: string, payload: { status?: string }) {
    loading.value = true
    try {
      const data = await updateSalesOrderApi(id, payload)
      const idx = orders.value.findIndex((o) => o.id === id)
      if (idx !== -1) orders.value[idx] = data.order
      if (currentOrder.value?.id === id) currentOrder.value = data.order
      return data.order
    } finally {
      loading.value = false
    }
  }

  async function deleteOrder(id: string) {
    loading.value = true
    try {
      await deleteSalesOrderApi(id)
      orders.value = orders.value.filter((o) => o.id !== id)
      if (currentOrder.value?.id === id) currentOrder.value = null
    } finally {
      loading.value = false
    }
  }

  async function fetchInvoices(params?: {
    search?: string
    customerId?: string
    status?: string
    startDate?: string
    endDate?: string
    page?: number
    limit?: number
  }) {
    loading.value = true
    try {
      const data = await fetchInvoicesApi(params)
      invoices.value = data.invoices
      totalInvoices.value = data.total
      return data
    } finally {
      loading.value = false
    }
  }

  async function fetchInvoice(id: string) {
    loading.value = true
    try {
      const data = await fetchInvoiceApi(id)
      currentInvoice.value = data.invoice
      return data.invoice
    } finally {
      loading.value = false
    }
  }

  async function payInvoice(id: string, payload: CreatePaymentPayload) {
    loading.value = true
    try {
      const data = await payInvoiceApi(id, payload)
      if (currentInvoice.value) {
        currentInvoice.value.paidAmount = (currentInvoice.value.paidAmount || 0) + payload.amount
        currentInvoice.value.status = currentInvoice.value.paidAmount >= currentInvoice.value.totalAmount ? 'PAID' : 'PARTIAL'
        if (!currentInvoice.value.payments) currentInvoice.value.payments = []
        currentInvoice.value.payments.unshift(data.payment)
      }
      return data.payment
    } finally {
      loading.value = false
    }
  }

  function clearCurrent() {
    currentOrder.value = null
    currentInvoice.value = null
  }

  return {
    orders, currentOrder, invoices, currentInvoice, loading, total, totalInvoices,
    fetchOrders, fetchOrder, createOrder, updateOrder, deleteOrder,
    fetchInvoices, fetchInvoice, payInvoice, clearCurrent,
  }
})
