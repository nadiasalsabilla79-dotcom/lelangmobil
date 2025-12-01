"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye, Car } from "lucide-react"
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
import { dummyCars } from "@/lib/dummy-data"

export default function AdminKendaraanPage() {
  const { toast } = useToast()
  const [cars, setCars] = useState(dummyCars)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    transmission: "",
    fuel: "",
    odometer: 0,
    location: "",
    grade: "A",
    description: "",
  })

  const filteredCars = cars.filter(car =>
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddCar = () => {
    const car = {
      id: `car-${Date.now()}`,
      ...newCar,
      images: ["/placeholder.jpg"],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setCars([...cars, car])
    setIsAddDialogOpen(false)
    setNewCar({
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      color: "",
      transmission: "",
      fuel: "",
      odometer: 0,
      location: "",
      grade: "A",
      description: "",
    })
    toast({
      title: "Kendaraan Ditambahkan",
      description: "Kendaraan baru berhasil ditambahkan ke database",
    })
  }

  const handleDeleteCar = (carId: string) => {
    setCars(cars.filter(car => car.id !== carId))
    toast({
      title: "Kendaraan Dihapus",
      description: "Kendaraan berhasil dihapus dari database",
    })
  }

  const getGradeBadge = (grade: string) => {
    const variants = {
      A: "bg-green-100 text-green-800",
      B: "bg-yellow-100 text-yellow-800",
      C: "bg-red-100 text-red-800",
    }
    return variants[grade as keyof typeof variants] || variants.A
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text-2025">Manajemen Kendaraan</h1>
          <p className="text-muted-foreground">Kelola data kendaraan untuk lelang</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-navy hover:bg-navy-light">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Kendaraan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Kendaraan Baru</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Merek</Label>
                <Select value={newCar.brand} onValueChange={(value) => setNewCar({...newCar, brand: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih merek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Toyota">Toyota</SelectItem>
                    <SelectItem value="Honda">Honda</SelectItem>
                    <SelectItem value="Mitsubishi">Mitsubishi</SelectItem>
                    <SelectItem value="Suzuki">Suzuki</SelectItem>
                    <SelectItem value="Daihatsu">Daihatsu</SelectItem>
                    <SelectItem value="Nissan">Nissan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Model</Label>
                <Input
                  value={newCar.model}
                  onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                  placeholder="Contoh: Avanza G"
                />
              </div>
              <div className="space-y-2">
                <Label>Tahun</Label>
                <Input
                  type="number"
                  value={newCar.year}
                  onChange={(e) => setNewCar({...newCar, year: parseInt(e.target.value)})}
                  min="2000"
                  max={new Date().getFullYear()}
                />
              </div>
              <div className="space-y-2">
                <Label>Warna</Label>
                <Input
                  value={newCar.color}
                  onChange={(e) => setNewCar({...newCar, color: e.target.value})}
                  placeholder="Contoh: Putih"
                />
              </div>
              <div className="space-y-2">
                <Label>Transmisi</Label>
                <Select value={newCar.transmission} onValueChange={(value) => setNewCar({...newCar, transmission: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih transmisi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AT">Automatic</SelectItem>
                    <SelectItem value="MT">Manual</SelectItem>
                    <SelectItem value="CVT">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Bahan Bakar</Label>
                <Select value={newCar.fuel} onValueChange={(value) => setNewCar({...newCar, fuel: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih bahan bakar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BENSIN">Bensin</SelectItem>
                    <SelectItem value="DIESEL">Diesel</SelectItem>
                    <SelectItem value="HYBRID">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Odometer (KM)</Label>
                <Input
                  type="number"
                  value={newCar.odometer}
                  onChange={(e) => setNewCar({...newCar, odometer: parseInt(e.target.value)})}
                  placeholder="Contoh: 25000"
                />
              </div>
              <div className="space-y-2">
                <Label>Lokasi</Label>
                <Input
                  value={newCar.location}
                  onChange={(e) => setNewCar({...newCar, location: e.target.value})}
                  placeholder="Contoh: Jakarta Selatan"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Grade</Label>
                <Select value={newCar.grade} onValueChange={(value) => setNewCar({...newCar, grade: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Grade A - Excellent</SelectItem>
                    <SelectItem value="B">Grade B - Good</SelectItem>
                    <SelectItem value="C">Grade C - Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Deskripsi</Label>
                <Textarea
                  value={newCar.description}
                  onChange={(e) => setNewCar({...newCar, description: e.target.value})}
                  placeholder="Deskripsi detail kendaraan..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddCar}>
                Tambah Kendaraan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Daftar Kendaraan ({filteredCars.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari kendaraan..."
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
                <TableHead>Tahun</TableHead>
                <TableHead>Odometer</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{car.brand} {car.model}</p>
                      <p className="text-sm text-muted-foreground">{car.color} • {car.transmission}</p>
                    </div>
                  </TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>{car.odometer.toLocaleString()} KM</TableCell>
                  <TableCell>{car.location}</TableCell>
                  <TableCell>
                    <Badge className={getGradeBadge(car.grade)}>
                      Grade {car.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Available</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteCar(car.id)}
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