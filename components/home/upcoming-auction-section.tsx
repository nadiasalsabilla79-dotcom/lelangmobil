"use client"

import Link from "next/link"
import { ArrowRight, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuctionCard } from "@/components/auction/auction-card"
import { dummyAuctions } from "@/lib/dummy-data"

export function UpcomingAuctionSection() {
  const upcomingAuctions = dummyAuctions.filter((a) => a.status === "UPCOMING")

  if (upcomingAuctions.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-5 w-5 text-warning" />
              <span className="text-sm font-medium text-warning">Segera Dimulai</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">Lelang Akan Datang</h2>
            <p className="text-muted-foreground">Siapkan saldo Anda dan jangan sampai ketinggalan</p>
          </div>
          <Link href="/lelang?status=upcoming">
            <Button variant="outline" className="gap-2 bg-transparent">
              Lihat Semua
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </div>
    </section>
  )
}
