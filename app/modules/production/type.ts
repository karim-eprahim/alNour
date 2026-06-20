export interface ProductionBatch {
  id: string
  batchNumber: string
  warehouseId: string
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
  rawMaterialsCost: number
  laborCost: number
  otherCosts: number
  totalBatchCost: number
  notes?: string | null
  createdAt: string
  updatedAt: string
  warehouse?: { id: string; name: string }
  consumptions?: ProductionConsumption[]
  outputs?: ProductionOutput[]
  productivities?: WorkerProductivity[]
  _count?: {
    consumptions: number
    outputs: number
  }
}

export interface ProductionConsumption {
  id: string
  productionBatchId: string
  productId: string
  quantity: number
  unitCost: number
  totalCost: number
  product?: { id: string; name: string; sku: string; type?: string }
}

export interface ProductionOutput {
  id: string
  productionBatchId: string
  productId: string
  quantity: number
  waste: number
  costPerUnit: number
  product?: { id: string; name: string; sku: string; type?: string }
}

export interface CreateProductionPayload {
  warehouseId: string
  laborCost?: number
  otherCosts?: number
  notes?: string
  consumptions: { productId: string; quantity: number }[]
  outputs: { productId: string; quantity: number; waste?: number }[]
}

export interface UpdateProductionPayload {
  status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
  laborCost?: number
  otherCosts?: number
  notes?: string
}

export interface ProductionReportSummary {
  totalBatches: number
  totalOutput: number
  totalConsumption: number
  totalWaste: number
  wastePercentage: number
  totalCost: number
  averageCostPerUnit: number
}

export interface WorkerProductivity {
  id: string
  workerId: string
  productionBatchId: string
  bagsPacked: number
  rewardPerBag: number
  totalReward: number
  date: string
  worker?: { id: string; name: string }
}
