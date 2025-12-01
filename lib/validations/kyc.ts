import { z } from 'zod'

export const kycSubmissionSchema = z.object({
  ktpImageUrl: z
    .string()
    .url('URL foto KTP tidak valid')
    .min(1, 'Foto KTP harus diupload'),
  selfieImageUrl: z
    .string()
    .url('URL foto selfie tidak valid')
    .min(1, 'Foto selfie harus diupload'),
})

export const kycApprovalSchema = z.object({
  userId: z.string().min(1, 'ID user harus diisi'),
  status: z.enum(['APPROVED', 'REJECTED'], {
    errorMap: () => ({ message: 'Status tidak valid' }),
  }),
  rejectionReason: z
    .string()
    .max(500, 'Alasan penolakan maksimal 500 karakter')
    .optional(),
}).refine(
  (data) => {
    if (data.status === 'REJECTED') {
      return !!data.rejectionReason && data.rejectionReason.length > 0
    }
    return true
  },
  {
    message: 'Alasan penolakan harus diisi jika status ditolak',
    path: ['rejectionReason'],
  }
)

export const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: 'File harus diupload' }),
  type: z.enum(['ktp', 'selfie', 'proof'], {
    errorMap: () => ({ message: 'Tipe file tidak valid' }),
  }),
}).refine(
  (data) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    return allowedTypes.includes(data.file.type)
  },
  {
    message: 'Format file harus JPG, PNG, atau WebP',
    path: ['file'],
  }
).refine(
  (data) => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    return data.file.size <= maxSize
  },
  {
    message: 'Ukuran file maksimal 5MB',
    path: ['file'],
  }
)

export type KYCSubmissionInput = z.infer<typeof kycSubmissionSchema>
export type KYCApprovalInput = z.infer<typeof kycApprovalSchema>
export type FileUploadInput = z.infer<typeof fileUploadSchema>
