<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store'

const auth = useAuthStore()

const authReady = ref(false)

onMounted(() => {
  authReady.value = true
})
</script>

<template>
  <AppLoading v-if="!auth.isInitialized || !authReady" />

  <template v-else>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UiToaster />
  </template>
</template>
