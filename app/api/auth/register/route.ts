import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleApiError, validateRequest } from '@/lib/utils/api-error'
import { successResponse, errorResponse } from '@/lib/utils/api-response'
import { hashPassword } from '@/lib/utils/auth'
import { registerSchema } from '@/lib/validations/auth'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate with Zod schema
    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      const errors = validation.error.errors.map(e => e.message).join(', ')
      return errorResponse(errors, 'VALIDATION_ERROR', 400)
    }

    const { email, password, name, phone } = validation.data

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return errorResponse('Email sudah terdaftar', 'EMAIL_EXISTS', 409)
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user with wallet
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role: 'USER',
        kycStatus: 'PENDING',
        wallet: {
          create: {
            balance: 0,
            holdBalance: 0,
          },
        },
      },
      include: { wallet: true },
    })

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        kycStatus: user.kycStatus 
      },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '7d' }
    )

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Create response with cookie
    const response = successResponse(
      {
        token,
        user: userWithoutPassword,
      },
      'Registrasi berhasil! Silakan lengkapi verifikasi KYC untuk mendapatkan bonus Rp 1.000.000',
      201
    )

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    response.cookies.set('user-role', user.role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    return handleApiError(error)
  }
}
