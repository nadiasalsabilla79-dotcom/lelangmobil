import type { Metadata } from "next"
import { Suspense } from "react"
import { Search, Filter, SortAsc, Car, MapPin, Calendar, Gavel } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuctionCard } from "@/components/auction/auction-card"
import { dummyAuctions } from "@/lib/dummy-data"

export const metadata: Metadata = {
  title: "Lelang Mobil Online - Daftar Lelang Aktif | LelangMobil",
  description: "Ikuti lelang mobil online terpercaya. Temukan Toyota Avanza, Honda Civic, Mitsubishi Pajero, dan mobil bekas berkualitas lainnya dengan harga terbaik. Lelang dimulai dari Rp 150 juta.",
  keywords: "lelang mobil aktif, lelang toyota avanza, lelang honda civic, lelang mitsubishi pajero, lelang mobil jakarta, lelang mobil surabaya, lelang mobil bandung, mobil bekas lelang",
  openGraph: {
    title: "Lelang Mobil Online - Daftar Lelang Aktif | LelangMobil",
    description: "Ikuti lelang mobil online terpercaya. Temukan mobil bekas berkualitas dengan harga terbaik melalui sistem lelang yang transparan.",
    url: "https://lelangmobil.com/lelang",
    images: [
      {
        url: "/og-lelang.jpg",
        width: 1200,
        height: 630,
        alt: "Daftar Lelang Mobil Online Aktif",
      },
    ],
  },
}

export default function LelangPage() {
  const liveAuctions = dummyAuctions.filter(auction => auction.status === "LIVE")
  const upcomingAuctions = dummyAuctions.filter(auction => auction.status === "UPCOMING")

  return (
    <>
      {/* Structured Data for Auction Listings */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Daftar Lelang Mobil Online",
            "description": "Daftar lelang mobil bekas berkualitas yang sedang berlangsung",
            "url": "https://lelangmobil.com/lelang",
            "numberOfItems": dummyAuctions.length,
            "itemListElement": dummyAuctions.map((auction, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": auction.car.brand + " " + auction.car.model + " " + auction.car.year,
                "description": auction.car.description,
                "image": auction.car.images[0],
                "offers": {
                  "@type": "Offer",
                  "price": auction.currentPrice,
                  "priceCurrency": "IDR",
                  "availability": auction.status === "LIVE" ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
                }
              }
            }))
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text-2025 mb-4">
              Lelang Mobil Online
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temukan mobil impian Anda dengan harga terbaik melalui sistem lelang yang transparan dan aman
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter & Pencarian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Cari mobil..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Merek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                    <SelectItem value="suzuki">Suzuki</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Lokasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jakarta">Jakarta</SelectItem>
                    <SelectItem value="surabaya">Surabaya</SelectItem>
                    <SelectItem value="bandung">Bandung</SelectItem>
                    <SelectItem value="medan">Medan</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Harga Terendah</SelectItem>
                    <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                    <SelectItem value="ending-soon">Berakhir Segera</SelectItem>
                    <SelectItem value="newest">Terbaru</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Live Auctions */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold">Lelang Sedang Berlangsung</h2>
              </div>
              <Badge variant="destructive" className="animate-pulse">
                LIVE
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          </section>

          {/* Upcoming Auctions */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Lelang Akan Datang</h2>
              <Badge variant="outline">
                {upcomingAuctions.length} Lelang
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          </section>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Gavel className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{dummyAuctions.length}</p>
                <p className="text-sm text-muted-foreground">Total Lelang</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                <p className="text-2xl font-bold text-red-600">{liveAuctions.length}</p>
                <p className="text-sm text-muted-foreground">Sedang Live</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{upcomingAuctions.length}</p>
                <p className="text-sm text-muted-foreground">Akan Datang</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Car className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">150+</p>
                <p className="text-sm text-muted-foreground">Mobil Terjual</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}