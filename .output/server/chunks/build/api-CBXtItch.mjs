async function fetchWarehousesApi(params) {
  return $fetch("/api/warehouses", { params });
}
async function fetchWarehouseApi(id) {
  return $fetch(`/api/warehouses/${id}`);
}
async function createWarehouseApi(payload) {
  return $fetch("/api/warehouses", {
    method: "POST",
    body: payload
  });
}
async function updateWarehouseApi(id, payload) {
  return $fetch(`/api/warehouses/${id}`, {
    method: "PATCH",
    body: payload
  });
}
async function deleteWarehouseApi(id) {
  await $fetch(`/api/warehouses/${id}`, { method: "DELETE" });
}
async function fetchWarehousesLookupApi(params) {
  return $fetch("/api/warehouses/lookup", { params });
}

export { fetchWarehouseApi as a, fetchWarehousesApi as b, createWarehouseApi as c, deleteWarehouseApi as d, fetchWarehousesLookupApi as f, updateWarehouseApi as u };
//# sourceMappingURL=api-CBXtItch.mjs.map
