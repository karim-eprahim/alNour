import { readonly } from 'vue'

export const useColorMode = () => {
  const colorMode = useState('color-mode', () => {
    if (import.meta.client) {
      return localStorage.getItem('color-mode') || 'light'
    }
    return 'light'
  })

  watchEffect(() => {
    if (import.meta.client) {
      const root = document.documentElement
      if (colorMode.value === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      localStorage.setItem('color-mode', colorMode.value)
    }
  })

  function toggle() {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
  }

  function setMode(mode: 'light' | 'dark') {
    colorMode.value = mode
  }

  return {
    colorMode: readonly(colorMode),
    isDark: computed(() => colorMode.value === 'dark'),
    toggle,
    setMode,
  }
}
