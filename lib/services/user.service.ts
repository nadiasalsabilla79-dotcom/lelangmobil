import { apiClient } from '@/lib/api/client'
import type { User } from '@/lib/types'

export const userService = {
  login: (email: string, password: string) => 
    apiClient.post<{ data: User; token: string }>('/auth/login', { email, password }),
  register: (data: { email: string; password: string; name: string; phone: string }) =>
    apiClient.post<{ data: User }>('/auth/register', data),
  getProfile: () => apiClient.get<{ data: User }>('/users/me'),
}
