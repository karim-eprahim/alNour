<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon, Loader2 } from '@lucide/vue'
import { computed, ref, watch } from 'vue'
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
} from '@/components/ui/combobox'

interface LookupItem {
  [key: string]: any
}

const props = withDefaults(defineProps<{
  modelValue?: string | number | null
  items: LookupItem[]
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
  class?: string
}>(), {
  modelValue: '',
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
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  'open': []
}>()

const open = ref(false)

const displayItems = computed(() => {
  if (props.includeAll) {
    return [{ [props.valueKey]: props.allValue, [props.labelKey]: props.allLabel }, ...props.items]
  }
  return props.items
})

const selectedItem = computed(() => {
  return displayItems.value.find(i => String(i[props.valueKey]) === String(props.modelValue)) || null
})

watch(() => props.items, (items) => {
  if (!props.loading && props.autoSelectSingle && items.length === 1 && !props.modelValue) {
    const item = items[0]
    if (item) emit('update:modelValue', String(item[props.valueKey]))
  }
}, { immediate: true })

function handleSelect(item: LookupItem | null) {
  if (!item) {
    emit('update:modelValue', null)
    return
  }
  emit('update:modelValue', String(item[props.valueKey]))
}

function onOpenChange(isOpen: boolean) {
  open.value = isOpen
  if (isOpen) emit('open')
}
</script>

<template>
  <Combobox 
    :model-value="selectedItem" 
    @update:model-value="(val: any) => handleSelect(val)"
    :by="valueKey" 
    :open="open"
    @update:open="onOpenChange"
    :class="class"
  >
    <ComboboxAnchor :class="props.class" as-child>
      <ComboboxTrigger as-child :disabled="disabled || loading">
        <Button
          variant="outline"
          role="combobox"
          :disabled="disabled || loading"
          class="w-full justify-between gap-2 font-normal"
        >
          <span :class="selectedItem ? 'text-foreground' : 'text-muted-foreground'">
            {{ selectedItem ? selectedItem[labelKey] : placeholder }}
          </span>
          
          <Loader2 v-if="loading" class="size-4 shrink-0 animate-spin text-muted-foreground" />
          <ChevronsUpDownIcon v-else class="size-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList class=" w-50">
      <ComboboxInput class="w-48" :placeholder="placeholder" />
      
      <div v-if="loading" class="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
        <Loader2 class="size-4 animate-spin" />
        Loading...
      </div>

      <template v-else>
        <ComboboxEmpty>{{ emptyMessage }}</ComboboxEmpty>
        
        <ComboboxGroup class=" w-full mt-1">
          <ComboboxItem
            v-for="item in displayItems"
            :key="String(item[valueKey])"
            :value="item"
          >
            {{ item[labelKey] }}
            <ComboboxItemIndicator class="ml-auto">
              <CheckIcon class="size-4" />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxGroup>
      </template>
    </ComboboxList>
  </Combobox>
</template>