<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store'

const { colorMode } = useColorMode()
const auth = useAuthStore()

onMounted(async () => {
  try {
    // Always verify session on mount — if the persisted user is stale or the
    // auth_token cookie expired, fetchUser() will set user to null and the
    // client-side middleware will redirect to login.
    await auth.fetchUser()
  } catch {}
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UiToaster />
</template>
