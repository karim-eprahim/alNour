<script setup lang="ts">
import type { ActiveTracking, TrackingLocation } from '@/modules/tracking/type'
import { MAP_TILE_URL, MAP_TILE_ATTRIBUTION, MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM } from '~/utils/mapConfig'

import 'leaflet/dist/leaflet.css'

const props = defineProps<{
  trackings?: ActiveTracking[]
  selectedTrackingId?: string | null
  route?: TrackingLocation[] | null
  routeCustomer?: { name: string; latitude: number | null; longitude: number | null } | null
}>()

const mapEl = ref<HTMLElement | null>(null)
let L: any = null
let map: any = null
let tileLayer: any = null
let liveLayer: any = null
let routeLayer: any = null

const distributorMarkers = new Map<string, any>()
const accuracyCircles = new Map<string, any>()
const customerMarkers = new Map<string, any>()
let fittedKeys = ''

function truckIcon(name: string, selected = false) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:32px;height:32px;border-radius:50%;
        background:#16a34a;border:${selected ? 4 : 3}px solid #fff;
        box-shadow:0 2px 8px rgba(0,0,0,.45),0 0 0 ${selected ? 6 : 0}px rgba(22,163,74,.35);
        display:flex;align-items:center;justify-content:center;
        color:#fff;font-weight:700;font-size:13px;font-family:ui-sans-serif,system-ui,sans-serif;
      ">${(name || '?').charAt(0).toUpperCase()}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  })
}

function customerIcon(label = '') {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:22px;height:22px;border-radius:50% 50% 50% 0;
        background:#dc2626;border:2px solid #fff;
        box-shadow:0 1px 4px rgba(0,0,0,.4);
        transform:rotate(-45deg);
        display:flex;align-items:center;justify-content:center;
        color:#fff;font-weight:700;font-size:11px;font-family:ui-sans-serif,system-ui,sans-serif;
      ">${label}</div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 22],
    popupAnchor: [0, -20],
  })
}

