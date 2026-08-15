import { readonly } from 'vue'

export const THEME_NAMES = ['emerald', 'blue', 'violet', 'orange'] as const
export type ThemeName = (typeof THEME_NAMES)[number]

const isThemeName = (value: unknown): value is ThemeName =>
  typeof value === 'string' && (THEME_NAMES as readonly string[]).includes(value)

export const RADIUS_OPTIONS = {
  compact: '0.5rem',
  default: '0.75rem',
  rounded: '1rem',
} as const
export type RadiusName = keyof typeof RADIUS_OPTIONS

const isRadiusName = (value: unknown): value is RadiusName =>
  typeof value === 'string' && value in RADIUS_OPTIONS

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

  const radiusCookie = useCookie<RadiusName>('alnour-radius', {
    default: () => 'default',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
  })

  const radius = useState<RadiusName>('radius', () => {
    const value = radiusCookie.value
    return isRadiusName(value) ? value : 'default'
  })

  useHead({
    htmlAttrs: { 'data-theme': theme },
  })

  useHead({
    htmlAttrs: {
      style: computed(() => `--radius: ${RADIUS_OPTIONS[radius.value]}`),
    },
  })

  function setTheme(name: ThemeName) {
    theme.value = name
    themeCookie.value = name
  }

  function setRadius(name: RadiusName) {
    radius.value = name
    radiusCookie.value = name
  }

  return {
    theme: readonly(theme),
    setTheme,
    themes: THEME_NAMES,
    radius: readonly(radius),
    setRadius,
    radiusOptions: RADIUS_OPTIONS,
  }
}