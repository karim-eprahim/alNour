import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StockEntry, StockMovement, CreateMovementPayload } from './type'
import {
  fetchStockApi,
  fetchMovementsApi,
  createMovementApi,
} from './api'

export const useStockStore = defineStore('stock', () => {
  const stocks = ref<StockEntry[]>([])
  const movements = ref<StockMovement[]>([])
  const loading = ref(false)
  const totalStocks = ref(0)
  const totalMovements = ref(0)

  async function fetchStocks(params?: { warehouseId?: string; productId?: string; lowStock?: string }) {
    loading.value = true
    try {
      const data = await fetchStockApi(params)
      stocks.value = data.stocks
      totalStocks.value = data.total
      console.log(data)
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchMovements(params?: {
    productId?: string
    warehouseId?: string
    type?: string
    page?: number
    limit?: number
  }) {
    loading.value = true
    try {
      const data = await fetchMovementsApi(params)
      movements.value = data.movements
      totalMovements.value = data.total
      return data
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createMovement(payload: CreateMovementPayload) {
    loading.value = true
    try {
      const data = await createMovementApi(payload)
      movements.value.unshift(data.movement)
      return data.movement
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    stocks, movements, loading, totalStocks, totalMovements,
    fetchStocks, fetchMovements, createMovement,
  }
})
