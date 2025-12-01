import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { auctionService } from '@/lib/services/auction.service'
import { toast } from '@/hooks/use-toast'

export function useAuctions() {
  return useQuery({
    queryKey: ['auctions'],
    queryFn: () => auctionService.getAll(),
  })
}

export function useAuction(id: string) {
  return useQuery({
    queryKey: ['auction', id],
    queryFn: () => auctionService.getById(id),
    enabled: !!id,
  })
}

export function usePlaceBid() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ auctionId, amount }: { auctionId: string; amount: number }) =>
      auctionService.placeBid(auctionId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auctions'] })
      toast({ title: 'Bid berhasil!', description: 'Bid Anda telah ditempatkan' })
    },
    onError: () => {
      toast({ title: 'Bid gagal', description: 'Terjadi kesalahan', variant: 'destructive' })
    },
  })
}
