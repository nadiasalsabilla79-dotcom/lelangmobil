// Manual Payment System - Looks Automatic but Uses Manual Bank Transfer

export interface BankAccount {
  bankName: string
  accountNumber: string
  accountName: string
  logo?: string
}

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    bankName: 'BCA',
    accountNumber: '8460520283',
    accountName: 'JAMILA RAMADHANI',
    logo: '/banks/bca-logo.png'
  }
]

export interface PaymentRequest {
  userId: string
  amount: number
  type: 'DEPOSIT' | 'WITHDRAW'
  bankName?: string
  accountNumber?: string
  accountName?: string
}

export interface PaymentResponse {
  success: boolean
  transactionId: string
  paymentInstructions?: {
    bankAccount: BankAccount
    amount: number
    uniqueCode: number
    totalAmount: number
    expiredAt: Date
  }
  message: string
}

export async function createDepositPayment(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    // Generate unique code (last 3 digits of transaction ID + random)
    const uniqueCode = Math.floor(Math.random() * 999) + 1
    const totalAmount = request.amount + uniqueCode
    const expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    
    // Select bank account (rotate or user preference)
    const bankAccount = BANK_ACCOUNTS.find(bank => 
      bank.bankName === request.bankName
    ) || BANK_ACCOUNTS[0]
    
    // Generate transaction ID
    const transactionId = `DEP${Date.now()}${Math.floor(Math.random() * 1000)}`
    
    return {
      success: true,
      transactionId,
      paymentInstructions: {
        bankAccount,
        amount: request.amount,
        uniqueCode,
        totalAmount,
        expiredAt
      },
      message: 'Instruksi pembayaran berhasil dibuat'
    }
  } catch (error) {
    return {
      success: false,
      transactionId: '',
      message: 'Gagal membuat instruksi pembayaran'
    }
  }
}

export async function createWithdrawPayment(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    const transactionId = `WD${Date.now()}${Math.floor(Math.random() * 1000)}`
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      success: true,
      transactionId,
      message: 'Permintaan withdraw berhasil diproses. Dana akan ditransfer dalam 1x24 jam.'
    }
  } catch (error) {
    return {
      success: false,
      transactionId: '',
      message: 'Gagal memproses withdraw'
    }
  }
}

export function generatePaymentInstructions(
  bankAccount: BankAccount,
  amount: number,
  uniqueCode: number,
  transactionId: string
) {
  const totalAmount = amount + uniqueCode
  
  return {
    title: 'Instruksi Pembayaran',
    steps: [
      {
        step: 1,
        title: 'Transfer ke Rekening',
        description: `Transfer tepat sebesar Rp ${totalAmount.toLocaleString('id-ID')} ke rekening berikut:`
      },
      {
        step: 2,
        title: 'Detail Rekening',
        description: `Bank: ${bankAccount.bankName}\nNo. Rekening: ${bankAccount.accountNumber}\nAtas Nama: ${bankAccount.accountName}`
      },
      {
        step: 3,
        title: 'Jumlah Transfer',
        description: `Nominal: Rp ${amount.toLocaleString('id-ID')}\nKode Unik: Rp ${uniqueCode}\nTotal: Rp ${totalAmount.toLocaleString('id-ID')}`
      },
      {
        step: 4,
        title: 'Upload Bukti',
        description: 'Upload foto bukti transfer melalui dashboard Anda'
      },
      {
        step: 5,
        title: 'Verifikasi',
        description: 'Tim kami akan memverifikasi pembayaran dalam 1-3 jam kerja'
      }
    ],
    notes: [
      'Transfer harus dilakukan dengan nominal yang TEPAT termasuk kode unik',
      'Kode unik membantu kami mengidentifikasi pembayaran Anda secara otomatis',
      'Simpan bukti transfer sampai saldo masuk ke akun Anda',
      'Hubungi customer service jika ada kendala'
    ]
  }
}

export async function verifyPayment(transactionId: string, proofImage: string): Promise<boolean> {
  // In real implementation, this would:
  // 1. Check bank statement via API
  // 2. Match amount with unique code
  // 3. Auto-approve if match found
  // 4. Send to manual review if no match
  
  // For now, simulate automatic verification
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // 80% chance of auto-approval (simulate bank API success)
  return Math.random() > 0.2
}