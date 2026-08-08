import { submitTrackingLocationApi } from '@/modules/tracking/api'

export interface WatchedLocation {
  latitude: number
  longitude: number
  accuracy?: number | null
  speed?: number | null
  heading?: number | null
  timestamp: number
}

export type TrackingRuntimeStatus = 'idle' | 'tracking' | 'stopped'

export const TRACKING_SEND_INTERVAL = 20_000

const enum GeoErrorMessages {
  PERMISSION_DENIED = 'GPS permission denied. Enable location access and try again.',
  POSITION_UNAVAILABLE = 'GPS unavailable right now.',
  TIMEOUT = 'GPS timed out. Check your connection and try again.',
}

function geoErrorMessage(code: number | undefined): string {
  switch (code) {
    case 1:
      return GeoErrorMessages.PERMISSION_DENIED
    case 2:
      return GeoErrorMessages.POSITION_UNAVAILABLE
    case 3:
      return GeoErrorMessages.TIMEOUT
    default:
      return 'Unable to obtain GPS position.'
  }
}

export function useDistributorTracking() {
  const trackingId = ref<string | null>(null)
  const status = ref<TrackingRuntimeStatus>('idle')
  const currentLocation = ref<WatchedLocation | null>(null)
  const error = ref<string | null>(null)
  const lastSentAt = ref<Date | null>(null)
  const positionsSent = ref(0)

  let watcherId: number | null = null
  let sendTimer: ReturnType<typeof setInterval> | null = null
  let latest: WatchedLocation | null = null
  let disposed = false

  function supportsGeolocation(): boolean {
    return import.meta.client && 'geolocation' in navigator
  }

  function cleanupWatchers() {
    if (watcherId !== null && supportsGeolocation()) {
      navigator.geolocation.clearWatch(watcherId)
    }
    watcherId = null
    if (sendTimer) {
      clearInterval(sendTimer)
      sendTimer = null
    }
  }

  function startGpsWatcher() {
    if (!supportsGeolocation()) {
      error.value = 'Geolocation is not supported by this browser/device.'
      return
    }

    watcherId = navigator.geolocation.watchPosition(
      (position) => {
        const loc: WatchedLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy ?? null,
          speed: position.coords.speed ?? null,
          heading: position.coords.heading ?? null,
          timestamp: position.timestamp,
        }
        latest = loc
        currentLocation.value = loc
        if (error.value) error.value = null
      },
      (err) => {
        error.value = geoErrorMessage(err?.code)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10_000,
        timeout: 20_000,
      },
    )
  }

  async function sendLatestLocation() {
    const targetId = trackingId.value
    if (!targetId || !latest) return

    try {
      await submitTrackingLocationApi(targetId, {
        latitude: latest.latitude,
        longitude: latest.longitude,
        accuracy: latest.accuracy,
        speed: latest.speed,
        heading: latest.heading,
        recordedAt: new Date(latest.timestamp).toISOString(),
      })
      lastSentAt.value = new Date()
      positionsSent.value += 1
      if (error.value) error.value = null
    } catch {
      // Keep the latest position and retry on the next 20-second tick.
      // Do not crash the UI for a temporary network failure.
    }
  }

  function start(trackingSessionId: string) {
    cleanupWatchers()
    disposed = false
    trackingId.value = trackingSessionId
    currentLocation.value = null
    lastSentAt.value = null
    positionsSent.value = 0
    error.value = null
    latest = null

    startGpsWatcher()
    sendTimer = setInterval(() => {
      void sendLatestLocation()
    }, TRACKING_SEND_INTERVAL)
    status.value = 'tracking'
  }

  function stop() {
    disposed = true
    cleanupWatchers()
    status.value = 'stopped'
  }

  if (import.meta.client) {
    onUnmounted(() => {
      if (!disposed) {
        cleanupWatchers()
      }
    })
  }

  return {
    trackingId,
    status,
    currentLocation,
    error,
    lastSentAt,
    positionsSent,
    start,
    stop,
  }
}