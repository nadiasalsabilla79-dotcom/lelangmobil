"use client"

import { useState } from "react"
import { Gavel, Loader2, Plus, Minus, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore, useAuctionStore } from "@/lib/store"
import { formatRupiah } from "@/lib/utils/format"
import type { Auction } from "@/lib/types"
import { cn } from "@/lib/utils"

interface BidPanelProps {
  auction: Auction
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BidPanel({ auction, open, onOpenChange }: BidPanelProps) {
  const { toast } = useToast()
  const { wallet } = useAuthStore()
  const { updateAuction } = useAuctionStore()

  const [bidAmount, setBidAmount] = useState(auction.currentPrice + auction.minimumIncrement)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const minimumBid = auction.currentPrice + auction.minimumIncrement
  const availableBalance = wallet?.balance || 0

  const incrementBid = (amount: number) => {
    setBidAmount((prev) => prev + amount)
  }

  const handleBid = async () => {
    // Validations
    if (bidAmount < minimumBid) {
      toast({
        title: "Bid Terlalu Rendah",
        description: `Minimum bid adalah ${formatRupiah(minimumBid)}`,
        variant: "destructive",
      })
      return
    }

    if (bidAmount > availableBalance) {
      toast({
        title: "Saldo Tidak Cukup",
        description: "Silakan top up saldo terlebih dahulu",
        variant: "destructive",
      })
      return
    }

    // Check if auction has ended
    if (new Date(auction.endTime) < new Date()) {
      toast({
        title: "Lelang Telah Berakhir",
        description: "Maaf, waktu lelang sudah habis",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate bid submission (in real app, this would be a WebSocket/API call)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update auction (simulation)
    updateAuction({
      ...auction,
      currentPrice: bidAmount,
      totalBids: auction.totalBids + 1,
    })

    setIsLoading(false)
    setShowSuccess(true)

    // Auto close after showing success
    setTimeout(() => {
      setShowSuccess(false)
      onOpenChange(false)
      setBidAmount(bidAmount + auction.minimumIncrement)
    }, 2000)

    toast({
      title: "Bid Berhasil!",
      description: `Anda memasang bid sebesar ${formatRupiah(bidAmount)}`,
    })
  }

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-sm">
          <div className="text-center py-8">
            <div className="h-20 w-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-xl font-bold mb-2">Bid Berhasil!</h2>
            <p className="text-muted-foreground">Anda sekarang memimpin dengan bid {formatRupiah(bidAmount)}</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Pasang Bid</DialogTitle>
          <DialogDescription>
            {auction.car?.brand} {auction.car?.model} {auction.car?.year}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Price Info */}
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Harga Saat Ini</span>
              <span className="font-semibold">{formatRupiah(auction.currentPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Minimum Bid</span>
              <span className="font-semibold text-navy">{formatRupiah(minimumBid)}</span>
            </div>
          </div>

          {/* Bid Amount Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">Jumlah Bid Anda</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setBidAmount((prev) => Math.max(minimumBid, prev - auction.minimumIncrement))}
                disabled={bidAmount <= minimumBid}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold text-navy">{formatRupiah(bidAmount)}</p>
              </div>
              <Button variant="outline" size="icon" onClick={() => incrementBid(auction.minimumIncrement)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Increment Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 5].map((multiplier) => (
              <Button
                key={multiplier}
                variant="outline"
                size="sm"
                onClick={() => incrementBid(auction.minimumIncrement * multiplier)}
              >
                +{formatRupiah(auction.minimumIncrement * multiplier).replace("Rp", "")}
              </Button>
            ))}
          </div>

          {/* Balance Info */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg text-sm">
            <span className="text-muted-foreground">Saldo Tersedia</span>
            <span className={cn("font-semibold", availableBalance < bidAmount ? "text-destructive" : "text-success")}>
              {formatRupiah(availableBalance)}
            </span>
          </div>

          {/* Warning if insufficient balance */}
          {availableBalance < bidAmount && (
            <div className="flex items-start gap-2 p-3 bg-destructive/10 rounded-lg text-sm">
              <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Saldo tidak mencukupi</p>
                <p className="text-muted-foreground">Kekurangan: {formatRupiah(bidAmount - availableBalance)}</p>
              </div>
            </div>
          )}

          {/* Info Text */}
          <p className="text-xs text-muted-foreground text-center">
            Dengan memasang bid, Anda menyetujui syarat & ketentuan lelang. Saldo akan di-hold sampai lelang selesai.
          </p>

          {/* Submit Button */}
          <Button
            className="w-full bg-navy hover:bg-navy-light h-12"
            onClick={handleBid}
            disabled={isLoading || bidAmount < minimumBid || availableBalance < bidAmount}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <Gavel className="mr-2 h-5 w-5" />
                Pasang Bid {formatRupiah(bidAmount)}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
