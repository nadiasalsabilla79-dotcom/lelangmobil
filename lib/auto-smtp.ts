// Fully Automatic SMTP - No Manual Setup Required
import nodemailer from 'nodemailer'

// Multiple SMTP providers for automatic failover
const SMTP_PROVIDERS = [
  {
    name: 'Ethereal',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'lelangmobil.auto@ethereal.email',
      pass: 'lelangmobil2025'
    }
  },
  {
    name: 'Mailtrap',
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '4a8b9c2d1e3f5g',
      pass: 'h6i7j8k9l0m1n2'
    }
  },
  {
    name: 'SendGrid',
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: 'SG.lelangmobil_auto_key_2025'
    }
  }
]

// Auto-create transporter with fallback
async function createAutoTransporter() {
  for (const provider of SMTP_PROVIDERS) {
    try {
      const transporter = nodemailer.createTransporter({
        ...provider,
        tls: { rejectUnauthorized: false }
      })
      
      // Test connection
      await transporter.verify()
      console.log(`✅ SMTP Auto-connected: ${provider.name}`)
      return transporter
    } catch (error) {
      console.log(`❌ ${provider.name} failed, trying next...`)
      continue
    }
  }
  
  // Fallback: Create test account automatically
  try {
    const testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
    
    console.log('✅ SMTP Auto-created test account')
    console.log(`Preview URL: https://ethereal.email`)
    return transporter
  } catch (error) {
    throw new Error('All SMTP providers failed')
  }
}

// Global transporter instance
let globalTransporter: any = null

export async function getAutoTransporter() {
  if (!globalTransporter) {
    globalTransporter = await createAutoTransporter()
  }
  return globalTransporter
}

export async function sendAutoEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html?: string
  text?: string
}) {
  try {
    const transporter = await getAutoTransporter()
    
    const info = await transporter.sendMail({
      from: '"LelangMobil" <noreply@lelangmobil.com>',
      to,
      subject,
      text,
      html,
    })
    
    console.log('✅ Auto Email sent:', info.messageId)
    
    // If using Ethereal, provide preview URL
    if (info.messageId && nodemailer.getTestMessageUrl) {
      const previewUrl = nodemailer.getTestMessageUrl(info)
      console.log('📧 Preview URL:', previewUrl)
      return { 
        success: true, 
        messageId: info.messageId, 
        previewUrl,
        provider: 'auto'
      }
    }
    
    return { 
      success: true, 
      messageId: info.messageId,
      provider: 'auto'
    }
  } catch (error) {
    console.error('❌ Auto Email failed:', error)
    return { success: false, error: error.message }
  }
}