import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  compatibilityDate: '2025-01-01',
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['shadcn-nuxt'],
  shadcn: {
    prefix: 'Ui',
    componentDir: '@/components/ui',
  },
  runtimeConfig: {
    jwtSecret: '',
  },
})
