<script setup lang="ts">
import { ArrowLeft, DollarSign, BadgeCheck, Ban, Calendar, Wallet, TrendingDown, Receipt } from '@lucide/vue'
import { getAttendanceColumns, getAdvanceColumns, getDailyWageColumns } from '@/modules/workers/components/column'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const route = useRoute()
const workersStore = useWorkersStore()

const worker = computed(() => workersStore.currentWorker)

const attendanceColumns = getAttendanceColumns()
const advanceColumns = getAdvanceColumns()
const dailyWageColumns = getDailyWageColumns()

const presentPct = computed(() => {
  const s = worker.value?.attendanceSummary
  if (!s) return 0
  const total = s.present + s.absent + s.leave
  if (total === 0) return 0
  return ((s.present / total) * 100).toFixed(1)
})

async function load() {
  await workersStore.fetchWorker(route.params.id as string)
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/workers')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader
        v-if="worker"
        :title="worker.name"
        :description="`${worker.role || 'No role'} · ${worker.phone || 'No phone'}`"
      />
    </div>

    <div v-if="workersStore.loading" class="flex justify-center py-12">
      <LoadingState />
    </div>

    <template v-else-if="worker">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Wages Earned</UiCardTitle>
            <DollarSign class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold text-green-600">{{ Number(worker.totalWagesEarned || 0).toFixed(2) }}</p>
            <p class="text-xs text-muted-foreground">Default wage: {{ worker.defaultDailyWage ? Number(worker.defaultDailyWage).toFixed(2) : 'Not set' }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Advances Taken</UiCardTitle>
            <TrendingDown class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold text-destructive">{{ Number(worker.totalAdvancesTaken || 0).toFixed(2) }}</p>
            <p class="text-xs text-muted-foreground">Outstanding loans</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Net Payout</UiCardTitle>
            <Wallet class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold" :class="(worker.netPayout || 0) >= 0 ? 'text-green-600' : 'text-destructive'">
              {{ Number(worker.netPayout || 0).toFixed(2) }}
            </p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Attendance</UiCardTitle>
            <Calendar class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ presentPct }}%</p>
            <p class="text-xs text-muted-foreground">
              {{ worker.attendanceSummary?.present || 0 }} present ·
              {{ worker.attendanceSummary?.absent || 0 }} absent ·
              {{ worker.attendanceSummary?.leave || 0 }} leave
            </p>
          </UiCardContent>
        </UiCard>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Daily Wages</UiCardTitle>
            <UiCardDescription>Wages earned per production batch</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <AppTable
              :data="worker.dailyWages || []"
              :columns="dailyWageColumns"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="false"
            >
              <template #empty>
                <EmptyState title="No wages recorded" description="No daily wages linked yet" />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Advances</UiCardTitle>
            <UiCardDescription>Financial advances taken</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <AppTable
              :data="worker.advances || []"
              :columns="advanceColumns"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="false"
            >
              <template #empty>
                <EmptyState title="No advances" description="No advances recorded" />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Attendance History</UiCardTitle>
          <UiCardDescription>Recent attendance records</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <AppTable
            :data="worker.attendance || []"
            :columns="attendanceColumns"
            :show-search="false"
            :show-column-toggle="false"
            :show-pagination="false"
          >
            <template #empty>
              <EmptyState title="No attendance records" description="Attendance not yet logged" />
            </template>
          </AppTable>
        </UiCardContent>
      </UiCard>
    </template>
  </div>
</template>
