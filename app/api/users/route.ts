import { NextResponse } from 'next/server'
import { dummyUsers } from '@/lib/dummy-data'

export async function GET() {
  return NextResponse.json({ success: true, data: dummyUsers })
}
