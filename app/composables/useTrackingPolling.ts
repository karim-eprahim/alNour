import { useTrackingStore } from '@/modules/tracking/store'

export const TRACKING_POLL_INTERVAL = 20_000

export function useTrackingPolling() {
  const store = useTrackingStore()
  let timer: ReturnType<typeof setInterval> | null = null

  function start() {
    if (timer) return
    if (!import.meta.client) return

    void store.fetchActive()
    timer = setInterval(() => {
      void store.fetchActive()
    }, TRACKING_POLL_INTERVAL)
  }

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  if (import.meta.client) {
    onUnmounted(() => stop())
  }

  return { start, stop }
}