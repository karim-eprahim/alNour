import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Warehouse, CreateWarehousePayload, UpdateWarehousePayload } from './type'
import {
  fetchWarehousesApi,
  fetchWarehouseApi,
  createWarehouseApi,
  updateWarehouseApi,
  deleteWarehouseApi,
} from './api'

export const useWarehousesStore = defineStore('warehouses', () => {
  const warehouses = ref<Warehouse[]>([])
  const currentWarehouse = ref<any>(null)
  const loading = ref(false)
  const total = ref(0)

  async function fetchWarehouses(params?: { search?: string }) {
    loading.value = true
    try {
      const data = await fetchWarehousesApi(params)
      warehouses.value = data.warehouses
      total.value = data.total
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchWarehouse(id: string) {
    loading.value = true
    try {
      const data = await fetchWarehouseApi(id)
      currentWarehouse.value = data.warehouse
      return data.warehouse
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createWarehouse(payload: CreateWarehousePayload) {
    loading.value = true
    try {
      const data = await createWarehouseApi(payload)
      warehouses.value.unshift(data.warehouse)
      return data.warehouse
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateWarehouse(id: string, payload: UpdateWarehousePayload) {
    loading.value = true
    try {
      const data = await updateWarehouseApi(id, payload)
      const idx = warehouses.value.findIndex((w) => w.id === id)
      if (idx !== -1) warehouses.value[idx] = data.warehouse
      if (currentWarehouse.value?.id === id) currentWarehouse.value = data.warehouse
      return data.warehouse
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteWarehouse(id: string) {
    loading.value = true
    try {
      await deleteWarehouseApi(id)
      warehouses.value = warehouses.value.filter((w) => w.id !== id)
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  function clearCurrent() {
    currentWarehouse.value = null
  }

  return {
    warehouses, currentWarehouse, loading, total,
    fetchWarehouses, fetchWarehouse,
    createWarehouse, updateWarehouse, deleteWarehouse,
    clearCurrent,
  }
})
