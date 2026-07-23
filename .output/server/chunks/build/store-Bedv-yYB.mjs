import { defineStore } from 'pinia';
import { ref } from 'vue';
import { d as deleteProductApi, u as updateProductApi, c as createProductApi, a as fetchProductApi, b as fetchProductsApi } from './api-Dq8IcxCC.mjs';

const useProductsStore = defineStore("products", () => {
  const products = ref([]);
  const currentProduct = ref(null);
  const loading = ref(false);
  const total = ref(0);
  async function fetchProducts(params) {
    loading.value = true;
    try {
      const data = await fetchProductsApi(params);
      products.value = data.products;
      total.value = data.total;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function fetchProduct(id) {
    loading.value = true;
    try {
      const data = await fetchProductApi(id);
      currentProduct.value = data.product;
      return data.product;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function createProduct(payload) {
    loading.value = true;
    try {
      const data = await createProductApi(payload);
      products.value.unshift(data.product);
      return data.product;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function updateProduct(id, payload) {
    loading.value = true;
    try {
      const data = await updateProductApi(id, payload);
      const idx = products.value.findIndex((p) => p.id === id);
      if (idx !== -1) products.value[idx] = data.product;
      if (currentProduct.value?.id === id) currentProduct.value = data.product;
      return data.product;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function deleteProduct(id) {
    loading.value = true;
    try {
      await deleteProductApi(id);
      products.value = products.value.filter((p) => p.id !== id);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }
  function clearCurrent() {
    currentProduct.value = null;
  }
  return {
    products,
    currentProduct,
    loading,
    total,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    clearCurrent
  };
});

export { useProductsStore as u };
//# sourceMappingURL=store-Bedv-yYB.mjs.map
