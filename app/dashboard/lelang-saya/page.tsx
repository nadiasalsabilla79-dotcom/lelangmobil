"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Gavel, Trophy, XCircle, Eye, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/lib/store"
import { formatRupiah } from "@/lib/utils/format"
import { dummyBids, dummyAuctions } from "@/lib/dummy-data"

export default function LelangSayaPage() {
  const { user } = useAuthStore()

  // Get user's bids and match with auctions
  const userBids = dummyBids.filter((b) => b.userId === user?.id)
  const activeBids = userBids.filter((b) => b.status === "ACTIVE")
  const wonBids = dummyAuctions.filter((a) => a.winnerId === user?.id)
  const lostBids = userBids.filter((b) => b.status === "OUTBID" || b.status === "LOST")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Lelang Saya</h1>
        <p className="text-muted-foreground">Pantau semua aktivitas lelang Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
              <Gavel className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeBids.length}</p>
              <p className="text-sm text-muted-foreground">Bid Aktif</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-2xl font-bold">{wonBids.length}</p>
              <p className="text-sm text-muted-foreground">Menang</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <XCircle className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{lostBids.length}</p>
              <p className="text-sm text-muted-foreground">Terkalahkan</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bids List */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Bid</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Aktif ({activeBids.length})</TabsTrigger>
              <TabsTrigger value="won">Menang ({wonBids.length})</TabsTrigger>
              <TabsTrigger value="lost">Terkalahkan ({lostBids.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              {activeBids.length === 0 ? (
                <EmptyState
                  icon={Gavel}
                  title="Belum ada bid aktif"
                  description="Mulai ikuti lelang dan pasang bid pertama Anda"
                />
              ) : (
                <div className="space-y-3">
                  {activeBids.map((bid) => {
                    const auction = dummyAuctions.find((a) => a.id === bid.auctionId)
                    if (!auction?.car) return null
                    return <BidCard key={bid.id} bid={bid} auction={auction} />
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="won">
              {wonBids.length === 0 ? (
                <EmptyState icon={Trophy} title="Belum ada kemenangan" description="Terus ikuti lelang untuk menang!" />
              ) : (
                <div className="space-y-3">
                  {wonBids.map((auction) => (
                    <WonAuctionCard key={auction.id} auction={auction} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="lost">
              {lostBids.length === 0 ? (
                <EmptyState icon={XCircle} title="Tidak ada bid terkalahkan" description="Semua bid Anda masih aktif" />
              ) : (
                <div className="space-y-3">
                  {lostBids.map((bid) => {
                    const auction = dummyAuctions.find((a) => a.id === bid.auctionId)
                    if (!auction?.car) return null
                    return <BidCard key={bid.id} bid={bid} auction={auction} />
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="text-center py-12">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Link href="/lelang">
        <Button className="bg-navy hover:bg-navy-light">
          Lihat Lelang Aktif
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}

function BidCard({ bid, auction }: { bid: (typeof dummyBids)[0]; auction: (typeof dummyAuctions)[0] }) {
  const car = auction.car!
  const isLeading = bid.status === "ACTIVE"

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
      <div className="relative h-20 w-28 rounded-lg overflow-hidden shrink-0">
        <Image
          src={car.images[0] || "/placeholder.svg"}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm text-muted-foreground">
          {car.year} • {car.location}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm">
            Bid Anda: <span className="font-semibold">{formatRupiah(bid.amount)}</span>
          </p>
          <Badge className={isLeading ? "bg-success" : "bg-muted text-muted-foreground"}>
            {isLeading ? "Memimpin" : "Terkalahkan"}
          </Badge>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm text-muted-foreground">Harga Sekarang</p>
        <p className="font-semibold text-navy">{formatRupiah(auction.currentPrice)}</p>
      </div>
      <Link href={`/lelang/${auction.id}`}>
        <Button variant="outline" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}

function WonAuctionCard({ auction }: { auction: (typeof dummyAuctions)[0] }) {
  const car = auction.car!

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-success/10 border border-success/30">
      <div className="relative h-20 w-28 rounded-lg overflow-hidden shrink-0">
        <Image
          src={car.images[0] || "/placeholder.svg"}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold truncate">
            {car.brand} {car.model}
          </h3>
          <Badge className="bg-success">Menang!</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {car.year} • {car.location}
        </p>
        <p className="text-sm mt-1">
          Harga Final: <span className="font-bold text-success">{formatRupiah(auction.currentPrice)}</span>
        </p>
      </div>
      <div className="text-right shrink-0">
        <Link href={`/lelang/${auction.id}`}>
          <Button className="bg-success hover:bg-success/90">Lihat Detail</Button>
        </Link>
      </div>
    </div>
  )
}
