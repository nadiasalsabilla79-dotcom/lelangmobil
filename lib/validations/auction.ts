import { z } from 'zod'

export const bidSchema = z.object({
  auctionId: z.string().min(1, 'ID lelang harus diisi'),
  amount: z
    .number()
    .min(1000000, 'Minimal bid Rp 1.000.000')
    .max(10000000000, 'Maksimal bid Rp 10.000.000.000'),
})

export const createAuctionSchema = z.object({
  carId: z.string().min(1, 'ID mobil harus diisi'),
  startPrice: z
    .number()
    .min(1000000, 'Harga awal minimal Rp 1.000.000')
    .max(10000000000, 'Harga awal maksimal Rp 10.000.000.000'),
  minIncrement: z
    .number()
    .min(100000, 'Increment minimal Rp 100.000')
    .max(10000000, 'Increment maksimal Rp 10.000.000'),
  startTime: z.coerce.date().refine(
    (date) => date > new Date(),
    'Waktu mulai harus di masa depan'
  ),
  endTime: z.coerce.date(),
}).refine(
  (data) => data.endTime > data.startTime,
  {
    message: 'Waktu selesai harus setelah waktu mulai',
    path: ['endTime'],
  }
).refine(
  (data) => {
    const duration = data.endTime.getTime() - data.startTime.getTime()
    const minDuration = 60 * 60 * 1000 // 1 hour
    const maxDuration = 30 * 24 * 60 * 60 * 1000 // 30 days
    return duration >= minDuration && duration <= maxDuration
  },
  {
    message: 'Durasi lelang harus antara 1 jam hingga 30 hari',
    path: ['endTime'],
  }
)

export const updateAuctionSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi').max(200, 'Judul maksimal 200 karakter').optional(),
  startPrice: z
    .number()
    .min(1000000, 'Harga awal minimal Rp 1.000.000')
    .max(10000000000, 'Harga awal maksimal Rp 10.000.000.000')
    .optional(),
  minIncrement: z
    .number()
    .min(100000, 'Increment minimal Rp 100.000')
    .max(10000000, 'Increment maksimal Rp 10.000.000')
    .optional(),
  status: z.enum(['DRAFT', 'UPCOMING', 'LIVE', 'ENDED', 'CANCELLED']).optional(),
})

export const carFilterSchema = z.object({
  brand: z.string().optional(),
  location: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  minYear: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  maxYear: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  transmission: z.enum(['AT', 'MT']).optional(),
  fuelType: z.enum(['BENSIN', 'DIESEL', 'HYBRID', 'ELECTRIC']).optional(),
  grade: z.enum(['A', 'B', 'C']).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
})

export type BidInput = z.infer<typeof bidSchema>
export type CreateAuctionInput = z.infer<typeof createAuctionSchema>
export type UpdateAuctionInput = z.infer<typeof updateAuctionSchema>
export type CarFilterInput = z.infer<typeof carFilterSchema>
