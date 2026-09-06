<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store'

const auth = useAuthStore()
const fcm = useFcm()

const authReady = ref(false)

watch(
  () => auth.isInitialized,
  (initialized) => {
    if (initialized && auth.isAuthenticated) {
      fcm.init()
    }
  },
  { immediate: true },
)

onMounted(() => {
  authReady.value = true
})
</script>

<template>
  <div class="min-h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UiToaster />

    <div v-if="!auth.isInitialized || !authReady" class="fixed inset-0 z-50">
      <AppLoading />
    </div>
  </div>
</template>
