"use client"

import { useState } from "react"
import Image from "next/image"
import { Gavel, Plus, Search, Eye, Pencil, Trash2, MoreVertical, Play, Pause } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { dummyAuctions, dummyCars } from "@/lib/dummy-data"
import { formatCurrency } from "@/lib/utils/format"

const statusColors: Record<string, string> = {
  UPCOMING: "bg-blue-500/20 text-blue-700",
  LIVE: "bg-success/20 text-success",
  ENDED: "bg-muted text-muted-foreground",
  CANCELLED: "bg-destructive/20 text-destructive",
}

const statusLabels: Record<string, string> = {
  UPCOMING: "Akan Datang",
  LIVE: "Berlangsung",
  ENDED: "Selesai",
  CANCELLED: "Dibatalkan",
}

export default function AdminLelangPage() {
  const { toast } = useToast()
  const [auctions, setAuctions] = useState(dummyAuctions)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [showFormDialog, setShowFormDialog] = useState(false)
  const [editingAuction, setEditingAuction] = useState<(typeof dummyAuctions)[0] | null>(null)
  const [formData, setFormData] = useState({
    carId: "",
    startingPrice: 0,
    minimumBidIncrement: 1000000,
    startTime: "",
    endTime: "",
  })

  const filteredAuctions = auctions.filter((auction) => {
    const car = dummyCars.find((c) => c.id === auction.carId)
    const matchesSearch = car ? `${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase()) : false
    const matchesStatus = statusFilter === "ALL" || auction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleOpenForm = (auction?: (typeof dummyAuctions)[0]) => {
    if (auction) {
      setEditingAuction(auction)
      setFormData({
        carId: auction.carId,
        startingPrice: auction.startingPrice,
        minimumBidIncrement: auction.minimumIncrement,
        startTime: new Date(auction.startTime).toISOString().slice(0, 16),
        endTime: new Date(auction.endTime).toISOString().slice(0, 16),
      })
    } else {
      setEditingAuction(null)
      setFormData({
        carId: "",
        startingPrice: 0,
        minimumBidIncrement: 1000000,
        startTime: "",
        endTime: "",
      })
    }
    setShowFormDialog(true)
  }

  const handleSave = () => {
    if (editingAuction) {
      setAuctions(
        auctions.map((a) =>
          a.id === editingAuction.id
            ? {
                ...a,
                ...formData,
                startTime: new Date(formData.startTime),
                endTime: new Date(formData.endTime),
              }
            : a,
        ),
      )
      toast({
        title: "Lelang Diperbarui",
        description: "Data lelang berhasil diperbarui",
      })
    } else {
      const newAuction = {
        id: `auction-${Date.now()}`,
        carId: formData.carId,
        startingPrice: formData.startingPrice,
        currentPrice: formData.startingPrice,
        minimumIncrement: formData.minimumBidIncrement,
        startTime: new Date(formData.startTime),
        endTime: new Date(formData.endTime),
        status: "UPCOMING" as const,
        totalBids: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setAuctions([newAuction, ...auctions])
      toast({
        title: "Lelang Ditambahkan",
        description: "Lelang baru berhasil ditambahkan",
      })
    }
    setShowFormDialog(false)
  }

  const handleStatusChange = (auctionId: string, newStatus: "LIVE" | "ENDED" | "CANCELLED") => {
    setAuctions(auctions.map((a) => (a.id === auctionId ? { ...a, status: newStatus } : a)))
    toast({
      title: "Status Diubah",
      description: `Lelang sekarang ${statusLabels[newStatus].toLowerCase()}`,
    })
  }

  const handleDelete = (auction: (typeof dummyAuctions)[0]) => {
    setAuctions(auctions.filter((a) => a.id !== auction.id))
    toast({
      title: "Lelang Dihapus",
      description: "Lelang berhasil dihapus",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Lelang</h1>
          <p className="text-muted-foreground">Kelola sesi lelang kendaraan</p>
        </div>
        <Button className="bg-navy hover:bg-navy-light" onClick={() => handleOpenForm()}>
          <Plus className="mr-2 h-4 w-4" />
          Buat Lelang
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari lelang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Semua Status</SelectItem>
            <SelectItem value="UPCOMING">Akan Datang</SelectItem>
            <SelectItem value="LIVE">Berlangsung</SelectItem>
            <SelectItem value="ENDED">Selesai</SelectItem>
            <SelectItem value="CANCELLED">Dibatalkan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Lelang</p>
            <p className="text-2xl font-bold">{auctions.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Berlangsung</p>
            <p className="text-2xl font-bold text-success">{auctions.filter((a) => a.status === "LIVE").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Akan Datang</p>
            <p className="text-2xl font-bold text-blue-600">{auctions.filter((a) => a.status === "UPCOMING").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Selesai</p>
            <p className="text-2xl font-bold">{auctions.filter((a) => a.status === "ENDED").length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          {filteredAuctions.length === 0 ? (
            <div className="text-center py-8">
              <Gavel className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Tidak ada lelang ditemukan</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAuctions.map((auction) => {
                const car = dummyCars.find((c) => c.id === auction.carId)
                if (!car) return null
                return (
                  <div
                    key={auction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-24 rounded-lg overflow-hidden">
                        <Image
                          src={car.images[0] || "/placeholder.svg?height=64&width=96&query=car"}
                          alt={`${car.brand} ${car.model}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">
                            {car.brand} {car.model}
                          </p>
                          <Badge className={statusColors[auction.status]}>{statusLabels[auction.status]}</Badge>
                        </div>
                        <p className="text-sm font-medium text-navy">{formatCurrency(auction.currentPrice)}</p>
                        <p className="text-sm text-muted-foreground">
                          {auction.totalBids} bid - Berakhir: {new Date(auction.endTime).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenForm(auction)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {auction.status === "UPCOMING" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(auction.id, "LIVE")}>
                            <Play className="mr-2 h-4 w-4" />
                            Mulai Lelang
                          </DropdownMenuItem>
                        )}
                        {auction.status === "LIVE" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(auction.id, "ENDED")}>
                            <Pause className="mr-2 h-4 w-4" />
                            Akhiri Lelang
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(auction)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showFormDialog} onOpenChange={setShowFormDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingAuction ? "Edit Lelang" : "Buat Lelang Baru"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Kendaraan</Label>
              <Select value={formData.carId} onValueChange={(v) => setFormData({ ...formData, carId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kendaraan" />
                </SelectTrigger>
                <SelectContent>
                  {dummyCars.map((car) => (
                    <SelectItem key={car.id} value={car.id}>
                      {car.brand} {car.model} ({car.year})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Harga Awal (Rp)</Label>
              <Input
                type="number"
                value={formData.startingPrice}
                onChange={(e) => setFormData({ ...formData, startingPrice: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Kelipatan Bid (Rp)</Label>
              <Input
                type="number"
                value={formData.minimumBidIncrement}
                onChange={(e) => setFormData({ ...formData, minimumBidIncrement: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Waktu Mulai</Label>
                <Input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Waktu Berakhir</Label>
                <Input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFormDialog(false)}>
              Batal
            </Button>
            <Button className="bg-navy hover:bg-navy-light" onClick={handleSave}>
              {editingAuction ? "Simpan Perubahan" : "Buat Lelang"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
