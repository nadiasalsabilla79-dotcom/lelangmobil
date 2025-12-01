"use client"

import { Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatRupiah, formatDateTime } from "@/lib/utils/format"
import type { Bid } from "@/lib/types"
import { cn } from "@/lib/utils"

interface BidHistoryProps {
  bids: Bid[]
}

export function BidHistory({ bids }: BidHistoryProps) {
  if (bids.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Belum ada bid yang masuk</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {bids.map((bid, index) => {
        const isHighest = index === 0
        const userName = bid.user?.name || "Anonymous"
        const maskedName = userName.substring(0, 3) + "***"

        return (
          <div
            key={bid.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg",
              isHighest ? "bg-success/10 border border-success/30" : "bg-muted/50",
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold",
                  isHighest ? "bg-success text-white" : "bg-muted text-muted-foreground",
                )}
              >
                {isHighest ? <Trophy className="h-4 w-4" /> : index + 1}
              </div>
              <div>
                <p className="font-medium flex items-center gap-2">
                  {maskedName}
                  {isHighest && <Badge className="bg-success text-xs">Tertinggi</Badge>}
                </p>
                <p className="text-xs text-muted-foreground">{formatDateTime(bid.createdAt)}</p>
              </div>
            </div>
            <p className={cn("font-semibold", isHighest ? "text-success" : "text-foreground")}>
              {formatRupiah(bid.amount)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
