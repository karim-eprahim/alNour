import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

async function fetchUsersApi(params) {
  return $fetch("/api/users", { params });
}
async function fetchUserApi(id) {
  return $fetch(`/api/users/${id}`);
}
async function createUserApi(payload) {
  return $fetch("/api/users", {
    method: "POST",
    body: payload
  });
}
async function updateUserApi(id, payload) {
  return $fetch(`/api/users/${id}`, {
    method: "PATCH",
    body: payload
  });
}
async function deleteUserApi(id) {
  await $fetch(`/api/users/${id}`, { method: "DELETE" });
}
const useUsersStore = defineStore("users", () => {
  const users = ref([]);
  const currentUser = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const total = ref(0);
  const activeUsers = computed(
    () => users.value.filter((u) => u.status === "ACTIVE")
  );
  async function fetchUsers(params) {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchUsersApi(params);
      users.value = data.users;
      total.value = data.total;
    } catch (err) {
      const message = err?.data?.statusMessage || err?.message || "Failed to fetch users";
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function fetchUser(id) {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchUserApi(id);
      currentUser.value = data.user;
      return data.user;
    } catch (err) {
      const message = err?.data?.statusMessage || err?.message || "Failed to fetch user";
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function createUser(payload) {
    loading.value = true;
    error.value = null;
    try {
      const data = await createUserApi(payload);
      users.value.unshift(data.user);
      return data.user;
    } catch (err) {
      const message = err?.data?.statusMessage || err?.message || "Failed to create user";
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function updateUser(id, payload) {
    loading.value = true;
    error.value = null;
    try {
      const data = await updateUserApi(id, payload);
      const idx = users.value.findIndex((u) => u.id === id);
      if (idx !== -1) users.value[idx] = data.user;
      if (currentUser.value?.id === id) currentUser.value = data.user;
      return data.user;
    } catch (err) {
      const message = err?.data?.statusMessage || err?.message || "Failed to update user";
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function deleteUser(id) {
    loading.value = true;
    error.value = null;
    try {
      await deleteUserApi(id);
      users.value = users.value.filter((u) => u.id !== id);
      if (currentUser.value?.id === id) currentUser.value = null;
    } catch (err) {
      const message = err?.data?.statusMessage || err?.message || "Failed to delete user";
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }
  function clearCurrent() {
    currentUser.value = null;
  }
  return {
    users,
    currentUser,
    loading,
    error,
    total,
    activeUsers,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    clearCurrent
  };
});
async function fetchPermissionsApi() {
  return $fetch("/api/permissions");
}
async function createPermissionApi(payload) {
  return $fetch("/api/permissions", {
    method: "POST",
    body: payload
  });
}
async function deletePermissionApi(id) {
  await $fetch(`/api/permissions/${id}`, { method: "DELETE" });
}
async function fetchUserPermissionsApi(userId) {
  return $fetch(`/api/users/${userId}/permissions`);
}
async function assignUserPermissionApi(userId, permissionId) {
  return $fetch(`/api/users/${userId}/permissions`, {
    method: "POST",
    body: { permissionId }
  });
}
async function removeUserPermissionApi(userId, permissionId) {
  await $fetch(`/api/users/${userId}/permissions/${permissionId}`, { method: "DELETE" });
}
async function fetchRolesApi() {
  return $fetch("/api/roles");
}
async function createRoleApi(payload) {
  return $fetch("/api/roles", {
    method: "POST",
    body: payload
  });
}
async function updateRoleApi(id, payload) {
  return $fetch(`/api/roles/${id}`, {
    method: "PATCH",
    body: payload
  });
}
async function deleteRoleApi(id) {
  await $fetch(`/api/roles/${id}`, { method: "DELETE" });
}
async function fetchGroupedPermissionsApi() {
  return $fetch("/api/permissions/grouped");
}
async function fetchRolePermissionIdsApi(roleId) {
  return $fetch(`/api/roles/${roleId}/permissions`);
}
async function saveRolePermissionsApi(roleId, permissionIds) {
  return $fetch(`/api/roles/${roleId}/permissions`, {
    method: "PUT",
    body: { permissionIds }
  });
}
async function fetchRolesLookupApi(params) {
  return $fetch("/api/roles/lookup", { params });
}
const usePermissionsStore = defineStore("permissions", () => {
  const permissions = ref([]);
  const userPermissions = ref([]);
  const roles = ref([]);
  const loading = ref(false);
  const error = ref(null);
  async function fetchPermissions() {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchPermissionsApi();
      permissions.value = data.permissions;
    } catch (err) {
      error.value = err?.data?.statusMessage || err?.message || "Failed to fetch permissions";
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function createPermission(payload) {
    loading.value = true;
    error.value = null;
    try {
      const data = await createPermissionApi(payload);
      permissions.value.push(data.permission);
      return data.permission;
    } catch (err) {
      error.value = err?.data?.statusMessage || err?.message || "Failed to create permission";
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function deletePermission(id) {
    loading.value = true;
    error.value = null;
    try {
      await deletePermissionApi(id);
      permissions.value = permissions.value.filter((p) => p.id !== id);
    } catch (err) {
      error.value = err?.data?.statusMessage || err?.message || "Failed to delete permission";
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function fetchUserPermissions(userId) {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchUserPermissionsApi(userId);
      userPermissions.value = data.userPermissions;
    } catch (err) {
      error.value = err?.data?.statusMessage || err?.message || "Failed to fetch user permissions";
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function assignUserPermission(userId, permissionId) {
    loading.value = true;
    error.value = null;
    try {
      const data = await assignUserPermissionApi(userId, permissionId);
      userPermissions.value.push(data.userPermission);
      return data.userPermission;
    } catch (err) {
      error.value = err?.data?.statusMessage || err?.message || "Failed to assign permission";
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function removeUserPermission(userId, permissionId) {
    loading.value = true;
    error.value = null;
    try {
      await removeUserPermissionApi(userId, permissionId);
      userPermissions.value = userPermissions.value.filter(
        (up) => up.permissionId !== permissionId
      );
    } catch (err) {
      error.value = err?.data?.statusMessage || err?.message || "Failed to remove permission";
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function fetchRoles() {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchRolesApi();
      roles.value = data.roles;
    } catch (err) {
      error.value = err?.data?.statusMessage || err?.message || "Failed to fetch roles";
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function createRole(payload) {
    loading.value = true;
    error.value = null;
    try {
      const data = await createRoleApi(payload);
      roles.value.push(data.role);
      return data.role;
    } catch (err) {
      error.value = err?.data?.statusMessage || err?.message || "Failed to create role";
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function removeRole(id) {
    loading.value = true;
    error.value = null;
    try {
      await deleteRoleApi(id);
      roles.value = roles.value.filter((r) => r.id !== id);
    } catch (err) {
      error.value = err?.data?.statusMessage || err?.message || "Failed to delete role";
      throw err;
    } finally {
      loading.value = false;
    }
  }
  return {
    permissions,
    userPermissions,
    roles,
    loading,
    error,
    fetchPermissions,
    createPermission,
    deletePermission,
    fetchUserPermissions,
    assignUserPermission,
    removeUserPermission,
    fetchRoles,
    createRole,
    removeRole
  };
});

export { usePermissionsStore as a, fetchGroupedPermissionsApi as b, fetchRolePermissionIdsApi as c, createRoleApi as d, deleteRoleApi as e, fetchRolesLookupApi as f, createPermissionApi as g, updateRoleApi as h, saveRolePermissionsApi as s, useUsersStore as u };
//# sourceMappingURL=store-B2e60c9z.mjs.map
