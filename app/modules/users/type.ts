export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED'

export interface RoleBrief {
  id: string
  name: string
  label?: string | null
}

export interface UserWarehouse {
  warehouse: {
    id: string
    name: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string | null
  avatar?: string | null
  roleId: string
  role: RoleBrief
  status: UserStatus
  lastLogin?: string | null
  createdAt: string
  updatedAt: string
  userWarehouses?: UserWarehouse[]
}

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  phone?: string
  roleId: string
  warehouseIds?: string[]
}

export interface UpdateUserPayload {
  name?: string
  email?: string
  phone?: string
  avatar?: string
  roleId?: string
  status?: UserStatus
  password?: string
  warehouseIds?: string[]
}

export interface UsersListResponse {
  users: User[]
  total: number
}

export interface UserResponse {
  user: User
}
