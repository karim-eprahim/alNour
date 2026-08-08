<script setup lang="ts">
import { MAP_TILE_URL, MAP_TILE_ATTRIBUTION, MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM } from '~/utils/mapConfig'

import 'leaflet/dist/leaflet.css'

const props = defineProps<{
  latitude: number | null
  longitude: number | null
}>()

const emit = defineEmits<{
  'update:latitude': [value: number | null]
  'update:longitude': [value: number | null]
}>()

const mapEl = ref<HTMLElement | null>(null)
let L: any = null
let map: any = null
let tileLayer: any = null
let marker: any = null
let syncing = false

function pinIcon() {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:28px;height:28px;
        background:#dc2626;
        border:3px solid #fff;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 2px 8px rgba(0,0,0,.45);
      "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 26],
    popupAnchor: [0, -30],
  })
}

function setMarker(lat: number, lng: number) {
  if (!L || !map) return
  syncing = true
  if (!marker) {
    marker = L.marker([lat, lng], { icon: pinIcon(), draggable: true })
    marker.on('dragend', () => {
      const ll = marker.getLatLng()
      emitCoord(ll.lat, ll.lng)
    })
    marker.addTo(map)
  } else {
    marker.setLatLng([lat, lng])
  }
  syncing = false
}

function emitCoord(lat: number, lng: number) {
  emit('update:latitude', lat)
  emit('update:longitude', lng)
}

function onMapClick(e: any) {
  emitCoord(e.latlng.lat, e.latlng.lng)
}

async function ensureMap() {
  if (map || !mapEl.value || !import.meta.client) return
  await nextTick()
  L = await import('leaflet')
  const hasCoords = props.latitude != null && props.longitude != null
  const lat = props.latitude ?? MAP_DEFAULT_CENTER.lat
  const lng = props.longitude ?? MAP_DEFAULT_CENTER.lng
  map = L.map(mapEl.value, { zoomControl: true }).setView([lat, lng], hasCoords ? 15 : MAP_DEFAULT_ZOOM)
  tileLayer = L.tileLayer(MAP_TILE_URL, {
    attribution: MAP_TILE_ATTRIBUTION,
    maxZoom: 19,
  }).addTo(map)
  map.on('click', onMapClick)
  if (hasCoords) setMarker(lat, lng)
  requestAnimationFrame(() => map?.invalidateSize())
}

watch(
  () => [props.latitude, props.longitude] as const,
  () => {
    if (!map || syncing) return
    if (props.latitude != null && props.longitude != null) setMarker(props.latitude, props.longitude)
  },
)

onMounted(ensureMap)

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div ref="mapEl" class="map-picker-root h-full w-full" />
</template>

<style scoped>
.map-picker-root {
  z-index: 0;
}
</style>