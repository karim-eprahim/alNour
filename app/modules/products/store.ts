import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product, CreateProductPayload, UpdateProductPayload } from './type'
import {
  fetchProductsApi,
  fetchProductApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from './api'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const loading = ref(false)
  const total = ref(0)

  async function fetchProducts(params?: { search?: string; type?: string; warehouseId?: string }) {
    loading.value = true
    try {
      const data = await fetchProductsApi(params)
      products.value = data.products
      total.value = data.total
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchProduct(id: string) {
    loading.value = true
    try {
      const data = await fetchProductApi(id)
      currentProduct.value = data.product
      return data.product
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createProduct(payload: CreateProductPayload) {
    loading.value = true
    try {
      const data = await createProductApi(payload)
      products.value.unshift(data.product)
      return data.product
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateProduct(id: string, payload: UpdateProductPayload) {
    loading.value = true
    try {
      const data = await updateProductApi(id, payload)
      const idx = products.value.findIndex((p) => p.id === id)
      if (idx !== -1) products.value[idx] = data.product
      if (currentProduct.value?.id === id) currentProduct.value = data.product
      return data.product
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteProduct(id: string) {
    loading.value = true
    try {
      await deleteProductApi(id)
      products.value = products.value.filter((p) => p.id !== id)
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  function clearCurrent() {
    currentProduct.value = null
  }

  return {
    products, currentProduct, loading, total,
    fetchProducts, fetchProduct,
    createProduct, updateProduct, deleteProduct,
    clearCurrent,
  }
})