function startIcon() {
  return L.divIcon({
    className: '',
    html: '<div style="width:14px;height:14px;border-radius:50%;background:#16a34a;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

function endIcon() {
  return L.divIcon({
    className: '',
    html: '<div style="width:14px;height:14px;border-radius:50%;background:#dc2626;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

function formatAge(iso: string) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime())
  const sec = Math.floor(diff / 1000)
  if (sec < 60) return `${sec}s ago`
  return `${Math.floor(sec / 60)}m ${sec % 60}s ago`
}

function popupHtml(t: ActiveTracking) {
  const loc = t.currentLocation
  const speed = loc?.speed != null ? `${loc.speed.toFixed(1)} km/h` : '—'
  const heading = loc?.heading != null ? `${Math.round(loc.heading)}°` : '—'
  return `
    <div class="tracking-popup">
      <div class="tracking-popup-title">${t.distributor.name}</div>
      <div>${t.order.orderNumber} · ${t.order.status}</div>
      <div>Customer: <b>${t.customer?.name || '—'}</b></div>
      <div>Speed: <b>${speed}</b> &nbsp; Heading: <b>${heading}</b></div>
      <div class="tracking-popup-meta">Updated ${formatAge(t.lastUpdatedAt)}</div>
    </div>
  `
}

function customerPopup(name: string) {
  return `<div class="tracking-popup"><div class="tracking-popup-title">${name}</div><div class="tracking-popup-meta">Delivery location</div></div>`
}

async function ensureMap() {
  if (map || !mapEl.value || !import.meta.client) return
  L = await import('leaflet')
  map = L.map(mapEl.value, { zoomControl: true }).setView(
    [MAP_DEFAULT_CENTER.lat, MAP_DEFAULT_CENTER.lng],
    MAP_DEFAULT_ZOOM,
  )
  tileLayer = L.tileLayer(MAP_TILE_URL, {
    attribution: MAP_TILE_ATTRIBUTION,
    maxZoom: 19,
  }).addTo(map)
  liveLayer = L.layerGroup().addTo(map)
  routeLayer = L.layerGroup().addTo(map)
}

function fitLive() {
  if (!map) return
  const points: any[] = []
  distributorMarkers.forEach((m) => {
    const ll = m.getLatLng()
    if (ll) points.push(ll)
  })
  customerMarkers.forEach((m) => {
    const ll = m.getLatLng()
    if (ll) points.push(ll)
  })

  if (points.length === 0) {
    map.setView([MAP_DEFAULT_CENTER.lat, MAP_DEFAULT_CENTER.lng], MAP_DEFAULT_ZOOM)
    fittedKeys = ''
    return
  }

  const keys =
    Array.from(distributorMarkers.keys()).sort().join(',') +
    '|' +
    Array.from(customerMarkers.keys()).sort().join(',')
  if (keys === fittedKeys) return
  fittedKeys = keys
  map.fitBounds(L.latLngBounds(points).pad(0.2), { maxZoom: 15 })
}

function syncLive() {
  if (!map || !liveLayer) return

  const trackings = (props.trackings || []).filter((t) => t.status === 'ACTIVE')
  const selectedId = props.selectedTrackingId
  const seen = new Set<string>()

  for (const t of trackings) {
    seen.add(t.trackingId)
    const loc = t.currentLocation

    if (loc?.latitude != null && loc?.longitude != null) {
      const latLng: [number, number] = [loc.latitude, loc.longitude]
      const selected = t.trackingId === selectedId
      let marker = distributorMarkers.get(t.trackingId)
      if (!marker) {
        marker = L.marker(latLng, { icon: truckIcon(t.distributor.name, selected) })
        marker.bindPopup(popupHtml(t))
        marker.addTo(liveLayer)
        distributorMarkers.set(t.trackingId, marker)
      } else {
        marker.setLatLng(latLng)
        marker.setIcon(truckIcon(t.distributor.name, selected))
        marker.setPopupContent(popupHtml(t))
      }

      if (loc.accuracy != null && loc.accuracy > 0) {
        let circle = accuracyCircles.get(t.trackingId)
        if (!circle) {
          circle = L.circle(latLng, { radius: loc.accuracy }).addTo(liveLayer)
          accuracyCircles.set(t.trackingId, circle)
        } else {
          circle.setLatLng(latLng)
          circle.setRadius(loc.accuracy)
        }
      } else {
        const circle = accuracyCircles.get(t.trackingId)
        if (circle) {
          circle.remove()
          accuracyCircles.delete(t.trackingId)
        }
      }
    }

    const customer = t.customer
    if (customer?.latitude != null && customer?.longitude != null) {
      const latLng: [number, number] = [customer.latitude, customer.longitude]
      let marker = customerMarkers.get(t.trackingId)
      if (!marker) {
        marker = L.marker(latLng, { icon: customerIcon((customer.name || '?').charAt(0)) })
          .bindPopup(customerPopup(customer.name))
          .addTo(liveLayer)
        customerMarkers.set(t.trackingId, marker)
      } else {
        marker.setLatLng(latLng)
      }
    } else {
      const marker = customerMarkers.get(t.trackingId)
      if (marker) {
        marker.remove()
        customerMarkers.delete(t.trackingId)
      }
    }
  }

  for (const [id, marker] of distributorMarkers) {
    if (!seen.has(id)) {
      marker.remove()
      distributorMarkers.delete(id)
      const circle = accuracyCircles.get(id)
      if (circle) {
        circle.remove()
        accuracyCircles.delete(id)
      }
      const customer = customerMarkers.get(id)
      if (customer) {
        customer.remove()
        customerMarkers.delete(id)
      }
    }
  }

  fitLive()
}

function syncRoute() {
  if (!map || !routeLayer || !L) return
  routeLayer.clearLayers()
  fittedKeys = ''

  const raw = props.route || []
  const latLngs: [number, number][] = raw
    .filter((l) => l.latitude != null && l.longitude != null)
    .map((l) => [l.latitude, l.longitude])

  if (latLngs.length === 0) return

  const polyline = L.polyline(latLngs, {
    color: '#2563eb',
    weight: 4,
    opacity: 0.9,
  }).addTo(routeLayer)

  L.marker(latLngs[0], { icon: startIcon() })
    .bindPopup('<div class="tracking-popup">Tracking started</div>')
    .addTo(routeLayer)

  if (latLngs.length > 1) {
    L.marker(latLngs[latLngs.length - 1], { icon: endIcon() })
      .bindPopup('<div class="tracking-popup">Last recorded position</div>')
      .addTo(routeLayer)
  }

  const customer = props.routeCustomer
  if (customer?.latitude != null && customer?.longitude != null) {
    L.marker([customer.latitude, customer.longitude], { icon: customerIcon((customer.name || '?').charAt(0)) })
      .bindPopup(customerPopup(customer.name))
      .addTo(routeLayer)
  }

  map.fitBounds(polyline.getBounds().pad(0.25), { maxZoom: 16 })
}

function syncAll() {
  if (!map) return
  if (props.route?.length) {
    syncRoute()
  } else {
    syncLive()
  }
}

onMounted(() => {
  ensureMap().then(syncAll)
})

watch(
  () => props.trackings,
  () => {
    if (map) syncLive()
  },
  { deep: true },
)

watch(
  () => [props.route, props.routeCustomer],
  () => {
    if (map && props.route?.length) syncRoute()
  },
  { deep: true },
)

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div ref="mapEl" class="tracking-map-root h-full w-full" />
</template>

<style scoped>
.tracking-map-root {
  z-index: 0;
}

.tracking-map-root :deep(.tracking-popup) {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  line-height: 1.45;
}
.tracking-map-root :deep(.tracking-popup-title) {
  font-weight: 700;
  margin-bottom: 2px;
}
.tracking-map-root :deep(.tracking-popup-meta) {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 3px;
}
</style>