import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, LoginPayload } from "./type";
import { loginApi, logoutApi, fetchMeApi } from "./api";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<User | null>(null);
    const permissions = ref<Set<string>>(new Set());
    const loading = ref(false);
    const error = ref<string | null>(null);

    const isAuthenticated = computed(() => user.value !== null);
    const userName = computed(() => user.value?.name ?? "");
    const userRole = computed(() => user.value?.role ?? "");

    function setPermissions(list: string[]) {
      permissions.value = new Set(list);
    }

    async function login(payload: LoginPayload) {
      loading.value = true;
      error.value = null;

      try {
        const data = await loginApi(payload);
        user.value = data.user;
        setPermissions(data.permissions);
        return data;
      } catch (err: any) {
        const message =
          err?.data?.statusMessage || err?.message || "Login failed";
        error.value = message;
        throw err;
      } finally {
        loading.value = false;
      }
    }

    async function logout() {
      try {
        await logoutApi();
      } finally {
        user.value = null;
        permissions.value = new Set();
        loading.value = false;
        error.value = null;
        navigateTo("/auth/login");
      }
    }

    async function fetchUser() {
      try {
        const data = await fetchMeApi();
        user.value = data.user;
        setPermissions(data.permissions);
        return data.user;
      } catch {
        user.value = null;
        permissions.value = new Set();
        return null;
      }
    }

    function clearUser() {
      user.value = null;
      permissions.value = new Set();
      loading.value = false;
      error.value = null;
    }

    return {
      user,
      permissions,
      loading,
      error,
      isAuthenticated,
      userName,
      userRole,
      login,
      logout,
      fetchUser,
      clearUser,
    };
  },
  {
    persist: {
      key: "alnour-auth",
      storage: localStorage,
      pick: ["user", "permissions"],
      serializer: {
        serialize: (value) => {
          const obj = { ...value }
          if (obj.permissions instanceof Set) {
            obj.permissions = Array.from(obj.permissions)
          }
          return JSON.stringify(obj)
        },
        deserialize: (raw) => {
          const obj = JSON.parse(raw)
          if (Array.isArray(obj.permissions)) {
            obj.permissions = new Set(obj.permissions)
          }
          return obj
        },
      },
    },
  },
);
