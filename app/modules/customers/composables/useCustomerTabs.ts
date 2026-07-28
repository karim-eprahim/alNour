import { ref, type Ref } from 'vue'

export function useTabData<T>(fetcher: () => Promise<T>) {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const loaded = ref(false)

  async function load() {
    if (loaded.value) return
    loading.value = true
    try {
      data.value = await fetcher()
      loaded.value = true
    } finally {
      loading.value = false
    }
  }

  return { data, loading, loaded, load }
}
