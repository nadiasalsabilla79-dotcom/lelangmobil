"use client"

import { useState } from "react"
import { Search, Wallet, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, Eye, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { dummyTransactions, dummyUsers } from "@/lib/dummy-data"
import { formatRupiah } from "@/lib/utils/format"
import Image from "next/image"

export default function AdminKeuanganPage() {
  const { toast } = useToast()
  const [transactions, setTransactions] = useState(dummyTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [adminNotes, setAdminNotes] = useState("")

  const filteredTransactions = transactions.filter(trx => {
    const user = dummyUsers.find(u => u.id === trx.userId)
    return user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           trx.type.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const getUserName = (userId: string) => {
    return dummyUsers.find(u => u.id === userId)?.name || "Unknown"
  }

  const getUserEmail = (userId: string) => {
    return dummyUsers.find(u => u.id === userId)?.email || "Unknown"
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
      COMPLETED: "bg-blue-100 text-blue-800",
    }
    return variants[status as keyof typeof variants] || variants.PENDING
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      DEPOSIT: "bg-green-100 text-green-800",
      WITHDRAW: "bg-red-100 text-red-800",
      BONUS: "bg-purple-100 text-purple-800",
      BID_HOLD: "bg-orange-100 text-orange-800",
      BID_RELEASE: "bg-blue-100 text-blue-800",
      BID_WIN: "bg-yellow-100 text-yellow-800",
    }
    return variants[type as keyof typeof variants] || variants.DEPOSIT
  }

  const handleApprove = (transactionId: string) => {
    setTransactions(transactions.map(trx => 
      trx.id === transactionId 
        ? { ...trx, status: "COMPLETED", processedAt: new Date(), processedBy: "user-1", adminNotes }
        : trx
    ))
    setAdminNotes("")
    setSelectedTransaction(null)
    toast({
      title: "Transaksi Disetujui",
      description: "Transaksi berhasil disetujui dan diproses",
    })
  }

  const handleReject = (transactionId: string) => {
    if (!adminNotes.trim()) {
      toast({
        title: "Catatan Diperlukan",
        description: "Silakan masukkan catatan penolakan",
        variant: "destructive",
      })
      return
    }

    setTransactions(transactions.map(trx => 
      trx.id === transactionId 
        ? { ...trx, status: "REJECTED", processedAt: new Date(), processedBy: "user-1", adminNotes }
        : trx
    ))
    setAdminNotes("")
    setSelectedTransaction(null)
    toast({
      title: "Transaksi Ditolak",
      description: "Transaksi telah ditolak dengan catatan yang diberikan",
    })
  }

  const pendingTransactions = transactions.filter(t => t.status === "PENDING")
  const completedTransactions = transactions.filter(t => t.status === "COMPLETED")
  const totalDeposits = transactions.filter(t => t.type === "DEPOSIT" && t.status === "COMPLETED")
    .reduce((sum, t) => sum + Number(t.amount), 0)
  const totalWithdraws = transactions.filter(t => t.type === "WITHDRAW" && t.status === "COMPLETED")
    .reduce((sum, t) => sum + Number(t.amount), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text-2025">Manajemen Keuangan</h1>
          <p className="text-muted-foreground">Kelola transaksi deposit dan withdraw</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">{pendingTransactions.length}</p>
                <p className="text-sm text-muted-foreground">Menunggu Approval</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{formatRupiah(totalDeposits)}</p>
                <p className="text-sm text-muted-foreground">Total Deposit</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{formatRupiah(totalWithdraws)}</p>
                <p className="text-sm text-muted-foreground">Total Withdraw</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{completedTransactions.length}</p>
                <p className="text-sm text-muted-foreground">Transaksi Selesai</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Daftar Transaksi ({filteredTransactions.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending">Menunggu ({pendingTransactions.length})</TabsTrigger>
              <TabsTrigger value="all">Semua ({filteredTransactions.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pengguna</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingTransactions.filter(trx => {
                    const user = dummyUsers.find(u => u.id === trx.userId)
                    return user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trx.type.toLowerCase().includes(searchTerm.toLowerCase())
                  }).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{getUserName(transaction.userId)}</p>
                          <p className="text-sm text-muted-foreground">{getUserEmail(transaction.userId)}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeBadge(transaction.type)}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{formatRupiah(transaction.amount)}</TableCell>
                      <TableCell>{transaction.bankName || "-"}</TableCell>
                      <TableCell>{transaction.createdAt.toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(transaction.status)}>
                          <Clock className="h-3 w-3 mr-1" />
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedTransaction(transaction)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Review Transaksi - {getUserName(transaction.userId)}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Pengguna</Label>
                                  <p className="font-medium">{getUserName(transaction.userId)}</p>
                                  <p className="text-sm text-muted-foreground">{getUserEmail(transaction.userId)}</p>
                                </div>
                                <div>
                                  <Label>Tipe Transaksi</Label>
                                  <Badge className={getTypeBadge(transaction.type)}>
                                    {transaction.type}
                                  </Badge>
                                </div>
                                <div>
                                  <Label>Jumlah</Label>
                                  <p className="font-mono text-lg">{formatRupiah(transaction.amount)}</p>
                                </div>
                                <div>
                                  <Label>Bank</Label>
                                  <p className="font-medium">{transaction.bankName || "-"}</p>
                                </div>
                                {transaction.accountNumber && (
                                  <div>
                                    <Label>No. Rekening</Label>
                                    <p className="font-mono">{transaction.accountNumber}</p>
                                  </div>
                                )}
                                {transaction.accountName && (
                                  <div>
                                    <Label>Nama Rekening</Label>
                                    <p className="font-medium">{transaction.accountName}</p>
                                  </div>
                                )}
                              </div>

                              {transaction.notes && (
                                <div>
                                  <Label>Catatan Pengguna</Label>
                                  <p className="text-sm bg-gray-50 p-3 rounded">{transaction.notes}</p>
                                </div>
                              )}

                              {transaction.proofImageUrl && (
                                <div>
                                  <Label>Bukti Transfer</Label>
                                  <div className="mt-2 border rounded-lg overflow-hidden">
                                    <Image
                                      src={transaction.proofImageUrl}
                                      alt="Bukti Transfer"
                                      width={400}
                                      height={300}
                                      className="w-full h-auto"
                                    />
                                  </div>
                                  <Button variant="outline" size="sm" className="mt-2">
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              )}

                              <div className="space-y-2">
                                <Label>Catatan Admin</Label>
                                <Textarea
                                  value={adminNotes}
                                  onChange={(e) => setAdminNotes(e.target.value)}
                                  placeholder="Masukkan catatan untuk transaksi ini..."
                                  rows={3}
                                />
                              </div>

                              <div className="flex justify-end gap-2 pt-4 border-t">
                                <Button 
                                  variant="destructive"
                                  onClick={() => handleReject(transaction.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Tolak
                                </Button>
                                <Button 
                                  onClick={() => handleApprove(transaction.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Setujui
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pengguna</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{getUserName(transaction.userId)}</p>
                          <p className="text-sm text-muted-foreground">{getUserEmail(transaction.userId)}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeBadge(transaction.type)}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{formatRupiah(transaction.amount)}</TableCell>
                      <TableCell>{transaction.bankName || "-"}</TableCell>
                      <TableCell>{transaction.createdAt.toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(transaction.status)}>
                          {transaction.status === "PENDING" && <Clock className="h-3 w-3 mr-1" />}
                          {transaction.status === "COMPLETED" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {transaction.status === "REJECTED" && <XCircle className="h-3 w-3 mr-1" />}
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}