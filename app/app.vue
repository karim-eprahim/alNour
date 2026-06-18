<script setup lang="ts">
import {useAuthStore} from "@/modules/auth/store"

const { colorMode } = useColorMode()
const auth = useAuthStore()

onMounted(async () => {
  try {
    if (!auth.user) {
      await auth.fetchUser()
    }
  } catch {}
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UiToaster />
</template>
