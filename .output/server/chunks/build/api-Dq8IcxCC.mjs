async function fetchProductsApi(params) {
  return $fetch("/api/products", { params });
}
async function fetchProductApi(id) {
  return $fetch(`/api/products/${id}`);
}
async function createProductApi(payload) {
  return $fetch("/api/products", {
    method: "POST",
    body: payload
  });
}
async function updateProductApi(id, payload) {
  return $fetch(`/api/products/${id}`, {
    method: "PATCH",
    body: payload
  });
}
async function deleteProductApi(id) {
  await $fetch(`/api/products/${id}`, { method: "DELETE" });
}
async function fetchProductsLookupApi(params) {
  return $fetch("/api/products/lookup", { params });
}

export { fetchProductApi as a, fetchProductsApi as b, createProductApi as c, deleteProductApi as d, fetchProductsLookupApi as f, updateProductApi as u };
//# sourceMappingURL=api-Dq8IcxCC.mjs.map
