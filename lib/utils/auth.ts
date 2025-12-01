import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { ApiError } from './api-error'

export interface JWTPayload {
  userId: string
  email: string
  role: 'USER' | 'ADMIN'
  kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
}

export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default-secret'
    ) as JWTPayload
    return decoded
  } catch (error) {
    throw new ApiError(401, 'Token tidak valid atau sudah kadaluarsa', 'INVALID_TOKEN')
  }
}

export function getAuthToken(request: NextRequest): string {
  // Try to get token from Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  // Try to get token from cookie
  const cookieToken = request.cookies.get('auth-token')?.value
  if (cookieToken) {
    return cookieToken
  }

  throw new ApiError(401, 'Token autentikasi tidak ditemukan', 'NO_TOKEN')
}

export function requireAuth(request: NextRequest): JWTPayload {
  const token = getAuthToken(request)
  return verifyToken(token)
}

export function requireAdmin(request: NextRequest): JWTPayload {
  const user = requireAuth(request)
  if (user.role !== 'ADMIN') {
    throw new ApiError(403, 'Akses ditolak. Hanya admin yang diizinkan', 'FORBIDDEN')
  }
  return user
}

export function requireKYC(request: NextRequest): JWTPayload {
  const user = requireAuth(request)
  if (user.kycStatus !== 'APPROVED') {
    throw new ApiError(
      403,
      'KYC belum disetujui. Silakan lengkapi verifikasi KYC terlebih dahulu',
      'KYC_NOT_APPROVED'
    )
  }
  return user
}

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import('bcryptjs')
  const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10')
  return bcrypt.hash(password, rounds)
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  const bcrypt = await import('bcryptjs')
  return bcrypt.compare(password, hash)
}
