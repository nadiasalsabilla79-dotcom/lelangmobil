// Admin Configuration for LelangMobil

export const ADMIN_CONFIG = {
  // Admin Personal Info
  name: 'Jamila Ramadhani',
  phone: '0882022783493',
  email: 'jamila.lelangmobil@gmail.com',
  
  // Bank Account for Deposits
  bankAccount: {
    bankName: 'BCA',
    accountNumber: '8460520283',
    accountName: 'JAMILA RAMADHANI',
    logo: '/banks/bca-logo.png'
  },
  
  // Business Info
  businessName: 'LelangMobil',
  businessAddress: 'Jl. Sudirman No. 123, Jakarta Pusat',
  businessPhone: '+62-21-12345678',
  
  // System Settings
  settings: {
    welcomeBonus: 1000000, // Rp 1,000,000
    minimumDeposit: 100000, // Rp 100,000
    minimumWithdraw: 50000, // Rp 50,000
    withdrawFee: 5000, // Rp 5,000
    bidHoldPercentage: 10, // 10%
    autoApprovalLimit: 5000000, // Rp 5,000,000
  },
  
  // Notification Settings
  notifications: {
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
    adminNotifyDeposit: true,
    adminNotifyWithdraw: true,
    adminNotifyKYC: true,
  }
}

export const CONTACT_INFO = {
  customerService: {
    phone: '0882022783493',
    email: 'support@lelangmobil.com',
    whatsapp: 'https://wa.me/6282022783493',
    hours: 'Senin - Jumat: 09:00 - 17:00 WIB'
  },
  
  technical: {
    email: 'admin@lelangmobil.com',
    phone: '0882022783493'
  },
  
  business: {
    email: 'info@lelangmobil.com',
    phone: '+62-21-12345678'
  }
}