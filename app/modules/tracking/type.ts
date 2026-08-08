export interface TrackingLocation {
  latitude: number
  longitude: number
  accuracy?: number | null
  speed?: number | null
  heading?: number | null
  recordedAt: string
}

export interface ActiveTracking {
  trackingId: string
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  startedAt: string
  lastUpdatedAt: string
  distributor: {
    id: string
    name: string
    phone?: string | null
  }
  order: {
    id: string
    orderNumber: string
    status: string
  }
  customer: {
    id: string
    name: string
    phone?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
  } | null
  currentLocation: TrackingLocation | null
}

export interface TrackingDetail {
  id: string
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  startedAt: string
  endedAt?: string | null
  lastUpdatedAt: string
  distributor: {
    id: string
    name: string
  }
  order: {
    id: string
    orderNumber: string
    status: string
  }
  customer: {
    id: string
    name: string
    phone?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
  } | null
}

export interface TrackingHistoryResponse {
  tracking: TrackingDetail
  locations: TrackingLocation[]
  total: number
  limit: number
}