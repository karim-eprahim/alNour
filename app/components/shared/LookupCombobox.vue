<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon, Loader2, XIcon } from '@lucide/vue'
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
  ComboboxViewport,
} from '@/components/ui/combobox'
import type { LookupItem, LookupResponse, LookupQuery } from '@/types/lookup'

type EndpointFn = (params?: LookupQuery) => Promise<LookupResponse>

const props = withDefaults(defineProps<{
  modelValue?: string | number | null
  endpoint?: EndpointFn | null
  items?: any[] | null
  labelKey?: string
  valueKey?: string
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  emptyMessage?: string
  autoSelectSingle?: boolean
  includeAll?: boolean
  allLabel?: string
  allValue?: string
  debounceMs?: number
  cacheKey?: string
  queryParams?: Record<string, any>
  minSearchLength?: number
  clearable?: boolean
  class?: string
}>(), {
  modelValue: '',
  endpoint: null,
  items: null,
  labelKey: 'name',
  valueKey: 'id',
  placeholder: 'Select...',
  disabled: false,
  loading: false,
  emptyMessage: 'No results found.',
  autoSelectSingle: false,
  includeAll: false,
  allLabel: 'All',
  allValue: 'all',
  debounceMs: 300,
  cacheKey: '',
  queryParams: () => ({}),
  minSearchLength: 2,
  clearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  'search': [query: string]
  'opened': []
  'closed': []
  'loadMore': []
}>()

const open = ref(false)
const searchQuery = ref('')
const internalLoading = ref(false)
const loadingMore = ref(false)
const lookupItems = ref<LookupItem[]>([])
const cursor = ref<string | null>(null)
const hasMore = ref(false)
const loadMoreSentinel = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

const isRemote = computed(() => !!props.endpoint)
const isLocal = computed(() => !!props.items && !isRemote.value)

const lookupCache = new Map<string, { items: LookupItem[]; nextCursor: string | null; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000

function getCacheKey(params: Record<string, any>): string {
  const base = props.cacheKey || (props.endpoint ? props.endpoint.name : 'lookup')
  const sorted = Object.keys(params).sort().reduce((acc, k) => {
    if (params[k] !== undefined && params[k] !== null && params[k] !== '') {
      acc[k] = params[k]
    }
    return acc
  }, {} as Record<string, any>)
  return `${base}:${JSON.stringify(sorted)}`
}

function checkCache(params: Record<string, any>): LookupResponse | null {
  if (!props.cacheKey) return null
  const key = getCacheKey(params)
  const entry = lookupCache.get(key)
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return { items: entry.items, nextCursor: entry.nextCursor }
  }
  return null
}

function setCache(params: Record<string, any>, data: LookupResponse) {
  if (!props.cacheKey) return
  const key = getCacheKey(params)
  lookupCache.set(key, { ...data, timestamp: Date.now() })
}

function normalizeItem(item: any): LookupItem {
  if (item && typeof item.value === 'string' && typeof item.label === 'string') {
    return {
      value: item.value,
      label: item.label,
      subtitle: item.subtitle || undefined,
      disabled: item.disabled || false,
    }
  }
  return {
    value: String(item[props.valueKey] ?? ''),
    label: item[props.labelKey] ?? String(item[props.valueKey] ?? ''),
    subtitle: item.subtitle || undefined,
    disabled: item.disabled || false,
  }
}

const processedItems = computed(() => {
  if (isRemote.value) return lookupItems.value
  if (props.items) return props.items.map(normalizeItem)
  return []
})

const displayItems = computed((): LookupItem[] => {
  let items = processedItems.value
  if (props.includeAll) {
    items = [{ value: props.allValue, label: props.allLabel }, ...items]
  }
  return items
})

const selectedItem = computed(() => {
  return displayItems.value.find(i => i.value === String(props.modelValue)) || null
})

const loadingState = computed(() => {
  return props.loading || internalLoading.value
})

const displayText = computed(() => {
  if (selectedItem.value) return selectedItem.value.label
  if (props.modelValue) return String(props.modelValue)
  return props.placeholder
})

watch([processedItems, () => props.loading, () => props.autoSelectSingle], () => {
  if (!props.loading && props.autoSelectSingle && processedItems.value.length === 1 && !props.modelValue) {
    const firstItem = processedItems.value[0]
    if (firstItem) emit('update:modelValue', firstItem.value)
  }
}, { immediate: true })

async function fetchItems(isLoadMore = false) {
  if (!props.endpoint) return

  const params: LookupQuery = {
    take: 20,
    ...props.queryParams,
  }

  if (searchQuery.value && searchQuery.value.length >= props.minSearchLength) {
    params.q = searchQuery.value
  }

  const loadMoreCursor = isLoadMore ? cursor.value : undefined
  if (loadMoreCursor) {
    params.cursor = loadMoreCursor
  }

  if (!isLoadMore && !loadMoreCursor) {
    const cached = checkCache(params)
    if (cached) {
      lookupItems.value = cached.items
      cursor.value = cached.nextCursor
      hasMore.value = !!cached.nextCursor
      return
    }
  }

  if (isLoadMore) {
    loadingMore.value = true
  } else {
    internalLoading.value = true
  }

  if (isLoadMore) {
    emit('loadMore')
  } else {
    emit('search', searchQuery.value)
  }

  try {
    const response = await props.endpoint(params)
    const newItems = response.items.map(normalizeItem)

    if (isLoadMore) {
      lookupItems.value = [...lookupItems.value, ...newItems]
    } else {
      lookupItems.value = newItems
    }

    cursor.value = response.nextCursor
    hasMore.value = !!response.nextCursor

    if (!isLoadMore && !loadMoreCursor) {
      setCache(params, { items: lookupItems.value, nextCursor: response.nextCursor })
    }
  } catch (error) {
    console.error('LookupCombobox fetch failed:', error)
  } finally {
    if (isLoadMore) {
      loadingMore.value = false
    } else {
      internalLoading.value = false
    }
  }
}

const debouncedFetch = useDebounceFn((query: string) => {
  if (props.endpoint) {
    cursor.value = null
    lookupItems.value = []
    fetchItems()
  }
}, props.debounceMs)

watch(searchQuery, (val) => {
  if (isRemote.value) {
    if (val.length >= props.minSearchLength || val.length === 0) {
      debouncedFetch(val)
    }
  }
})

const selectedItemObj = computed({
  get: () => selectedItem.value as any,
  set: (item: any) => {
    if (!item) {
      emit('update:modelValue', null)
      return
    }
    const normalized = normalizeItem(item)
    emit('update:modelValue', normalized.value)
  },
})

function onOpenChange(isOpen: boolean) {
  open.value = isOpen
  if (isOpen) {
    searchQuery.value = ''
    emit('opened')
    if (isRemote.value && lookupItems.value.length === 0) {
      fetchItems()
    }
  } else {
    emit('closed')
  }
}

function handleClear(event: MouseEvent) {
  event.stopPropagation()
  emit('update:modelValue', null)
}

function itemComparator(a: any, b: any) {
  if (!a || !b) return a === b
  return String(a.value) === String(b.value)
}

watch(loadMoreSentinel, (el) => {
  if (observer) observer.disconnect()
  if (!el) return
  observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting && hasMore.value && !loadingMore.value && !internalLoading.value) {
      fetchItems(true)
    }
  }, { rootMargin: '200px' })
  observer.observe(el)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

