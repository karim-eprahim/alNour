<script setup lang="ts">
import { Upload, X, ImageOff } from '@lucide/vue'
import { toast } from 'vue-sonner'


const props = withDefaults(defineProps<{
  modelValue?: string | null
  disabled?: boolean
}>(), {
  modelValue: null,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const preview = ref<string | null>(props.modelValue || null)
const uploading = ref(false)

watch(() => props.modelValue, (val) => {
  if (val !== preview.value) preview.value = val
})

async function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    toast.error('Image must be less than 5MB')
    return
  }

  uploading.value = true
  try {
    const reader = new FileReader()
    const dataUrl = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

    const { url } = await $fetch<{ url: string }>('/api/upload', {
      method: 'POST',
      body: { image: dataUrl, name: file.name },
    })

    preview.value = url
    emit('update:modelValue', url)
  } catch (err) {
    toast.error('Failed to upload image')
  } finally {
    uploading.value = false
  }
}

function removeImage() {
  preview.value = null
  emit('update:modelValue', null)
}
</script>

<template>
  <div class="flex items-center gap-3">
    <div
      class="relative size-20 flex items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 overflow-hidden"
      :class="[disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/50']"
    >
      <img
        v-if="preview"
        :src="preview"
        alt="Preview"
        class="size-full object-cover"
      />
      <div v-else class="flex flex-col items-center gap-1 text-muted-foreground">
        <ImageOff v-if="uploading" class="size-5 animate-pulse" />
        <Upload v-else class="size-5" />
        <span class="text-[10px]">Upload</span>
      </div>
      <input
        type="file"
        accept="image/*"
        class="absolute inset-0 opacity-0 cursor-pointer"
        :disabled="disabled || uploading"
        @change="handleFileSelect"
      />
    </div>
    <div v-if="preview" class="flex flex-col gap-1">
      <span class="text-xs text-muted-foreground truncate max-w-32">Image uploaded</span>
      <UiButton variant="ghost" size="icon-xs" class="text-destructive size-6" @click="removeImage">
        <X class="size-3" />
      </UiButton>
    </div>
    <div v-else-if="uploading" class="flex items-center gap-2">
      <span class="text-xs text-muted-foreground">Uploading...</span>
    </div>
  </div>
</template>
