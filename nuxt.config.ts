import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],
  compatibilityDate: "2025-01-01",
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["shadcn-nuxt", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  components: [
    { path: "~/components/shared", pathPrefix: false },
    { path: "~/components/layout", pathPrefix: false }
  ],
  pinia: {
    storesDirs: ["modules/auth", "modules/users", "modules/permissions", "modules/products", "modules/warehouses", "modules/stock", "modules/suppliers", "modules/purchases", "modules/production", "modules/customers", "modules/sales", "modules/workers"],
  },
  shadcn: {
    prefix: "Ui",
    componentDir: "@/components/ui",
  },
  runtimeConfig: {
    jwtSecret: "",
  },
});
