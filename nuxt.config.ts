import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],
  compatibilityDate: "2025-01-01",
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["shadcn-nuxt", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt", "@nuxtjs/color-mode"],
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },
  components: [
    { path: "~/components/shared", pathPrefix: false },
    { path: "~/components/layout", pathPrefix: false },
    { path: "~/components/distributor", pathPrefix: false },
    { path: "~/components/tracking", pathPrefix: false },
    { path: "~/components/map", pathPrefix: false },
    { path: "~/components/settings", pathPrefix: false }
  ],
  pinia: {
    storesDirs: ["modules/auth", "modules/users", "modules/permissions", "modules/products", "modules/warehouses", "modules/stock", "modules/suppliers", "modules/purchases", "modules/production", "modules/customers", "modules/sales", "modules/workers", "modules/expenses", "modules/distributor", "modules/ledger", "modules/tracking", "modules/accounting"],
  },
  shadcn: {
    prefix: "Ui",
    componentDir: "@/components/ui",
  },
  runtimeConfig: {
    jwtSecret: "",
    firebaseAdmin: {
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    },    public: {
      firebase: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: "",
        vapidKey: "",
      },
    },
  },
  nitro: {
    experimental: {
      websocket: true
    }
  }
});
