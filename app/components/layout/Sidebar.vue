<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar'
import { useNavigation, type NavItem } from '@/composables/useNavigation'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronLeft, PanelLeftClose, PanelLeft, LogOut } from '@lucide/vue'

const { collapsed, toggle, closeMobile } = useSidebar()
const { navigation } = useNavigation()

const route = useRoute()

const openGroups = ref<string[]>([])

function toggleGroup(title: string) {
  const idx = openGroups.value.indexOf(title)
  if (idx === -1) {
    openGroups.value.push(title)
  } else {
    openGroups.value.splice(idx, 1)
  }
}

function isActive(path?: string) {
  if (!path) return false
  return route.path === path || route.path.startsWith(path + '/')
}

function isGroupActive(item: NavItem): boolean {
  if (item.children) {
    return item.children.some((child) => isActive(child.to))
  }
  return isActive(item.to)
}

function navigateToItem(item: NavItem) {
  if (item.to) {
    closeMobile()
    navigateTo(item.to)
  }
}

const sidebarWidth = computed(() => collapsed.value ? 'w-16' : 'w-64')
const transitionClass = 'transition-all duration-300 ease-in-out'
</script>

<template>
  <aside
    :class="cn(
      'fixed left-0 top-0 z-30 flex h-screen flex-col bg-sidebar border-r border-sidebar-border',
      sidebarWidth,
      transitionClass,
    )"
  >
    <div class="flex h-14 items-center justify-between px-3 border-b border-sidebar-border">
      <div v-if="!collapsed" class="flex items-center gap-2 font-semibold text-sidebar-foreground truncate">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold">
          N
        </div>
        <span class="truncate">Al Nour</span>
      </div>
      <div v-else class="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold">
        N
      </div>
      <UiButton
        variant="ghost"
        size="icon"
        class="size-7 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
        @click="toggle"
      >
        <PanelLeftClose v-if="!collapsed" class="size-4" />
        <PanelLeft v-else class="size-4" />
      </UiButton>
    </div>

    <UiScrollArea class="flex-1 px-2 py-3">
      <nav class="flex flex-col gap-1">
        <template v-for="item in navigation" :key="item.title">
          <div v-if="item.children">
            <button
              :class="cn(
                'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
                'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
                isGroupActive(item) && 'text-sidebar-primary font-semibold bg-sidebar-accent',
                collapsed && 'justify-center px-0',
              )"
              @click="collapsed ? navigateToItem(item) : toggleGroup(item.title)"
            >
              <component :is="item.icon" v-if="item.icon" class="size-4 shrink-0" />
              <span v-if="!collapsed" class="flex-1 text-left truncate">{{ item.title }}</span>
              <ChevronDown
                v-if="!collapsed && item.children"
                :class="cn(
                  'size-3.5 shrink-0 transition-transform text-sidebar-foreground/40',
                  openGroups.includes(item.title) && 'rotate-180',
                )"
              />
            </button>
            <div
              v-if="!collapsed"
              :class="cn(
                'overflow-hidden transition-all duration-200',
                openGroups.includes(item.title) ? 'max-h-96' : 'max-h-0',
              )"
            >
              <div class="ml-6 mt-0.5 flex flex-col gap-0.5 border-l border-sidebar-border pl-2">
                <button
                  v-for="child in item.children"
                  :key="child.title"
                  :class="cn(
                    'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors text-left',
                    'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent',
                    isActive(child.to) && 'text-sidebar-primary font-medium bg-sidebar-accent/60',
                  )"
                  @click="navigateToItem(child)"
                >
                  <span class="truncate">{{ child.title }}</span>
                  <UiBadge
                    v-if="child.badge"
                    variant="secondary"
                    class="ml-auto h-5 rounded-full px-1.5 text-[10px] font-medium"
                  >
                    {{ child.badge }}
                  </UiBadge>
                </button>
              </div>
            </div>
          </div>
          <button
            v-else
            :class="cn(
              'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
              'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
              isActive(item.to) && 'text-sidebar-primary font-semibold bg-sidebar-accent',
              collapsed && 'justify-center px-0',
            )"
            @click="navigateToItem(item)"
          >
            <component :is="item.icon" v-if="item.icon" class="size-4 shrink-0" />
            <span v-if="!collapsed" class="flex-1 text-left truncate">{{ item.title }}</span>
          </button>
        </template>
      </nav>
    </UiScrollArea>

    <div class="border-t border-sidebar-border p-2">
      <button
        :class="cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground hover:bg-sidebar-accent',
          collapsed && 'justify-center px-0',
        )"
      >
        <LogOut class="size-4 shrink-0" />
        <span v-if="!collapsed">Sign Out</span>
      </button>
    </div>
  </aside>
</template>
