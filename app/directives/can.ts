import type { Directive } from 'vue'
import { usePermissions } from '@/composables/usePermissions'

export const vCan: Directive<HTMLElement, { module: string; action: string }> = {
  mounted(el, binding) {
    const { can } = usePermissions()
    const { module, action } = binding.value
    if (!can(module, action)) {
      el.parentNode?.removeChild(el)
    }
  },
  getSSRProps() {
    return {}
  },
}
