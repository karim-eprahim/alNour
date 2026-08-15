async function fetchCustomersApi(params) {
  return $fetch("/api/customers", { params });
}
async function fetchCustomerApi(id) {
  return $fetch(`/api/customers/${id}`);
}
async function createCustomerApi(payload) {
  return $fetch("/api/customers", { method: "POST", body: payload });
}
async function updateCustomerApi(id, payload) {
  return $fetch(`/api/customers/${id}`, { method: "PATCH", body: payload });
}
async function deleteCustomerApi(id) {
  await $fetch(`/api/customers/${id}`, { method: "DELETE" });
}
async function fetchCustomersLookupApi(params) {
  return $fetch("/api/customers/lookup", { params });
}
async function fetchDistributorsLookupApi(params) {
  return $fetch("/api/distributors/lookup", { params });
}

export { fetchCustomersApi as a, fetchCustomersLookupApi as b, createCustomerApi as c, deleteCustomerApi as d, fetchDistributorsLookupApi as e, fetchCustomerApi as f, updateCustomerApi as u };
//# sourceMappingURL=api-BZnrPRgb.mjs.map
