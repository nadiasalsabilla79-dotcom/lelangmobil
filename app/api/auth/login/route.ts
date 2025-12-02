import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      )
    }
    
    // Find user with wallet
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        wallet: true
      }
    })
    
    // Get KYC data if exists
    const kycData = user ? {
      userId: user.id,
      status: user.kycStatus,
      ktpUrl: user.kycKtpUrl,
      selfieUrl: user.kycSelfieUrl,
      rejectedReason: user.kycRejectedReason,
    } : null
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Check email verification for non-admin users
    if (user.role === 'USER' && !user.emailVerified) {
      return NextResponse.json(
        { error: 'Please verify your email before logging in' },
        { status: 403 }
      )
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )
    
    // Remove password and sensitive data from response
    const { password: _, emailVerifyToken, passwordResetToken, wallet, kycKtpUrl, kycSelfieUrl, kycRejectedReason, ...userWithoutSensitive } = user
    
    return NextResponse.json({
      success: true,
      user: userWithoutSensitive,
      wallet: user.wallet,
      kyc: kycData,
      token,
      message: 'Login successful'
    })
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}