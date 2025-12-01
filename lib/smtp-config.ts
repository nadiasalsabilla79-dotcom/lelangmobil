// SMTP Configuration for lelangmobil.com domain

export const SMTP_CONFIG = {
  // Primary Domain SMTP
  primary: {
    host: 'mail.lelangmobil.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'noreply@lelangmobil.com',
      pass: 'LelangMobil2025!Secure'
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  
  // Backup Gmail SMTP
  backup: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'support@lelangmobil.com',
      pass: 'your-gmail-app-password' // Generate from Google Account settings
    }
  }
}

export const EMAIL_TEMPLATES = {
  from: {
    noreply: 'LelangMobil <noreply@lelangmobil.com>',
    support: 'LelangMobil Support <support@lelangmobil.com>',
    admin: 'LelangMobil Admin <admin@lelangmobil.com>',
  },
  
  subjects: {
    verification: 'Verifikasi Email - LelangMobil',
    passwordReset: 'Reset Password - LelangMobil',
    kycApproved: 'KYC Disetujui - LelangMobil',
    depositConfirmed: 'Deposit Dikonfirmasi - LelangMobil',
    auctionWon: 'Selamat! Anda Memenangkan Lelang - LelangMobil',
    welcome: 'Selamat Datang di LelangMobil',
  }
}

// DNS Records needed for lelangmobil.com email:
/*
MX Records:
- Priority 10: mail.lelangmobil.com

A Records:
- mail.lelangmobil.com -> Your server IP

TXT Records (SPF):
- v=spf1 include:_spf.google.com include:mail.lelangmobil.com ~all

TXT Records (DKIM):
- default._domainkey.lelangmobil.com -> Generated DKIM key

TXT Records (DMARC):
- _dmarc.lelangmobil.com -> v=DMARC1; p=quarantine; rua=mailto:dmarc@lelangmobil.com
*/