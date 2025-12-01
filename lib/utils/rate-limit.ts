import { NextRequest } from 'next/server'
import { ApiError } from './api-error'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export interface RateLimitOptions {
  interval: number // in milliseconds
  maxRequests: number
}

export function rateLimit(options: RateLimitOptions) {
  return (request: NextRequest) => {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const key = `${ip}-${request.nextUrl.pathname}`
    const now = Date.now()

    // Clean up old entries
    if (store[key] && store[key].resetTime < now) {
      delete store[key]
    }

    // Initialize or get current count
    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime: now + options.interval,
      }
      return
    }

    // Check rate limit
    if (store[key].count >= options.maxRequests) {
      const resetIn = Math.ceil((store[key].resetTime - now) / 1000)
      throw new ApiError(
        429,
        `Terlalu banyak permintaan. Coba lagi dalam ${resetIn} detik`,
        'RATE_LIMIT_EXCEEDED'
      )
    }

    // Increment count
    store[key].count++
  }
}

// Predefined rate limiters
export const loginRateLimit = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
})

export const apiRateLimit = rateLimit({
  interval: 60 * 1000, // 1 minute
  maxRequests: 60,
})

export const uploadRateLimit = rateLimit({
  interval: 60 * 1000, // 1 minute
  maxRequests: 10,
})
