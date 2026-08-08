<script setup lang="ts">
import { MAP_TILE_URL, MAP_TILE_ATTRIBUTION, MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM } from '~/utils/mapConfig'

import 'leaflet/dist/leaflet.css'

const props = defineProps<{
  customerName?: string | null
  address?: string | null
  latitude?: number | null
  longitude?: number | null
}>()

const mapEl = ref<HTMLElement | null>(null)
let L: any = null
let map: any = null
let tileLayer: any = null
let marker: any = null

const hasLocation = computed(() => props.latitude != null && props.longitude != null)

function pinIcon() {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:32px;height:32px;
        background:#dc2626;
        border:3px solid #fff;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 2px 8px rgba(0,0,0,.45);
        display:flex;align-items:center;justify-content:center;
        color:#fff;font-weight:700;font-size:12px;font-family:ui-sans-serif,system-ui,sans-serif;
      ">${(props.customerName || '?').charAt(0).toUpperCase()}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 30],
    popupAnchor: [0, -32],
  })
}

function popupHtml() {
  return `
    <div class="customer-location-popup">
      <div class="customer-location-popup-title">${props.customerName || 'Customer'}</div>
      <div>${props.address || ''}</div>
      <div class="customer-location-popup-meta">${props.latitude?.toFixed(6)}, ${props.longitude?.toFixed(6)}</div>
    </div>
  `
}

async function ensureMap() {
  if (map || !mapEl.value || !import.meta.client || !hasLocation.value) return
  await nextTick()
  L = await import('leaflet')
  map = L.map(mapEl.value, { zoomControl: true }).setView([props.latitude, props.longitude], 15)
  tileLayer = L.tileLayer(MAP_TILE_URL, {
    attribution: MAP_TILE_ATTRIBUTION,
    maxZoom: 19,
  }).addTo(map)
  marker = L.marker([props.latitude, props.longitude], { icon: pinIcon() })
    .bindPopup(popupHtml())
    .addTo(map)
  marker.openPopup?.()
  requestAnimationFrame(() => map?.invalidateSize())
}

function invalidate() {
  if (map) map.invalidateSize()
}

onMounted(() => {
  ensureMap()
})

watch(hasLocation, () => {
  ensureMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div v-if="hasLocation" ref="mapEl" class="customer-location-map-root h-full w-full" />
  <div v-else class="flex h-full min-h-40 w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
    Customer location is not available.
  </div>
</template>

<style scoped>
.customer-location-map-root {
  z-index: 0;
}

.customer-location-map-root :deep(.customer-location-popup) {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  line-height: 1.45;
}
.customer-location-map-root :deep(.customer-location-popup-title) {
  font-weight: 700;
  margin-bottom: 2px;
}
.customer-location-map-root :deep(.customer-location-popup-meta) {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 3px;
}
</style>