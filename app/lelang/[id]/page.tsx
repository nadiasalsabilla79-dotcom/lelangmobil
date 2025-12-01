"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Clock,
  MapPin,
  Gauge,
  Calendar,
  Fuel,
  Users,
  ChevronLeft,
  ChevronRight,
  Gavel,
  AlertCircle,
  CheckCircle,
  Shield,
  Share2,
  Heart,
} from "lucide-react"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/lib/store"
import { dummyAuctions, dummyBids } from "@/lib/dummy-data"
import {
  formatRupiah,
  formatTimeRemaining,
  getGradeColor,
  getStatusColor,
  getStatusText,
  formatDateTime,
} from "@/lib/utils/format"
import { BidPanel } from "@/components/auction/bid-panel"
import { BidHistory } from "@/components/auction/bid-history"
import { cn } from "@/lib/utils"

export default function AuctionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated, kyc } = useAuthStore()
  const { toast } = useToast()

  const auction = dummyAuctions.find((a) => a.id === params.id)
  const car = auction?.car

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState("")
  const [showBidPanel, setShowBidPanel] = useState(false)

  // Update timer
  useEffect(() => {
    if (!auction || auction.status !== "LIVE") return

    const updateTimer = () => {
      setTimeRemaining(formatTimeRemaining(auction.endTime))
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [auction])

  const nextImage = useCallback(() => {
    if (!car) return
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
  }, [car])

  const prevImage = useCallback(() => {
    if (!car) return
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
  }, [car])

  if (!auction || !car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Lelang Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-4">Lelang yang Anda cari tidak ada atau sudah dihapus.</p>
            <Link href="/lelang">
              <Button className="bg-navy hover:bg-navy-light">Kembali ke Daftar Lelang</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const auctionBids = dummyBids.filter((b) => b.auctionId === auction.id).sort((a, b) => b.amount - a.amount)

  const canBid = isAuthenticated && kyc?.status === "APPROVED" && auction.status === "LIVE"

  const handleBidClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login untuk mengikuti lelang",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!kyc || kyc.status !== "APPROVED") {
      toast({
        title: "Verifikasi KYC Diperlukan",
        description: "Lengkapi verifikasi KYC terlebih dahulu untuk ikut lelang",
        variant: "destructive",
      })
      router.push("/dashboard/kyc")
      return
    }

    if (auction.status !== "LIVE") {
      toast({
        title: "Lelang Tidak Aktif",
        description: "Lelang ini belum dimulai atau sudah berakhir",
        variant: "destructive",
      })
      return
    }

    setShowBidPanel(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link href="/lelang" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Kembali ke Daftar Lelang
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={car.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Status Badge */}
                  <Badge className={cn("absolute top-4 left-4", getStatusColor(auction.status))}>
                    {getStatusText(auction.status)}
                  </Badge>

                  {/* Grade Badge */}
                  <Badge className={cn("absolute top-4 right-4", getGradeColor(car.grade))}>Grade {car.grade}</Badge>

                  {/* Navigation Arrows */}
                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}

                  {/* Timer Overlay */}
                  {auction.status === "LIVE" && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-warning" />
                          <span className="font-semibold">Sisa Waktu:</span>
                        </div>
                        <span className="text-xl font-bold text-warning">{timeRemaining}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "relative h-16 w-24 rounded-lg overflow-hidden shrink-0 border-2 transition-colors",
                        currentImageIndex === index
                          ? "border-navy"
                          : "border-transparent hover:border-muted-foreground",
                      )}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Car Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">
                        {car.brand} {car.model}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {car.year} • {car.color}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="specs">
                    <TabsList className="mb-4">
                      <TabsTrigger value="specs">Spesifikasi</TabsTrigger>
                      <TabsTrigger value="description">Deskripsi</TabsTrigger>
                      <TabsTrigger value="bids">Riwayat Bid ({auctionBids.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="specs">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Gauge className="h-4 w-4" />
                            <span className="text-sm">Kilometer</span>
                          </div>
                          <p className="font-semibold">{car.odometer.toLocaleString("id-ID")} km</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">Transmisi</span>
                          </div>
                          <p className="font-semibold">{car.transmission === "AT" ? "Automatic" : "Manual"}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Fuel className="h-4 w-4" />
                            <span className="text-sm">Bahan Bakar</span>
                          </div>
                          <p className="font-semibold">{car.fuel}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">Lokasi</span>
                          </div>
                          <p className="font-semibold">{car.location}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Shield className="h-4 w-4" />
                            <span className="text-sm">Status Pajak</span>
                          </div>
                          <p className="font-semibold">{car.taxStatus}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">Kapasitas Mesin</span>
                          </div>
                          <p className="font-semibold">{car.engineCapacity}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="description">
                      <p className="text-muted-foreground leading-relaxed">{car.description}</p>
                    </TabsContent>

                    <TabsContent value="bids">
                      <BidHistory bids={auctionBids} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Bid Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Price Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Harga Saat Ini</p>
                        <p className="text-3xl font-bold text-navy">{formatRupiah(auction.currentPrice)}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Harga Awal</span>
                        <span>{formatRupiah(auction.startingPrice)}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Min. Kenaikan</span>
                        <span className="font-medium">+{formatRupiah(auction.minimumIncrement)}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Total Bid
                        </span>
                        <span>{auction.totalBids} bid</span>
                      </div>

                      {auction.status === "LIVE" && (
                        <div className="p-3 bg-warning/10 rounded-lg flex items-center gap-2">
                          <Clock className="h-5 w-5 text-warning" />
                          <div>
                            <p className="text-sm font-medium">Sisa Waktu</p>
                            <p className="text-lg font-bold text-warning">{timeRemaining}</p>
                          </div>
                        </div>
                      )}

                      {auction.status === "UPCOMING" && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium">Lelang Dimulai</p>
                          <p className="text-sm text-muted-foreground">{formatDateTime(auction.startTime)}</p>
                        </div>
                      )}

                      {auction.status === "ENDED" && auction.winner && (
                        <div className="p-3 bg-success/10 rounded-lg">
                          <p className="text-sm font-medium text-success">Pemenang</p>
                          <p className="text-sm">{auction.winner.name}</p>
                        </div>
                      )}

                      <Button
                        className="w-full bg-navy hover:bg-navy-light text-lg h-12"
                        onClick={handleBidClick}
                        disabled={auction.status !== "LIVE"}
                      >
                        <Gavel className="mr-2 h-5 w-5" />
                        {auction.status === "LIVE"
                          ? "Pasang Bid"
                          : auction.status === "UPCOMING"
                            ? "Belum Dimulai"
                            : "Lelang Selesai"}
                      </Button>

                      {!isAuthenticated && (
                        <p className="text-xs text-center text-muted-foreground">
                          <Link href="/login" className="text-navy hover:underline">
                            Login
                          </Link>{" "}
                          untuk mengikuti lelang
                        </p>
                      )}

                      {isAuthenticated && (!kyc || kyc.status !== "APPROVED") && (
                        <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg text-sm">
                          <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Verifikasi KYC diperlukan</p>
                            <Link href="/dashboard/kyc" className="text-navy hover:underline">
                              Klik di sini untuk verifikasi
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Badges */}
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-sm">Inspeksi 150+ titik pemeriksaan</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-sm">Dokumen lengkap & legal</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-sm">Garansi keaslian kilometer</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bid Button */}
      {auction.status === "LIVE" && (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-background border-t p-4 z-40">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-muted-foreground">Harga Saat Ini</p>
              <p className="text-lg font-bold text-navy">{formatRupiah(auction.currentPrice)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Sisa Waktu</p>
              <p className="text-sm font-semibold text-warning">{timeRemaining}</p>
            </div>
          </div>
          <Button className="w-full bg-navy hover:bg-navy-light" onClick={handleBidClick}>
            <Gavel className="mr-2 h-4 w-4" />
            Pasang Bid
          </Button>
        </div>
      )}

      {/* Bid Panel Dialog */}
      <BidPanel auction={auction} open={showBidPanel} onOpenChange={setShowBidPanel} />

      <Footer />
    </div>
  )
}