onMounted(() => {
  if (isRemote.value && props.modelValue) {
    fetchItems()
  }
})
</script>

<template>
  <Combobox
    v-model="selectedItemObj"
    v-model:search-term="searchQuery"
    :by="itemComparator"
    :should-filter="false"
    :open="open"
    @update:open="onOpenChange"
    :disabled="disabled"
  >
    <ComboboxAnchor :class="props.class" as-child>
      <ComboboxTrigger as-child :disabled="disabled || loadingState">
        <Button
          variant="outline"
          role="combobox"
          :disabled="disabled || loadingState"
          class="w-full justify-between gap-2 font-normal"
        >
          <span :class="selectedItem ? 'text-foreground' : 'text-muted-foreground'">
            {{ displayText }}
          </span>

          <div class="flex items-center gap-1">
            <XIcon
              v-if="clearable && selectedItem"
              class="size-4 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
              @click.stop="handleClear"
            />
            <Loader2 v-if="loadingState" class="size-4 shrink-0 animate-spin text-muted-foreground" />
            <ChevronsUpDownIcon v-else class="size-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList>
      <ComboboxInput :placeholder="placeholder" />

      <div
        v-if="loadingState && lookupItems.length === 0 && isRemote"
        class="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground"
      >
        <Loader2 class="size-4 animate-spin" />
        Loading...
      </div>

      <template v-else>
        <ComboboxEmpty>{{ emptyMessage }}</ComboboxEmpty>

        <ComboboxViewport>
          <ComboboxGroup>
            <ComboboxItem
              v-for="item in displayItems"
              :key="item.value"
              :value="item"
              :disabled="item.disabled"
            >
              <span>{{ item.label }}</span>
              <span
                v-if="item.subtitle"
                class="text-muted-foreground ml-2 text-xs"
              >
                {{ item.subtitle }}
              </span>
              <ComboboxItemIndicator>
                <CheckIcon class="size-4" />
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxGroup>

          <div
            v-if="loadingMore"
            class="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground"
          >
            <Loader2 class="size-4 animate-spin" />
            Loading more...
          </div>
          <div
            v-else-if="hasMore"
            ref="loadMoreSentinel"
            class="h-px"
          />
        </ComboboxViewport>
      </template>
    </ComboboxList>
  </Combobox>
</template>
