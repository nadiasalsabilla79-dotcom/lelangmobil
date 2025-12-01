import { NextRequest, NextResponse } from 'next/server'
import { handleFileUpload } from '@/lib/upload'

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const type = url.searchParams.get('type') || 'general'
    
    let folder = 'uploads'
    switch (type) {
      case 'kyc':
        folder = 'kyc'
        break
      case 'proof':
        folder = 'proofs'
        break
      case 'cars':
        folder = 'cars'
        break
      default:
        folder = 'uploads'
    }
    
    const filePath = await handleFileUpload(request, 'file')
    
    if (!filePath) {
      return NextResponse.json(
        { error: 'File upload failed' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      success: true,
      filePath,
      message: 'File uploaded successfully'
    })
    
  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}