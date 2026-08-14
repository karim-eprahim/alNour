import { readonly } from 'vue'

export const THEME_NAMES = ['emerald', 'blue', 'violet', 'orange'] as const
export type ThemeName = (typeof THEME_NAMES)[number]

const isThemeName = (value: unknown): value is ThemeName =>
  typeof value === 'string' && (THEME_NAMES as readonly string[]).includes(value)

export const useTheme = () => {
  const themeCookie = useCookie<ThemeName>('alnour-theme', {
    default: () => 'emerald',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
  })

  const theme = useState<ThemeName>('theme', () => {
    const value = themeCookie.value
    return isThemeName(value) ? value : 'emerald'
  })

  useHead({
    htmlAttrs: { 'data-theme': theme },
  })

  function setTheme(name: ThemeName) {
    theme.value = name
    themeCookie.value = name
  }

  return {
    theme: readonly(theme),
    setTheme,
    themes: THEME_NAMES,
  }
}