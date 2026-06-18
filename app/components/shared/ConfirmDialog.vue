<script setup lang="ts">
import { AlertTriangle } from '@lucide/vue'

interface Props {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Are you sure?',
  description: 'This action cannot be undone.',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'destructive',
  loading: false,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const open = defineModel<boolean>('open', { required: true })
</script>

<template>
  <UiDialog :open="open" @update:open="open = $event">
    <UiDialogContent class="sm:max-w-md">
      <UiDialogHeader>
        <div class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle class="size-5 text-destructive" />
        </div>
        <UiDialogTitle class="text-center">{{ title }}</UiDialogTitle>
        <UiDialogDescription class="text-center">
          {{ description }}
        </UiDialogDescription>
      </UiDialogHeader>
      <UiDialogFooter class="gap-2 sm:justify-center">
        <UiButton variant="outline" @click="emit('cancel')">
          {{ cancelText }}
        </UiButton>
        <UiButton
          :variant="variant === 'destructive' ? 'destructive' : 'default'"
          :disabled="loading"
          @click="emit('confirm')"
        >
          {{ loading ? 'Processing...' : confirmText }}
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
