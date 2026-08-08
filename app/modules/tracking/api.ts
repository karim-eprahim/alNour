import type { ActiveTracking, TrackingHistoryResponse, TrackingLocation } from './type'

export async function fetchActiveTrackingApi(): Promise<{ trackings: ActiveTracking[] }> {
  return $fetch('/api/tracking/active')
}

export async function fetchTrackingLocationsApi(id: string, params?: { limit?: number }): Promise<TrackingHistoryResponse> {
  return $fetch(`/api/tracking/${id}/locations`, { params })
}

export async function submitTrackingLocationApi(
  trackingId: string,
  payload: { latitude: number; longitude: number; accuracy?: number | null; speed?: number | null; heading?: number | null; recordedAt?: string },
): Promise<{ location: TrackingLocation; lastUpdatedAt: string }> {
  return $fetch(`/api/distributors/tracking/${trackingId}/location`, {
    method: 'POST',
    body: payload,
  })
}