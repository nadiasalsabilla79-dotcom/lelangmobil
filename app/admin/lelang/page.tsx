"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye, Play, Pause, Square } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { dummyAuctions, dummyCars } from "@/lib/dummy-data"
import { formatRupiah } from "@/lib/utils/format"
import Image from "next/image"

export default function AdminLelangPage() {
  const { toast } = useToast()
  const [auctions, setAuctions] = useState(dummyAuctions)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAuction, setNewAuction] = useState({
    carId: "",
    title: "",
    startPrice: 0,
    minIncrement: 0,
    startTime: "",
    endTime: "",
    status: "DRAFT",
  })

  const filteredAuctions = auctions.filter(auction =>
    auction.car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auction.car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auction.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddAuction = () => {
    const auction = {
      id: `auction-${Date.now()}`,
      ...newAuction,
      car: dummyCars.find(c => c.id === newAuction.carId) || dummyCars[0],
      currentPrice: newAuction.startPrice,
      totalBids: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setAuctions([...auctions, auction])
    setIsAddDialogOpen(false)
    setNewAuction({
      carId: "",
      title: "",
      startPrice: 0,
      minIncrement: 0,
      startTime: "",
      endTime: "",
      status: "DRAFT",
    })
    toast({
      title: "Lelang Ditambahkan",
      description: "Lelang baru berhasil dibuat",
    })
  }

  const handleStatusChange = (auctionId: string, newStatus: string) => {
    setAuctions(auctions.map(auction => 
      auction.id === auctionId 
        ? { ...auction, status: newStatus }
        : auction
    ))
    toast({
      title: "Status Diubah",
      description: `Status lelang berhasil diubah ke ${newStatus}`,
    })
  }

  const handleDeleteAuction = (auctionId: string) => {
    setAuctions(auctions.filter(auction => auction.id !== auctionId))
    toast({
      title: "Lelang Dihapus",
      description: "Lelang berhasil dihapus",
    })
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      DRAFT: "bg-gray-100 text-gray-800",
      UPCOMING: "bg-blue-100 text-blue-800",
      LIVE: "bg-red-100 text-red-800",
      ENDED: "bg-green-100 text-green-800",
    }
    return variants[status as keyof typeof variants] || variants.DRAFT
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "LIVE":
        return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      case "UPCOMING":
        return <div className="w-2 h-2 bg-blue-500 rounded-full" />
      case "ENDED":
        return <div className="w-2 h-2 bg-green-500 rounded-full" />
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full" />
    }
  }

  const draftCount = auctions.filter(a => a.status === "DRAFT").length
  const upcomingCount = auctions.filter(a => a.status === "UPCOMING").length
  const liveCount = auctions.filter(a => a.status === "LIVE").length
  const endedCount = auctions.filter(a => a.status === "ENDED").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text-2025">Manajemen Lelang</h1>
          <p className="text-muted-foreground">Kelola lelang mobil dan status</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-navy hover:bg-navy-light">
              <Plus className="mr-2 h-4 w-4" />
              Buat Lelang Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Buat Lelang Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Pilih Kendaraan</Label>
                <Select value={newAuction.carId} onValueChange={(value) => setNewAuction({...newAuction, carId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kendaraan" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyCars.map((car) => (
                      <SelectItem key={car.id} value={car.id}>
                        {car.brand} {car.model} {car.year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Judul Lelang</Label>
                <Input
                  value={newAuction.title}
                  onChange={(e) => setNewAuction({...newAuction, title: e.target.value})}
                  placeholder="Contoh: Toyota Avanza G 2022 - Silver Metalik"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Harga Awal (Rp)</Label>
                  <Input
                    type="number"
                    value={newAuction.startPrice}
                    onChange={(e) => setNewAuction({...newAuction, startPrice: parseInt(e.target.value)})}
                    placeholder="150000000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Minimum Increment (Rp)</Label>
                  <Input
                    type="number"
                    value={newAuction.minIncrement}
                    onChange={(e) => setNewAuction({...newAuction, minIncrement: parseInt(e.target.value)})}
                    placeholder="500000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Waktu Mulai</Label>
                  <Input
                    type="datetime-local"
                    value={newAuction.startTime}
                    onChange={(e) => setNewAuction({...newAuction, startTime: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Waktu Berakhir</Label>
                  <Input
                    type="datetime-local"
                    value={newAuction.endTime}
                    onChange={(e) => setNewAuction({...newAuction, endTime: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={newAuction.status} onValueChange={(value) => setNewAuction({...newAuction, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="UPCOMING">Upcoming</SelectItem>
                    <SelectItem value="LIVE">Live</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddAuction}>
                Buat Lelang
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-600">{draftCount}</p>
                <p className="text-sm text-muted-foreground">Draft</p>
              </div>
              <Square className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{upcomingCount}</p>
                <p className="text-sm text-muted-foreground">Akan Datang</p>
              </div>
              <Pause className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{liveCount}</p>
                <p className="text-sm text-muted-foreground">Sedang Live</p>
              </div>
              <Play className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{endedCount}</p>
                <p className="text-sm text-muted-foreground">Selesai</p>
              </div>
              <Square className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Daftar Lelang ({filteredAuctions.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari lelang..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kendaraan</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Bid</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuctions.map((auction) => (
                <TableRow key={auction.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={auction.car.images[0]}
                          alt={auction.car.brand}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{auction.car.brand} {auction.car.model}</p>
                        <p className="text-sm text-muted-foreground">{auction.car.year} • {auction.car.location}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{formatRupiah(auction.currentPrice)}</p>
                      <p className="text-sm text-muted-foreground">Start: {formatRupiah(auction.startingPrice)}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{auction.totalBids} bid</p>
                      <p className="text-sm text-muted-foreground">+{formatRupiah(auction.minimumIncrement)}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{auction.startTime.toLocaleDateString('id-ID')}</p>
                      <p className="text-sm text-muted-foreground">{auction.endTime.toLocaleDateString('id-ID')}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(auction.status)}
                      <Badge className={getStatusBadge(auction.status)}>
                        {auction.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Select
                        value={auction.status}
                        onValueChange={(value) => handleStatusChange(auction.id, value)}
                      >
                        <SelectTrigger className="w-24 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="UPCOMING">Upcoming</SelectItem>
                          <SelectItem value="LIVE">Live</SelectItem>
                          <SelectItem value="ENDED">Ended</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteAuction(auction.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}