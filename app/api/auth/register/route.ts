import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendVerificationEmail } from '@/lib/email'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone } = await request.json()
    
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Generate verification token
    const verificationToken = randomBytes(32).toString('hex')
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        emailVerifyToken: verificationToken,
        emailVerified: false,
      }
    })
    
    // Create wallet
    await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 0,
        holdBalance: 0,
      }
    })
    
    // Send verification email
    await sendVerificationEmail(email, verificationToken)
    
    return NextResponse.json({
      success: true,
      message: 'Registration successful. Please check your email for verification.',
      userId: user.id
    })
    
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}