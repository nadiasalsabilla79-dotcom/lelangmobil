import { apiClient } from '@/lib/api/client'
import type { Auction, Bid } from '@/lib/types'

export const auctionService = {
  getAll: () => apiClient.get<{ data: Auction[] }>('/auctions'),
  getById: (id: string) => apiClient.get<{ data: Auction }>(`/auctions/${id}`),
  placeBid: (auctionId: string, amount: number) => 
    apiClient.post<{ data: Bid }>('/bids', { auctionId, amount }),
}
