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

export { fetchStockApi as a, completeTransferApi as b, createMovementApi as c, createTransferApi as d, fetchMovementsApi as f };
//# sourceMappingURL=api-Czl-Z3XJ.mjs.map
