import { ref } from 'vue';

function useTabData(fetcher) {
  const data = ref(null);
  const loading = ref(false);
  const loaded = ref(false);
  async function load() {
    if (loaded.value) return;
    loading.value = true;
    try {
      data.value = await fetcher();
      loaded.value = true;
    } finally {
      loading.value = false;
    }
  }
  return { data, loading, loaded, load };
}

export { useTabData as u };
//# sourceMappingURL=useTabData-BeQ82G7O.mjs.map
