import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createDepositPayment } from '@/lib/payment'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { userId, amount, bankName } = await request.json()
    
    if (!userId || !amount || amount < 100000) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }
    
    // Create payment instructions
    const payment = await createDepositPayment({
      userId,
      amount,
      type: 'DEPOSIT',
      bankName
    })
    
    if (!payment.success) {
      return NextResponse.json(
        { error: payment.message },
        { status: 400 }
      )
    }
    
    // Save transaction to database
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type: 'DEPOSIT',
        amount,
        status: 'PENDING',
        bankName: payment.paymentInstructions?.bankAccount.bankName,
        notes: `Transaction ID: ${payment.transactionId}`,
      }
    })
    
    // Get user for email
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    // Send email notification
    if (user?.email) {
      await sendEmail({
        to: user.email,
        subject: 'Instruksi Deposit - LelangMobil',
        html: `
          <h2>Instruksi Deposit</h2>
          <p>Halo ${user.name},</p>
          <p>Berikut instruksi deposit Anda:</p>
          <ul>
            <li>Bank: ${payment.paymentInstructions?.bankAccount.bankName}</li>
            <li>No. Rekening: ${payment.paymentInstructions?.bankAccount.accountNumber}</li>
            <li>Atas Nama: ${payment.paymentInstructions?.bankAccount.accountName}</li>
            <li>Jumlah: Rp ${payment.paymentInstructions?.totalAmount.toLocaleString('id-ID')}</li>
          </ul>
          <p>Jangan lupa upload bukti transfer setelah melakukan pembayaran.</p>
        `
      })
    }
    
    return NextResponse.json({
      success: true,
      transaction,
      paymentInstructions: payment.paymentInstructions
    })
    
  } catch (error) {
    console.error('Deposit API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}