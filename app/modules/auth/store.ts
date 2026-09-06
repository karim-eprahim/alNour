import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, LoginPayload } from "./type";
import { loginApi, logoutApi, fetchMeApi } from "./api";
import { FCM_TOKEN_STORAGE_KEY } from "@/composables/useFcm";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<User | null>(null);
    const permissions = ref<Set<string>>(new Set());
    const loading = ref(false);
    const error = ref<string | null>(null);
    const isInitialized = ref(false);

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
        if (data.user.role === "DISTRIBUTOR") {
          navigateTo("/distributor");
        } else {
          navigateTo("/dashboard");
        }
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
        // Best-effort: stop push delivery to this device before ending the session
        try {
          const fcmToken = localStorage.getItem(FCM_TOKEN_STORAGE_KEY)
          if (fcmToken) {
            await $fetch("/api/notifications/unregister-token", {
              method: "POST",
              body: { token: fcmToken },
            })
            localStorage.removeItem(FCM_TOKEN_STORAGE_KEY)
          }
        }
        catch {
          // unregister failure must never block logout
        }
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
      } finally {
        isInitialized.value = true;
      }
    }

    let initPromise: Promise<void> | null = null;

    async function initialize() {
      if (isInitialized.value) return;
      if (!initPromise) {
        initPromise = fetchUser()
          .then(() => undefined)
          .finally(() => {
            initPromise = null;
          });
      }
      return initPromise;
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
      isInitialized,
      isAuthenticated,
      userName,
      userRole,
      login,
      logout,
      fetchUser,
      initialize,
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
