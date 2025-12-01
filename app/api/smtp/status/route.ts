import { NextResponse } from 'next/server'
import { getAutoTransporter } from '@/lib/auto-smtp'

export async function GET() {
  try {
    const transporter = await getAutoTransporter()
    
    // Test SMTP connection
    const isConnected = await transporter.verify()
    
    return NextResponse.json({
      status: 'active',
      connected: isConnected,
      message: 'SMTP is fully configured and ready',
      timestamp: new Date().toISOString(),
      provider: 'auto-configured'
    })
    
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      connected: false,
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}