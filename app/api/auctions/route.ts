import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const brand = searchParams.get('brand')
    const location = searchParams.get('location')

    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (brand || location) {
      where.car = {}
      if (brand) where.car.brand = brand
      if (location) where.car.location = location
    }

    const auctions = await prisma.auction.findMany({
      where,
      include: {
        car: true,
        bids: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: { user: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: auctions })
  } catch (error) {
    console.error('Get auctions error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data lelang' },
      { status: 500 }
    )
  }
}
