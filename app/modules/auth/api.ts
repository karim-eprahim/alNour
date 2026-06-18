import type { LoginPayload, LoginResponse, MeResponse } from './type'

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  return $fetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: payload,
  })
}

export async function logoutApi(): Promise<void> {
  await $fetch('/api/auth/logout', { method: 'POST' })
}

export async function fetchMeApi(): Promise<MeResponse> {
  return $fetch<MeResponse>('/api/auth/me')
}
