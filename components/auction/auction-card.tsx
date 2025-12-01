"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, MapPin, Gauge, Calendar, Fuel, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatRupiah, formatTimeRemaining, getGradeColor, getStatusColor, getStatusText } from "@/lib/utils/format"
import type { Auction } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AuctionCardProps {
  auction: Auction
  variant?: "default" | "compact"
}

export function AuctionCard({ auction, variant = "default" }: AuctionCardProps) {
  const [timeRemaining, setTimeRemaining] = useState(formatTimeRemaining(auction.endTime))
  const car = auction.car

  useEffect(() => {
    if (auction.status !== "LIVE") return

    const timer = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(auction.endTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [auction.endTime, auction.status])

  if (!car) return null

  return (
    <Card className="card-3d group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white rounded-2xl shimmer glow-pulse">
      <div className="relative">
        <div className="w-full h-64 relative overflow-hidden bg-gray-100">
          <Image
            src={car.images[0] || "/placeholder.svg"}
            alt={`${car.brand} ${car.model}`}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Status Badge */}
        <Badge className={cn("absolute top-3 left-3", getStatusColor(auction.status))}>
          {getStatusText(auction.status)}
        </Badge>

        {/* Grade Badge */}
        <Badge className={cn("absolute top-3 right-3", getGradeColor(car.grade))}>Grade {car.grade}</Badge>

        {/* Timer Overlay for Live Auctions */}
        {auction.status === "LIVE" && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">{timeRemaining}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span className="text-sm">{auction.totalBids} bid</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        {/* Car Title */}
        <h3 className="font-bold text-lg mb-1 line-clamp-1 text-gray-900">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{car.year}</p>

        {/* Car Details */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Gauge className="h-4 w-4" />
            <span>{car.odometer.toLocaleString("id-ID")} km</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{car.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Fuel className="h-4 w-4" />
            <span>{car.fuel}</span>
          </div>
        </div>

        {/* Price */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500">Harga Saat Ini</p>
              <p className="text-xl font-bold text-blue-900">{formatRupiah(auction.currentPrice)}</p>
            </div>
            {auction.status === "LIVE" && (
              <div className="text-right">
                <p className="text-xs text-gray-500">Min. Kenaikan</p>
                <p className="text-sm font-semibold text-green-600">+{formatRupiah(auction.minimumIncrement)}</p>
              </div>
            )}
          </div>

          <Link href={`/lelang/${auction.id}`}>
            <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-lg h-11 font-semibold">
              {auction.status === "LIVE"
                ? "Ikut Lelang Sekarang"
                : auction.status === "UPCOMING"
                  ? "Lihat Detail"
                  : "Lihat Hasil"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
