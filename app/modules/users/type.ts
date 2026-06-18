export type UserRole = 'ADMIN' | 'MANAGER' | 'STOREKEEPER' | 'ACCOUNTANT' | 'DISTRIBUTOR' | 'WORKER'
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED'

export interface User {
  id: string
  name: string
  email: string
  phone?: string | null
  avatar?: string | null
  role: UserRole
  status: UserStatus
  lastLogin?: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  phone?: string
  role: UserRole
}

export interface UpdateUserPayload {
  name?: string
  email?: string
  phone?: string
  avatar?: string
  role?: UserRole
  status?: UserStatus
  password?: string
}

export interface UsersListResponse {
  users: User[]
  total: number
}

export interface UserResponse {
  user: User
}
