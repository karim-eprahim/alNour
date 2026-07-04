export {}

declare module 'vue-router' {
  interface RouteMeta {
    permission?: {
      module: string
      action: string
    }
  }
}
