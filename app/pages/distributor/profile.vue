<script setup lang="ts">
import { User, Building2, Phone, Mail, MapPin, BadgeCheck } from '@lucide/vue'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const auth = useAuthStore()
const store = useDistributorStore()
const { user } = storeToRefs(auth)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">Profile</h1>
        <p class="text-sm text-muted-foreground">Your distributor account details</p>
      </div>
    </div>

    <UiCard>
      <UiCardHeader>
        <div class="flex items-center gap-4">
          <div class="flex size-14 items-center justify-center rounded-full bg-primary/10">
            <User class="size-7 text-primary" />
          </div>
          <div>
            <UiCardTitle>{{ user?.fullName || 'Distributor' }}</UiCardTitle>
            <UiCardDescription>
              <span class="inline-flex items-center gap-1">
                <BadgeCheck class="size-3" />
                DISTRIBUTOR
              </span>
            </UiCardDescription>
          </div>
        </div>
      </UiCardHeader>
      <UiCardContent class="space-y-3">
        <div class="flex items-center gap-2 text-sm">
          <Building2 class="size-4 text-muted-foreground shrink-0" />
          <span v-if="store.custody?.warehouseName" class="truncate">{{ store.custody.warehouseName }}</span>
          <span v-else class="text-muted-foreground italic">No warehouse assigned</span>
        </div>
        <div v-if="user?.email" class="flex items-center gap-2 text-sm">
          <Mail class="size-4 text-muted-foreground shrink-0" />
          <span class="truncate">{{ user.email }}</span>
        </div>
        <div v-if="user?.phone" class="flex items-center gap-2 text-sm">
          <Phone class="size-4 text-muted-foreground shrink-0" />
          <span>{{ user.phone }}</span>
        </div>
        <div v-if="user?.address" class="flex items-center gap-2 text-sm">
          <MapPin class="size-4 text-muted-foreground shrink-0" />
          <span class="truncate">{{ user.address }}</span>
        </div>
      </UiCardContent>
    </UiCard>

    <UiCard>
      <UiCardHeader>
        <UiCardTitle class="text-base">Stock Overview</UiCardTitle>
        <UiCardDescription>Items currently in your custody</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div v-if="!store.custody" class="text-sm text-muted-foreground italic">
          No custody data available
        </div>
        <div v-else class="space-y-2">
          <div v-for="item in store.custody.items" :key="item.id" class="flex items-center justify-between border-b pb-2 text-sm last:border-0 last:pb-0">
            <span class="truncate">{{ item.productName }}</span>
            <span class="font-semibold shrink-0 ml-2">{{ item.quantity.toFixed(1) }}</span>
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  </div>
</template>
