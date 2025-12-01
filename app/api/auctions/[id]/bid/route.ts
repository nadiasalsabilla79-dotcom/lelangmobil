import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as any
    const userId = decoded.userId

    const body = await request.json()
    const { amount } = body

    const auction = await prisma.auction.findUnique({
      where: { id: params.id },
      include: { bids: { orderBy: { createdAt: 'desc' }, take: 1 } },
    })

    if (!auction) {
      return NextResponse.json({ error: 'Lelang tidak ditemukan' }, { status: 404 })
    }

    if (auction.status !== 'LIVE') {
      return NextResponse.json({ error: 'Lelang tidak aktif' }, { status: 400 })
    }

    const minBidAmount = Number(auction.currentPrice) + Number(auction.minIncrement)
    
    if (amount < minBidAmount) {
      return NextResponse.json(
        { error: `Bid minimal Rp ${minBidAmount.toLocaleString('id-ID')}` },
        { status: 400 }
      )
    }

    const wallet = await prisma.wallet.findUnique({ where: { userId } })
    
    if (!wallet || Number(wallet.balance) < amount) {
      return NextResponse.json({ error: 'Saldo tidak cukup' }, { status: 400 })
    }

    const bid = await prisma.$transaction(async (tx) => {
      const newBid = await tx.bid.create({
        data: {
          auctionId: params.id,
          userId,
          amount,
          isWinning: true,
        },
      })

      await tx.bid.updateMany({
        where: {
          auctionId: params.id,
          id: { not: newBid.id },
        },
        data: { isWinning: false },
      })

      await tx.auction.update({
        where: { id: params.id },
        data: {
          currentPrice: amount,
          totalBids: { increment: 1 },
        },
      })

      return newBid
    })

    return NextResponse.json({ success: true, data: bid })
  } catch (error) {
    console.error('Bid error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memasang bid' },
      { status: 500 }
    )
  }
}
