import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ActiveTracking, TrackingHistoryResponse } from './type'
import { fetchActiveTrackingApi, fetchTrackingLocationsApi } from './api'

export const useTrackingStore = defineStore('tracking', () => {
  const trackings = ref<ActiveTracking[]>([])
  const loading = ref(false)
  const lastFetchedAt = ref<Date | null>(null)
  const selectedTrackingId = ref<string | null>(null)
  const history = ref<TrackingHistoryResponse | null>(null)

  async function fetchActive() {
    loading.value = true
    try {
      const data = await fetchActiveTrackingApi()
      trackings.value = data.trackings
      lastFetchedAt.value = new Date()

      if (selectedTrackingId.value && !trackings.value.some((t) => t.trackingId === selectedTrackingId.value)) {
        selectedTrackingId.value = null
      }
      return data
    } finally {
      loading.value = false
    }
  }

  async function fetchHistory(id: string) {
    const data = await fetchTrackingLocationsApi(id)
    history.value = data
    return data
  }

  function setSelectedTracking(id: string | null) {
    selectedTrackingId.value = id
  }

  function clear() {
    trackings.value = []
    loading.value = false
    lastFetchedAt.value = null
    selectedTrackingId.value = null
  }

  return {
    trackings,
    loading,
    lastFetchedAt,
    selectedTrackingId,
    history,
    fetchActive,
    fetchHistory,
    setSelectedTracking,
    clear,
  }
})