export interface Worker {
  id: string
  name: string
  phone?: string | null
  role?: string | null
  defaultDailyWage?: number | null
  isActive: boolean
  createdAt: string
  totalWagesEarned?: number
  totalAdvancesTaken?: number
  netPayout?: number
  _count?: {
    attendance: number
    advances: number
    dailyWages: number
  }
  attendance?: Attendance[]
  advances?: WorkerAdvance[]
  dailyWages?: WorkerDailyWage[]
  attendanceSummary?: {
    present: number
    absent: number
    leave: number
  }
}

export interface Attendance {
  id: string
  workerId: string
  date: string
  status: 'PRESENT' | 'ABSENT' | 'LEAVE'
  notes?: string | null
  createdAt: string
  worker?: { id: string; name: string; role?: string | null }
}

export interface WorkerAdvance {
  id: string
  workerId: string
  amount: number
  date: string
  notes?: string | null
  createdAt: string
  worker?: { id: string; name: string; role?: string | null }
}

export interface WorkerDailyWage {
  id: string
  workerId: string
  productionBatchId: string
  dailyWage: number
  notes?: string | null
  date: string
  worker?: { id: string; name: string; role?: string | null }
  batch?: { id: string; batchNumber: string }
}

export interface CreateWorkerPayload {
  name: string
  phone?: string
  role?: string
  defaultDailyWage?: number
  isActive?: boolean
}

export interface UpdateWorkerPayload {
  name?: string
  phone?: string
  role?: string
  defaultDailyWage?: number
  isActive?: boolean
}

export interface LogAttendancePayload {
  date: string
  records: { workerId: string; status: 'PRESENT' | 'ABSENT' | 'LEAVE'; notes?: string }[]
}

export interface CreateAdvancePayload {
  workerId: string
  amount: number
  date?: string
  notes?: string
}

export interface LogDailyWagesPayload {
  productionBatchId: string
  date?: string
  records: { workerId: string; dailyWage: number; notes?: string }[]
}

export interface WorkerReport {
  worker: {
    id: string
    name: string
    phone?: string | null
    role?: string | null
    defaultDailyWage: number
    isActive: boolean
  }
  attendanceSummary: {
    present: number
    absent: number
    leave: number
    total: number
  }
  attendanceHistory: Attendance[]
  totalWagesEarned: number
  totalAdvancesTaken: number
  netPayout: number
  dailyWages: WorkerDailyWage[]
  advances: WorkerAdvance[]
}
