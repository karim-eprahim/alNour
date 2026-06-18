<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const { login, loading, error } = useAuth()

const email = ref('')
const password = ref('')

async function handleLogin() {
  try {
    await login({ email: email.value, password: password.value })
    navigateTo('/')
  } catch {}
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleLogin">
    <div class="space-y-1">
      <h2 class="text-lg font-semibold">Sign In</h2>
      <p class="text-sm text-muted-foreground">Enter your credentials to access the system</p>
    </div>

    <div v-if="error" class="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {{ error }}
    </div>

    <div class="space-y-2">
      <UiLabel for="email">Email</UiLabel>
      <UiInput
        id="email"
        v-model="email"
        type="email"
        placeholder="admin@alnour.com"
        required
        autocomplete="email"
      />
    </div>

    <div class="space-y-2">
      <UiLabel for="password">Password</UiLabel>
      <UiInput
        id="password"
        v-model="password"
        type="password"
        placeholder="••••••••"
        required
        autocomplete="current-password"
      />
    </div>

    <UiButton type="submit" class="w-full" :disabled="loading">
      <div v-if="loading" class="flex items-center gap-2">
        <div class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        Signing in...
      </div>
      <span v-else>Sign In</span>
    </UiButton>
  </form>
</template>
