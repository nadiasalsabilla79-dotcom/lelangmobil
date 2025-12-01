import { z } from 'zod'

export const depositSchema = z.object({
  amount: z
    .number()
    .min(50000, 'Minimal deposit Rp 50.000')
    .max(100000000, 'Maksimal deposit Rp 100.000.000'),
  bankName: z.enum(['BCA', 'MANDIRI', 'BRI', 'BNI'], {
    errorMap: () => ({ message: 'Bank tidak valid' }),
  }),
  proofImageUrl: z
    .string()
    .url('URL bukti transfer tidak valid')
    .optional(),
})

export const withdrawSchema = z.object({
  amount: z
    .number()
    .min(50000, 'Minimal penarikan Rp 50.000')
    .max(50000000, 'Maksimal penarikan Rp 50.000.000'),
  bankName: z.enum(['BCA', 'MANDIRI', 'BRI', 'BNI'], {
    errorMap: () => ({ message: 'Bank tidak valid' }),
  }),
  accountNumber: z
    .string()
    .min(1, 'Nomor rekening harus diisi')
    .regex(/^[0-9]{10,16}$/, 'Format nomor rekening tidak valid'),
  accountName: z
    .string()
    .min(1, 'Nama pemilik rekening harus diisi')
    .min(3, 'Nama pemilik rekening minimal 3 karakter')
    .max(100, 'Nama pemilik rekening maksimal 100 karakter')
    .trim(),
})

export const approveTransactionSchema = z.object({
  transactionId: z.string().min(1, 'ID transaksi harus diisi'),
  status: z.enum(['APPROVED', 'REJECTED'], {
    errorMap: () => ({ message: 'Status tidak valid' }),
  }),
  adminNotes: z.string().max(500, 'Catatan maksimal 500 karakter').optional(),
})

export type DepositInput = z.infer<typeof depositSchema>
export type WithdrawInput = z.infer<typeof withdrawSchema>
export type ApproveTransactionInput = z.infer<typeof approveTransactionSchema>
