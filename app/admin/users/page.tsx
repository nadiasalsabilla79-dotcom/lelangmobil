"use client"

import { useState } from "react"
import { Users, Search, Shield, ShieldOff, Eye, MoreVertical, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils/format"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "USER" | "ADMIN"
  kycStatus: "PENDING" | "APPROVED" | "REJECTED" | "NOT_SUBMITTED"
  isActive: boolean
  balance: number
  heldBalance: number
  totalBids: number
  wonAuctions: number
  createdAt: Date
}

const dummyUsers: User[] = [
  {
    id: "user-1",
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "08123456789",
    role: "USER",
    kycStatus: "APPROVED",
    isActive: true,
    balance: 50000000,
    heldBalance: 10000000,
    totalBids: 25,
    wonAuctions: 3,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "user-2",
    name: "Siti Rahayu",
    email: "siti@email.com",
    phone: "08234567890",
    role: "USER",
    kycStatus: "PENDING",
    isActive: true,
    balance: 25000000,
    heldBalance: 0,
    totalBids: 10,
    wonAuctions: 1,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "user-3",
    name: "Admin Utama",
    email: "admin@lelangmobil.com",
    phone: "08000000000",
    role: "ADMIN",
    kycStatus: "APPROVED",
    isActive: true,
    balance: 0,
    heldBalance: 0,
    totalBids: 0,
    wonAuctions: 0,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "user-4",
    name: "Ahmad Hidayat",
    email: "ahmad@email.com",
    phone: "08345678901",
    role: "USER",
    kycStatus: "REJECTED",
    isActive: false,
    balance: 0,
    heldBalance: 0,
    totalBids: 0,
    wonAuctions: 0,
    createdAt: new Date("2024-03-10"),
  },
]

const kycStatusColors: Record<string, string> = {
  PENDING: "bg-warning/20 text-warning",
  APPROVED: "bg-success/20 text-success",
  REJECTED: "bg-destructive/20 text-destructive",
  NOT_SUBMITTED: "bg-muted text-muted-foreground",
}

const kycStatusLabels: Record<string, string> = {
  PENDING: "Menunggu",
  APPROVED: "Terverifikasi",
  REJECTED: "Ditolak",
  NOT_SUBMITTED: "Belum Submit",
}

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState(dummyUsers)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("ALL")
  const [kycFilter, setKycFilter] = useState<string>("ALL")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter
    const matchesKyc = kycFilter === "ALL" || user.kycStatus === kycFilter
    return matchesSearch && matchesRole && matchesKyc
  })

  const handleToggleActive = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u)))
    const user = users.find((u) => u.id === userId)
    toast({
      title: user?.isActive ? "User Dinonaktifkan" : "User Diaktifkan",
      description: `${user?.name} berhasil ${user?.isActive ? "dinonaktifkan" : "diaktifkan"}`,
    })
  }

  const handleMakeAdmin = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: u.role === "ADMIN" ? "USER" : "ADMIN" } : u)))
    const user = users.find((u) => u.id === userId)
    toast({
      title: "Role Diubah",
      description: `${user?.name} sekarang adalah ${user?.role === "ADMIN" ? "User biasa" : "Admin"}`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pengguna</h1>
        <p className="text-muted-foreground">Kelola semua pengguna platform</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari pengguna..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Semua Role</SelectItem>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
        <Select value={kycFilter} onValueChange={setKycFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="KYC Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Semua KYC</SelectItem>
            <SelectItem value="PENDING">Menunggu</SelectItem>
            <SelectItem value="APPROVED">Terverifikasi</SelectItem>
            <SelectItem value="REJECTED">Ditolak</SelectItem>
            <SelectItem value="NOT_SUBMITTED">Belum Submit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Pengguna</p>
            <p className="text-2xl font-bold">{users.filter((u) => u.role === "USER").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Admin</p>
            <p className="text-2xl font-bold">{users.filter((u) => u.role === "ADMIN").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">KYC Pending</p>
            <p className="text-2xl font-bold text-warning">{users.filter((u) => u.kycStatus === "PENDING").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Terverifikasi</p>
            <p className="text-2xl font-bold text-success">{users.filter((u) => u.kycStatus === "APPROVED").length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Tidak ada pengguna ditemukan</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/diverse-group-avatars.png?height=48&width=48&query=avatar ${user.name}`} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{user.name}</p>
                        {user.role === "ADMIN" && <Badge className="bg-navy text-white">Admin</Badge>}
                        <Badge className={kycStatusColors[user.kycStatus]}>{kycStatusLabels[user.kycStatus]}</Badge>
                        {!user.isActive && <Badge variant="destructive">Nonaktif</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Saldo: {formatCurrency(user.balance)} | Ditahan: {formatCurrency(user.heldBalance)}
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
                      <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Lihat Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMakeAdmin(user.id)}>
                        {user.role === "ADMIN" ? (
                          <>
                            <ShieldOff className="mr-2 h-4 w-4" />
                            Jadikan User
                          </>
                        ) : (
                          <>
                            <Shield className="mr-2 h-4 w-4" />
                            Jadikan Admin
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleActive(user.id)}>
                        {user.isActive ? (
                          <>
                            <XCircle className="mr-2 h-4 w-4" />
                            Nonaktifkan
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Aktifkan
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Pengguna</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={`/diverse-group-avatars.png?height=64&width=64&query=avatar ${selectedUser.name}`}
                  />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{selectedUser.name}</p>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Telepon</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bergabung</p>
                  <p className="font-medium">{selectedUser.createdAt.toLocaleDateString("id-ID")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Saldo Tersedia</p>
                  <p className="font-medium text-success">{formatCurrency(selectedUser.balance)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Saldo Ditahan</p>
                  <p className="font-medium text-warning">{formatCurrency(selectedUser.heldBalance)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Bid</p>
                  <p className="font-medium">{selectedUser.totalBids}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lelang Dimenangkan</p>
                  <p className="font-medium">{selectedUser.wonAuctions}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
