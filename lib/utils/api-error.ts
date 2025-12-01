import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export function handleApiError(error: unknown) {
  console.error('API Error:', error)

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Data sudah ada dalam sistem', code: 'DUPLICATE_ENTRY' },
        { status: 409 }
      )
    }
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Data tidak ditemukan', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }
  }

  // Custom API errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    )
  }

  // Validation errors
  if (error instanceof Error && error.name === 'ZodError') {
    return NextResponse.json(
      { error: 'Data tidak valid', code: 'VALIDATION_ERROR' },
      { status: 400 }
    )
  }

  // Default error
  return NextResponse.json(
    { 
      error: process.env.NODE_ENV === 'production' 
        ? 'Terjadi kesalahan pada server' 
        : error instanceof Error ? error.message : 'Unknown error',
      code: 'INTERNAL_ERROR' 
    },
    { status: 500 }
  )
}

export function validateRequest(data: unknown, requiredFields: string[]) {
  const missingFields = requiredFields.filter(
    field => !data || !(field in (data as Record<string, unknown>))
  )

  if (missingFields.length > 0) {
    throw new ApiError(
      400,
      `Field berikut harus diisi: ${missingFields.join(', ')}`,
      'MISSING_FIELDS'
    )
  }
}
