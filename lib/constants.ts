export const APP_NAME = 'LelangMobil'
export const APP_DESCRIPTION = 'Platform Lelang Mobil Terpercaya di Indonesia'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  LELANG: '/lelang',
  CARA_KERJA: '/cara-kerja',
  TENTANG: '/tentang',
  KONTAK: '/kontak',
} as const

export const AUCTION_STATUS = {
  DRAFT: 'DRAFT',
  UPCOMING: 'UPCOMING',
  LIVE: 'LIVE',
  ENDED: 'ENDED',
} as const

export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const

export const KYC_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const

export const TRANSACTION_TYPE = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW',
  BID: 'BID',
  WIN: 'WIN',
  BONUS: 'BONUS',
} as const

export const BANKS = [
  { code: 'BCA', name: 'Bank Central Asia' },
  { code: 'MANDIRI', name: 'Bank Mandiri' },
  { code: 'BRI', name: 'Bank Rakyat Indonesia' },
  { code: 'BNI', name: 'Bank Negara Indonesia' },
] as const
