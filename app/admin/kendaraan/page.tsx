"use client"

import { useState } from "react"
import Image from "next/image"
import { Car, Plus, Search, Pencil, Trash2, MoreVertical } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { dummyCars } from "@/lib/dummy-data"
import { getGradeColor } from "@/lib/utils/format"

export default function AdminKendaraanPage() {
  const { toast } = useToast()
  const [cars, setCars] = useState(dummyCars)
  const [search, setSearch] = useState("")
  const [showFormDialog, setShowFormDialog] = useState(false)
  const [editingCar, setEditingCar] = useState<(typeof dummyCars)[0] | null>(null)
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    odometer: 0,
    grade: "A",
    location: "",
    transmission: "AT",
    fuel: "BENSIN",
    taxStatus: "Hidup",
    color: "",
    engineCapacity: "",
    description: "",
  })

  const filteredCars = cars.filter((car) => `${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase()))

  const handleOpenForm = (car?: (typeof dummyCars)[0]) => {
    if (car) {
      setEditingCar(car)
      setFormData({
        brand: car.brand,
        model: car.model,
        year: car.year,
        odometer: car.odometer,
        grade: car.grade,
        location: car.location,
        transmission: car.transmission,
        fuel: car.fuel,
        taxStatus: car.taxStatus,
        color: car.color,
        engineCapacity: car.engineCapacity,
        description: car.description,
      })
    } else {
      setEditingCar(null)
      setFormData({
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        odometer: 0,
        grade: "A",
        location: "",
        transmission: "AT",
        fuel: "BENSIN",
        taxStatus: "Hidup",
        color: "",
        engineCapacity: "",
        description: "",
      })
    }
    setShowFormDialog(true)
  }

  const handleSave = () => {
    if (editingCar) {
      setCars(cars.map((c) => (c.id === editingCar.id ? { 
        ...c, 
        ...formData, 
        grade: formData.grade as "A" | "B" | "C",
        transmission: formData.transmission as "AT" | "MT",
        fuel: formData.fuel as "BENSIN" | "DIESEL" | "HYBRID" | "ELECTRIC",
        updatedAt: new Date() 
      } : c)))
      toast({
        title: "Kendaraan Diperbarui",
        description: `${formData.brand} ${formData.model} berhasil diperbarui`,
      })
    } else {
      const newCar = {
        id: `car-${Date.now()}`,
        ...formData,
        grade: formData.grade as "A" | "B" | "C",
        transmission: formData.transmission as "AT" | "MT",
        fuel: formData.fuel as "BENSIN" | "DIESEL" | "HYBRID" | "ELECTRIC",
        images: ["/classic-red-convertible.png"],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setCars([newCar, ...cars])
      toast({
        title: "Kendaraan Ditambahkan",
        description: `${formData.brand} ${formData.model} berhasil ditambahkan`,
      })
    }
    setShowFormDialog(false)
  }

  const handleDelete = (car: (typeof dummyCars)[0]) => {
    setCars(cars.filter((c) => c.id !== car.id))
    toast({
      title: "Kendaraan Dihapus",
      description: `${car.brand} ${car.model} berhasil dihapus`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kendaraan</h1>
          <p className="text-muted-foreground">Kelola daftar kendaraan untuk lelang</p>
        </div>
        <Button className="bg-navy hover:bg-navy-light" onClick={() => handleOpenForm()}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Kendaraan
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari kendaraan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
              <span className="font-bold text-success">A</span>
            </div>
            <div>
              <p className="text-2xl font-bold">{cars.filter((c) => c.grade === "A").length}</p>
              <p className="text-sm text-muted-foreground">Grade A</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-warning/20 flex items-center justify-center">
              <span className="font-bold text-warning">B</span>
            </div>
            <div>
              <p className="text-2xl font-bold">{cars.filter((c) => c.grade === "B").length}</p>
              <p className="text-sm text-muted-foreground">Grade B</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <span className="font-bold text-destructive">C</span>
            </div>
            <div>
              <p className="text-2xl font-bold">{cars.filter((c) => c.grade === "C").length}</p>
              <p className="text-sm text-muted-foreground">Grade C</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          {filteredCars.length === 0 ? (
            <div className="text-center py-8">
              <Car className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Tidak ada kendaraan ditemukan</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
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
                        <Badge className={getGradeColor(car.grade)}>Grade {car.grade}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {car.year} - {car.odometer.toLocaleString()} km - {car.transmission}
                      </p>
                      <p className="text-sm text-muted-foreground">{car.location}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenForm(car)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(car)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showFormDialog} onOpenChange={setShowFormDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCar ? "Edit Kendaraan" : "Tambah Kendaraan Baru"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Merek</Label>
              <Input
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Toyota, Honda, dll"
              />
            </div>
            <div className="space-y-2">
              <Label>Model</Label>
              <Input
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="Avanza, Civic, dll"
              />
            </div>
            <div className="space-y-2">
              <Label>Tahun</Label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Odometer (km)</Label>
              <Input
                type="number"
                value={formData.odometer}
                onChange={(e) => setFormData({ ...formData, odometer: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Grade</Label>
              <Select value={formData.grade} onValueChange={(v) => setFormData({ ...formData, grade: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Grade A - Sangat Baik</SelectItem>
                  <SelectItem value="B">Grade B - Baik</SelectItem>
                  <SelectItem value="C">Grade C - Cukup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Transmisi</Label>
              <Select
                value={formData.transmission}
                onValueChange={(v) => setFormData({ ...formData, transmission: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AT">Automatic (AT)</SelectItem>
                  <SelectItem value="MT">Manual (MT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Bahan Bakar</Label>
              <Select value={formData.fuel} onValueChange={(v) => setFormData({ ...formData, fuel: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BENSIN">Bensin</SelectItem>
                  <SelectItem value="DIESEL">Diesel</SelectItem>
                  <SelectItem value="HYBRID">Hybrid</SelectItem>
                  <SelectItem value="ELECTRIC">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status Pajak</Label>
              <Select value={formData.taxStatus} onValueChange={(v) => setFormData({ ...formData, taxStatus: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hidup">Hidup</SelectItem>
                  <SelectItem value="Mati">Mati</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Warna</Label>
              <Input
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="Hitam, Putih, dll"
              />
            </div>
            <div className="space-y-2">
              <Label>Kapasitas Mesin</Label>
              <Input
                value={formData.engineCapacity}
                onChange={(e) => setFormData({ ...formData, engineCapacity: e.target.value })}
                placeholder="1500cc, 2000cc, dll"
              />
            </div>
            <div className="space-y-2">
              <Label>Lokasi</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Jakarta, Surabaya, dll"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Deskripsi</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Deskripsi kondisi kendaraan..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFormDialog(false)}>
              Batal
            </Button>
            <Button className="bg-navy hover:bg-navy-light" onClick={handleSave}>
              {editingCar ? "Simpan Perubahan" : "Tambah Kendaraan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
