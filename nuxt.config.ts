import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  compatibilityDate: '2025-01-01',
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['shadcn-nuxt', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  pinia: {
    storesDirs: ['modules/auth'],
  },
  shadcn: {
    prefix: 'Ui',
    componentDir: '@/components/ui',
  },
  runtimeConfig: {
    jwtSecret: '',
  },
})
