import { readonly } from 'vue'

export const useSidebar = () => {
  const collapsed = useState('sidebar-collapsed', () => false)
  const isMobileOpen = useState('sidebar-mobile-open', () => false)

  function toggle() {
    collapsed.value = !collapsed.value
  }

  function openMobile() {
    isMobileOpen.value = true
  }

  function closeMobile() {
    isMobileOpen.value = false
  }

  return {
    collapsed: readonly(collapsed),
    isMobileOpen: readonly(isMobileOpen),
    toggle,
    openMobile,
    closeMobile,
  }
}
