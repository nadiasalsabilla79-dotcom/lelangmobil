import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message } = await request.json()
    
    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const result = await sendEmail({
      to,
      subject: `[TEST] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">LelangMobil</h1>
            <p style="color: #e0e7ff; margin: 5px 0 0 0;">Email Test</p>
          </div>
          <div style="padding: 20px; background: white; border: 1px solid #e5e7eb;">
            <h2 style="color: #1e3a8a;">Test Email</h2>
            <p style="color: #374151; line-height: 1.6;">${message}</p>
            <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                This is a test email from LelangMobil SMTP system.
                <br>Time: ${new Date().toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `Test Email from LelangMobil\n\n${message}\n\nTime: ${new Date().toLocaleString('id-ID')}`
    })
    
    return NextResponse.json({
      success: result.success,
      message: result.success ? 'Test email sent successfully' : 'Failed to send test email',
      provider: result.provider,
      messageId: result.messageId,
      error: result.error
    })
    
  } catch (error) {
    console.error('Email test API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}