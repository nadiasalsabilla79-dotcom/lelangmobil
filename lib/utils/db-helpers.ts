import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: {
      wallet: true,
    },
  })
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      wallet: true,
    },
  })
}

export async function createUserWithWallet(data: {
  email: string
  password: string
  name: string
  phone?: string
}) {
  return prisma.user.create({
    data: {
      ...data,
      email: data.email.toLowerCase(),
      wallet: {
        create: {
          balance: 0,
          holdBalance: 0,
        },
      },
    },
    include: {
      wallet: true,
    },
  })
}

export async function updateWalletBalance(
  userId: string,
  amount: number,
  type: 'add' | 'subtract' | 'hold' | 'release'
) {
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
  })

  if (!wallet) {
    throw new Error('Wallet tidak ditemukan')
  }

  let updateData: Prisma.WalletUpdateInput = {}

  switch (type) {
    case 'add':
      updateData = {
        balance: { increment: amount },
      }
      break
    case 'subtract':
      if (Number(wallet.balance) < amount) {
        throw new Error('Saldo tidak mencukupi')
      }
      updateData = {
        balance: { decrement: amount },
      }
      break
    case 'hold':
      if (Number(wallet.balance) < amount) {
        throw new Error('Saldo tidak mencukupi')
      }
      updateData = {
        balance: { decrement: amount },
        holdBalance: { increment: amount },
      }
      break
    case 'release':
      if (Number(wallet.holdBalance) < amount) {
        throw new Error('Hold balance tidak mencukupi')
      }
      updateData = {
        balance: { increment: amount },
        holdBalance: { decrement: amount },
      }
      break
  }

  return prisma.wallet.update({
    where: { userId },
    data: updateData,
  })
}

export async function getActiveAuctions(filters?: {
  brand?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  status?: string
  page?: number
  limit?: number
}) {
  const {
    brand,
    location,
    minPrice,
    maxPrice,
    status = 'LIVE',
    page = 1,
    limit = 20,
  } = filters || {}

  const where: Prisma.AuctionWhereInput = {
    status: status as any,
    ...(minPrice || maxPrice
      ? {
          currentPrice: {
            ...(minPrice ? { gte: minPrice } : {}),
            ...(maxPrice ? { lte: maxPrice } : {}),
          },
        }
      : {}),
    ...(brand || location
      ? {
          car: {
            ...(brand ? { brand } : {}),
            ...(location ? { location } : {}),
          },
        }
      : {}),
  }

  const [auctions, total] = await Promise.all([
    prisma.auction.findMany({
      where,
      include: {
        car: true,
        bids: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          include: { user: { select: { name: true, email: true } } },
        },
      },
      orderBy: { startTime: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.auction.count({ where }),
  ])

  return { auctions, total, page, limit }
}

export async function getUserBids(userId: string, page = 1, limit = 20) {
  const [bids, total] = await Promise.all([
    prisma.bid.findMany({
      where: { userId },
      include: {
        auction: {
          include: {
            car: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.bid.count({ where: { userId } }),
  ])

  return { bids, total, page, limit }
}

export async function getTransactionHistory(
  userId: string,
  page = 1,
  limit = 20
) {
  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.transaction.count({ where: { userId } }),
  ])

  return { transactions, total, page, limit }
}
