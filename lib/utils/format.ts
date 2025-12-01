import type { AuctionStatus, CarGrade, TransactionStatus } from '../types'

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Alias untuk formatRupiah
export const formatCurrency = formatRupiah

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function formatTimeRemaining(endTime: Date): string {
  const now = new Date()
  const diff = endTime.getTime() - now.getTime()
  
  if (diff <= 0) return 'Berakhir'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (days > 0) return `${days}h ${hours}j`
  if (hours > 0) return `${hours}j ${minutes}m`
  return `${minutes}m`
}

export function getGradeColor(grade: CarGrade): string {
  const colors = {
    A: 'bg-success text-success-foreground',
    B: 'bg-warning text-warning-foreground',
    C: 'bg-destructive text-destructive-foreground',
  }
  return colors[grade] || colors.A
}

export function getStatusColor(status: TransactionStatus | AuctionStatus): string {
  const colors: Record<string, string> = {
    PENDING: 'bg-warning text-warning-foreground',
    APPROVED: 'bg-success text-success-foreground',
    REJECTED: 'bg-destructive text-destructive-foreground',
    COMPLETED: 'bg-success text-success-foreground',
    DRAFT: 'bg-muted text-muted-foreground',
    UPCOMING: 'bg-blue-500 text-white',
    LIVE: 'bg-success text-success-foreground',
    ENDED: 'bg-muted text-muted-foreground',
    CANCELLED: 'bg-destructive text-destructive-foreground',
  }
  return colors[status] || 'bg-muted text-muted-foreground'
}

export function getStatusText(status: TransactionStatus | AuctionStatus): string {
  const texts: Record<string, string> = {
    PENDING: 'Menunggu',
    APPROVED: 'Disetujui',
    REJECTED: 'Ditolak',
    COMPLETED: 'Selesai',
    DRAFT: 'Draft',
    UPCOMING: 'Akan Datang',
    LIVE: 'Sedang Berlangsung',
    ENDED: 'Berakhir',
    CANCELLED: 'Dibatalkan',
  }
  return texts[status] || status
}
