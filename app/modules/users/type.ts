export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED'

export interface RoleBrief {
  id: string
  name: string
  label?: string | null
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
}

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  phone?: string
  roleId: string
}

export interface UpdateUserPayload {
  name?: string
  email?: string
  phone?: string
  avatar?: string
  roleId?: string
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
