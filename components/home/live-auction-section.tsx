"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuctionCard } from "@/components/auction/auction-card"
import { dummyAuctions } from "@/lib/dummy-data"

export function LiveAuctionSection() {
  const liveAuctions = dummyAuctions.filter((a) => a.status === "LIVE")

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              🔥 Lelang Sedang Berlangsung
            </h2>
            <p className="text-gray-600 text-sm md:text-base">Jangan lewatkan kesempatan untuk mendapatkan mobil impian Anda</p>
          </div>
          <Link href="/lelang?status=live">
            <Button className="gap-2 bg-blue-900 hover:bg-blue-800">
              Lihat Semua
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {liveAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>

        {liveAuctions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tidak ada lelang yang sedang berlangsung saat ini.</p>
          </div>
        )}
      </div>
    </section>
  )
}
