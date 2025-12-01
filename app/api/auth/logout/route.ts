import { NextResponse } from 'next/server'
import { successResponse } from '@/lib/utils/api-response'

export async function POST() {
  const response = successResponse(null, 'Logout berhasil')

  response.cookies.delete('auth-token')
  response.cookies.delete('user-role')

  return response
}
