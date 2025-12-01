import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as any
    const userId = decoded.userId

    const bidCount = await prisma.bid.count({
      where: { userId },
    })

    return NextResponse.json({ 
      success: true, 
      hasBidHistory: bidCount > 0,
      totalBids: bidCount 
    })
  } catch (error) {
    console.error('Check bid history error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}
