import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail({
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
    const info = await transporter.sendMail({
      from: `"LelangMobil" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    })
    
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error: error.message }
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}&email=${email}`
  
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 40px; text-align: center;">
        <h1 style="color: white; margin: 0;">LelangMobil</h1>
        <p style="color: #e0e7ff; margin: 10px 0 0 0;">Platform Lelang Mobil Terpercaya</p>
      </div>
      
      <div style="padding: 40px; background: white;">
        <h2 style="color: #1e3a8a; margin-bottom: 20px;">Verifikasi Email Anda</h2>
        <p style="color: #374151; line-height: 1.6; margin-bottom: 30px;">
          Terima kasih telah mendaftar di LelangMobil! Klik tombol di bawah untuk memverifikasi email Anda dan mengaktifkan akun.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyUrl}" style="background: #1e3a8a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
            Verifikasi Email
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Jika tombol tidak berfungsi, copy dan paste link berikut ke browser Anda:<br>
          <a href="${verifyUrl}" style="color: #1e3a8a;">${verifyUrl}</a>
        </p>
        
        <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            Email ini dikirim otomatis, mohon tidak membalas email ini.
          </p>
        </div>
      </div>
    </div>
  `
  
  return await sendEmail({
    to: email,
    subject: 'Verifikasi Email - LelangMobil',
    html,
    text: `Verifikasi email Anda dengan mengklik link: ${verifyUrl}`,
  })
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}&email=${email}`
  
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 40px; text-align: center;">
        <h1 style="color: white; margin: 0;">LelangMobil</h1>
        <p style="color: #e0e7ff; margin: 10px 0 0 0;">Platform Lelang Mobil Terpercaya</p>
      </div>
      
      <div style="padding: 40px; background: white;">
        <h2 style="color: #1e3a8a; margin-bottom: 20px;">Reset Password</h2>
        <p style="color: #374151; line-height: 1.6; margin-bottom: 30px;">
          Kami menerima permintaan untuk reset password akun Anda. Klik tombol di bawah untuk membuat password baru.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
            Reset Password
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Link ini akan kedaluwarsa dalam 1 jam. Jika Anda tidak meminta reset password, abaikan email ini.
        </p>
      </div>
    </div>
  `
  
  return await sendEmail({
    to: email,
    subject: 'Reset Password - LelangMobil',
    html,
    text: `Reset password Anda dengan mengklik link: ${resetUrl}`,
  })
}