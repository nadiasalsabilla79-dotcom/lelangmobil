import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Wallet, Notification, Auction, KYC } from "./types"

interface AuthState {
  user: User | null
  wallet: Wallet | null
  kyc: KYC | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setWallet: (wallet: Wallet | null) => void
  setKyc: (kyc: KYC | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      wallet: null,
      kyc: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setWallet: (wallet) => set({ wallet }),
      setKyc: (kyc) => set({ kyc }),
      logout: () => {
        // Clear cookies
        if (typeof document !== 'undefined') {
          document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
          document.cookie = 'user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
        }
        set({ user: null, wallet: null, kyc: null, isAuthenticated: false })
      },
    }),
    { name: "auth-storage" },
  ),
)

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  setNotifications: (notifications: Notification[]) => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    }),
}))

interface AuctionState {
  liveAuctions: Auction[]
  currentAuction: Auction | null
  setLiveAuctions: (auctions: Auction[]) => void
  setCurrentAuction: (auction: Auction | null) => void
  updateAuction: (auction: Auction) => void
}

export const useAuctionStore = create<AuctionState>((set) => ({
  liveAuctions: [],
  currentAuction: null,
  setLiveAuctions: (auctions) => set({ liveAuctions: auctions }),
  setCurrentAuction: (auction) => set({ currentAuction: auction }),
  updateAuction: (auction) =>
    set((state) => ({
      liveAuctions: state.liveAuctions.map((a) => (a.id === auction.id ? auction : a)),
      currentAuction: state.currentAuction?.id === auction.id ? auction : state.currentAuction,
    })),
}))
