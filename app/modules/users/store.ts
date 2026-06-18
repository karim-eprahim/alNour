import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, CreateUserPayload, UpdateUserPayload } from "./type";
import {
  fetchUsersApi,
  fetchUserApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "./api";

export const useUsersStore = defineStore("users", () => {
  const users = ref<User[]>([]);
  const currentUser = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const total = ref(0);

  const activeUsers = computed(() =>
    users.value.filter((u) => u.status === "ACTIVE")
  );

  async function fetchUsers(params?: { search?: string; role?: string; status?: string }) {
    loading.value = true;
    error.value = null;

    try {
      const data = await fetchUsersApi(params);
      users.value = data.users;
      total.value = data.total;
    } catch (err: any) {
      const message = err?.data?.statusMessage || err?.message || "Failed to fetch users";
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchUser(id: string) {
    loading.value = true;
    error.value = null;

    try {
      const data = await fetchUserApi(id);
      currentUser.value = data.user;
      return data.user;
    } catch (err: any) {
      const message = err?.data?.statusMessage || err?.message || "Failed to fetch user";
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createUser(payload: CreateUserPayload) {
    loading.value = true;
    error.value = null;

    try {
      const data = await createUserApi(payload);
      users.value.unshift(data.user);
      return data.user;
    } catch (err: any) {
      const message = err?.data?.statusMessage || err?.message || "Failed to create user";
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateUser(id: string, payload: UpdateUserPayload) {
    loading.value = true;
    error.value = null;

    try {
      const data = await updateUserApi(id, payload);
      const idx = users.value.findIndex((u) => u.id === id);
      if (idx !== -1) users.value[idx] = data.user;
      if (currentUser.value?.id === id) currentUser.value = data.user;
      return data.user;
    } catch (err: any) {
      const message = err?.data?.statusMessage || err?.message || "Failed to update user";
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteUser(id: string) {
    loading.value = true;
    error.value = null;

    try {
      await deleteUserApi(id);
      users.value = users.value.filter((u) => u.id !== id);
      if (currentUser.value?.id === id) currentUser.value = null;
    } catch (err: any) {
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
    users, currentUser, loading, error, total,
    activeUsers,
    fetchUsers, fetchUser,
    createUser, updateUser, deleteUser,
    clearCurrent,
  };
});
