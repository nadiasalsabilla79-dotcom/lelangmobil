// Database Types untuk Platform Lelang Mobil

export type UserRole = "USER" | "ADMIN"
export type KYCStatus = "PENDING" | "APPROVED" | "REJECTED"
export type TransactionType = "DEPOSIT" | "WITHDRAW" | "BONUS" | "BID_HOLD" | "BID_REFUND" | "AUCTION_WIN"
export type TransactionStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED"
export type AuctionStatus = "DRAFT" | "UPCOMING" | "LIVE" | "ENDED" | "CANCELLED"
export type BidStatus = "ACTIVE" | "OUTBID" | "WON" | "LOST"
export type NotificationType =
  | "KYC_APPROVED"
  | "KYC_REJECTED"
  | "DEPOSIT_APPROVED"
  | "DEPOSIT_REJECTED"
  | "WITHDRAW_COMPLETED"
  | "OUTBID"
  | "AUCTION_WON"
  | "AUCTION_STARTED"
  | "BONUS_RECEIVED"
export type BankName = "BCA" | "MANDIRI" | "BRI" | "BNI"
export type CarGrade = "A" | "B" | "C"
export type TransmissionType = "AT" | "MT"
export type FuelType = "BENSIN" | "DIESEL" | "HYBRID" | "ELECTRIC"

export interface User {
  id: string
  email: string
  phone: string
  name: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface KYC {
  id: string
  userId: string
  ktpNumber: string
  ktpImageUrl: string
  selfieImageUrl: string
  status: KYCStatus
  rejectionReason?: string
  approvedAt?: Date
  approvedBy?: string
  createdAt: Date
  updatedAt: Date
}

export interface Wallet {
  id: string
  userId: string
  balance: number
  holdBalance: number
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  userId: string
  walletId: string
  type: TransactionType
  amount: number
  status: TransactionStatus
  bankName?: BankName
  bankAccountNumber?: string
  bankAccountName?: string
  proofImageUrl?: string
  notes?: string
  processedAt?: Date
  processedBy?: string
  createdAt: Date
  updatedAt: Date
}

export interface Car {
  id: string
  brand: string
  model: string
  year: number
  odometer: number
  grade: CarGrade
  location: string
  transmission: TransmissionType
  fuel: FuelType
  taxStatus: string
  taxExpiry?: Date
  color: string
  engineCapacity: string
  description: string
  images: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Auction {
  id: string
  carId: string
  car?: Car
  startingPrice: number
  currentPrice: number
  minimumIncrement: number
  startTime: Date
  endTime: Date
  status: AuctionStatus
  winnerId?: string
  winner?: User
  totalBids: number
  createdAt: Date
  updatedAt: Date
}

export interface Bid {
  id: string
  auctionId: string
  userId: string
  user?: User
  amount: number
  status: BidStatus
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  data?: Record<string, unknown>
  createdAt: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form Types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  phone: string
  name: string
  password: string
}

export interface KYCForm {
  ktpNumber: string
  ktpImage: File | null
  selfieImage: File | null
}

export interface DepositForm {
  amount: number
  bankName: BankName
  proofImage: File | null
}

export interface WithdrawForm {
  amount: number
  bankName: BankName
  bankAccountNumber: string
  bankAccountName: string
}

export interface BidForm {
  auctionId: string
  amount: number
}

export interface CarForm {
  brand: string
  model: string
  year: number
  odometer: number
  grade: CarGrade
  location: string
  transmission: TransmissionType
  fuel: FuelType
  taxStatus: string
  taxExpiry?: Date
  color: string
  engineCapacity: string
  description: string
  images: File[]
}

export interface AuctionForm {
  carId: string
  startingPrice: number
  minimumIncrement: number
  startTime: Date
  endTime: Date
}
