async function fetchStockApi(params) {
  return $fetch("/api/stock", { params });
}
async function fetchMovementsApi(params) {
  return $fetch("/api/stock/movements", { params });
}
async function createMovementApi(payload) {
  return $fetch("/api/stock/movements", {
    method: "POST",
    body: payload
  });
}
async function createTransferApi(payload) {
  return $fetch("/api/stock/transfers", {
    method: "POST",
    body: payload
  });
}
async function completeTransferApi(id) {
  await $fetch(`/api/stock/transfers/${id}/complete`, { method: "PATCH" });
}
async function fetchStockDistributionApi() {
  return $fetch("/api/stock/dashboard/distribution");
}

export { fetchMovementsApi as a, fetchStockApi as b, createMovementApi as c, completeTransferApi as d, createTransferApi as e, fetchStockDistributionApi as f };
//# sourceMappingURL=api-BBrn-wQZ.mjs.map
