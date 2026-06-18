<script setup lang="ts">
const { fetchUser } = useAuth()
const { colorMode } = useColorMode()

onMounted(async () => {
  try {
    await fetchUser()
  } catch {}
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UiToaster />
</template>
