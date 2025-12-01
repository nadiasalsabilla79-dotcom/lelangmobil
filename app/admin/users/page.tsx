"use client"

import { useState } from "react"
import { Search, Users, Shield, Mail, Phone, Calendar, CheckCircle, XCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { dummyUsers, dummyWallets } from "@/lib/dummy-data"
import { formatRupiah } from "@/lib/utils/format"

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState(dummyUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getUserWallet = (userId: string) => {
    return dummyWallets.find(w => w.userId === userId)
  }

  const getRoleBadge = (role: string) => {
    return role === "ADMIN" 
      ? "bg-purple-100 text-purple-800" 
      : "bg-blue-100 text-blue-800"
  }

  const getVerificationBadge = (verified: boolean) => {
    return verified
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800"
  }

  const handleToggleVerification = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, emailVerified: !user.emailVerified }
        : user
    ))
    toast({
      title: "Status Verifikasi Diubah",
      description: "Status verifikasi email pengguna berhasil diubah",
    })
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
    toast({
      title: "Pengguna Dihapus",
      description: "Pengguna berhasil dihapus dari sistem",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text-2025">Manajemen Pengguna</h1>
          <p className="text-muted-foreground">Kelola pengguna dan verifikasi akun</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-muted-foreground">Total Pengguna</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.emailVerified).length}</p>
                <p className="text-sm text-muted-foreground">Email Terverifikasi</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{users.filter(u => !u.emailVerified).length}</p>
                <p className="text-sm text-muted-foreground">Belum Verifikasi</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.role === "ADMIN").length}</p>
                <p className="text-sm text-muted-foreground">Administrator</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Daftar Pengguna ({filteredUsers.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari pengguna..."
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
                <TableHead>Pengguna</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email Verified</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Bergabung</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const wallet = getUserWallet(user.id)
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadge(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getVerificationBadge(user.emailVerified)}>
                        {user.emailVerified ? (
                          <><CheckCircle className="h-3 w-3 mr-1" /> Verified</>
                        ) : (
                          <><XCircle className="h-3 w-3 mr-1" /> Unverified</>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {wallet ? formatRupiah(wallet.balance) : "Rp 0"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {user.createdAt.toLocaleDateString('id-ID')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleVerification(user.id)}
                        >
                          {user.emailVerified ? "Unverify" : "Verify"}
                        </Button>
                        {user.role !== "ADMIN" && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Hapus
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}