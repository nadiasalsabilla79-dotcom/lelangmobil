"use client"

import { useState, useMemo } from "react"
import { Search, Filter, SlidersHorizontal, Grid, List, X } from "lucide-react"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { AuctionCard } from "@/components/auction/auction-card"
import { dummyAuctions } from "@/lib/dummy-data"
import { cn } from "@/lib/utils"

const brands = ["Toyota", "Honda", "Mitsubishi", "Suzuki", "Daihatsu", "Nissan"]
const locations = ["Jakarta Selatan", "Jakarta Barat", "Surabaya", "Bandung", "Medan", "Semarang"]
const transmissions = ["AT", "MT"]
const fuels = ["BENSIN", "DIESEL", "HYBRID"]

export default function LelangPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("ending-soon")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredAuctions = useMemo(() => {
    let result = [...dummyAuctions]

    // Filter by search
    if (search) {
      result = result.filter(
        (a) =>
          `${a.car?.brand} ${a.car?.model}`.toLowerCase().includes(search.toLowerCase()) ||
          a.car?.location.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Filter by status
    if (status !== "all") {
      result = result.filter((a) => a.status === status)
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      result = result.filter((a) => selectedBrands.includes(a.car?.brand || ""))
    }

    // Filter by locations
    if (selectedLocations.length > 0) {
      result = result.filter((a) => selectedLocations.includes(a.car?.location || ""))
    }

    // Filter by transmissions
    if (selectedTransmissions.length > 0) {
      result = result.filter((a) => selectedTransmissions.includes(a.car?.transmission || ""))
    }

    // Sort
    switch (sortBy) {
      case "ending-soon":
        result.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime())
        break
      case "price-low":
        result.sort((a, b) => a.currentPrice - b.currentPrice)
        break
      case "price-high":
        result.sort((a, b) => b.currentPrice - a.currentPrice)
        break
      case "most-bids":
        result.sort((a, b) => b.totalBids - a.totalBids)
        break
    }

    return result
  }, [search, status, sortBy, selectedBrands, selectedLocations, selectedTransmissions])

  const activeFiltersCount = selectedBrands.length + selectedLocations.length + selectedTransmissions.length

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedLocations([])
    setSelectedTransmissions([])
    setSearch("")
    setStatus("all")
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-3">Merek</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand])
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                  }
                }}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div>
        <h3 className="font-semibold mb-3">Lokasi</h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <label key={location} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedLocations.includes(location)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedLocations([...selectedLocations, location])
                  } else {
                    setSelectedLocations(selectedLocations.filter((l) => l !== location))
                  }
                }}
              />
              <span className="text-sm">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <h3 className="font-semibold mb-3">Transmisi</h3>
        <div className="space-y-2">
          {transmissions.map((transmission) => (
            <label key={transmission} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedTransmissions.includes(transmission)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedTransmissions([...selectedTransmissions, transmission])
                  } else {
                    setSelectedTransmissions(selectedTransmissions.filter((t) => t !== transmission))
                  }
                }}
              />
              <span className="text-sm">{transmission === "AT" ? "Automatic" : "Manual"}</span>
            </label>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full bg-transparent" onClick={clearAllFilters}>
          <X className="mr-2 h-4 w-4" />
          Reset Filter
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Lelang Mobil</h1>
            <p className="text-muted-foreground">
              Temukan mobil impian Anda dari {dummyAuctions.length} lelang yang tersedia
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari merek, model, atau lokasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="LIVE">Sedang Berlangsung</SelectItem>
                <SelectItem value="UPCOMING">Akan Datang</SelectItem>
                <SelectItem value="ENDED">Selesai</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ending-soon">Segera Berakhir</SelectItem>
                <SelectItem value="price-low">Harga Terendah</SelectItem>
                <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                <SelectItem value="most-bids">Bid Terbanyak</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                  {activeFiltersCount > 0 && (
                    <Badge className="bg-navy h-5 w-5 p-0 flex items-center justify-center">{activeFiltersCount}</Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filter Lelang</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* View Mode */}
            <div className="hidden lg:flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-navy" : ""}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-navy" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Filter aktif:</span>
              {selectedBrands.map((brand) => (
                <Badge key={brand} variant="secondary" className="gap-1">
                  {brand}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedBrands(selectedBrands.filter((b) => b !== brand))}
                  />
                </Badge>
              ))}
              {selectedLocations.map((location) => (
                <Badge key={location} variant="secondary" className="gap-1">
                  {location}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedLocations(selectedLocations.filter((l) => l !== location))}
                  />
                </Badge>
              ))}
              {selectedTransmissions.map((transmission) => (
                <Badge key={transmission} variant="secondary" className="gap-1">
                  {transmission}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedTransmissions(selectedTransmissions.filter((t) => t !== transmission))}
                  />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Hapus semua
              </Button>
            </div>
          )}

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Desktop Sidebar Filter */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 bg-card rounded-lg border p-4">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </h2>
                <FilterContent />
              </div>
            </aside>

            {/* Auction Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-4">
                Menampilkan {filteredAuctions.length} dari {dummyAuctions.length} lelang
              </p>

              {filteredAuctions.length === 0 ? (
                <div className="text-center py-16">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Tidak Ada Hasil</h3>
                  <p className="text-muted-foreground mb-4">Coba ubah filter atau kata kunci pencarian Anda</p>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Reset Filter
                  </Button>
                </div>
              ) : (
                <div
                  className={cn(
                    "grid gap-6",
                    viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
                  )}
                >
                  {filteredAuctions.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
