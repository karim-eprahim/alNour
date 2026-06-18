import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, LoginPayload } from "./type";
import { loginApi, logoutApi, fetchMeApi } from "./api";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<User | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const isAuthenticated = computed(() => user.value !== null);
    const userName = computed(() => user.value?.name ?? "");
    const userRole = computed(() => user.value?.role ?? "");

    async function login(payload: LoginPayload) {
      loading.value = true;
      error.value = null;

      try {
        const data = await loginApi(payload);
        user.value = data.user;
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
        loading.value = false;
        error.value = null;
        navigateTo("/auth/login");
      }
    }

    async function fetchUser() {
      try {
        const data = await fetchMeApi();
        user.value = data.user;
        return data.user;
      } catch {
        user.value = null;
        return null;
      }
    }

    function clearUser() {
      user.value = null;
      loading.value = false;
      error.value = null;
    }

    return {
      user,
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
    // persist: {
    //   key: "alnour-auth",
    //   storage: localStorage,
    //   pick: ["user"],
    // },
    persist: true,

  },
);
