"use client"

import { useState } from "react"
import { Search, Shield, CheckCircle, XCircle, Clock, Eye, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { dummyKYC, dummyUsers } from "@/lib/dummy-data"
import Image from "next/image"

export default function AdminKYCPage() {
  const { toast } = useToast()
  const [kycData, setKycData] = useState(dummyKYC)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKyc, setSelectedKyc] = useState<any>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  const filteredKyc = kycData.filter(kyc => {
    const user = dummyUsers.find(u => u.id === kyc.userId)
    return user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           kyc.ktpNumber.includes(searchTerm)
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
    }
    return variants[status as keyof typeof variants] || variants.PENDING
  }

  const handleApprove = (kycId: string) => {
    setKycData(kycData.map(kyc => 
      kyc.id === kycId 
        ? { ...kyc, status: "APPROVED", approvedAt: new Date(), approvedBy: "user-1" }
        : kyc
    ))
    toast({
      title: "KYC Disetujui",
      description: "Verifikasi KYC berhasil disetujui. Bonus Rp 1.000.000 telah dikirim.",
    })
  }

  const handleReject = (kycId: string) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Alasan Diperlukan",
        description: "Silakan masukkan alasan penolakan",
        variant: "destructive",
      })
      return
    }

    setKycData(kycData.map(kyc => 
      kyc.id === kycId 
        ? { ...kyc, status: "REJECTED", rejectedReason: rejectionReason }
        : kyc
    ))
    setRejectionReason("")
    setSelectedKyc(null)
    toast({
      title: "KYC Ditolak",
      description: "Verifikasi KYC telah ditolak dengan alasan yang diberikan.",
    })
  }

  const pendingCount = kycData.filter(k => k.status === "PENDING").length
  const approvedCount = kycData.filter(k => k.status === "APPROVED").length
  const rejectedCount = kycData.filter(k => k.status === "REJECTED").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text-2025">Verifikasi KYC</h1>
          <p className="text-muted-foreground">Kelola verifikasi identitas pengguna</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{kycData.length}</p>
                <p className="text-sm text-muted-foreground">Total Pengajuan</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Menunggu Review</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">Disetujui</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                <p className="text-sm text-muted-foreground">Ditolak</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Daftar Pengajuan KYC ({filteredKyc.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari pengajuan..."
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
                <TableHead>No. KTP</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Pengajuan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKyc.map((kyc) => (
                <TableRow key={kyc.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{getUserName(kyc.userId)}</p>
                      <p className="text-sm text-muted-foreground">{getUserEmail(kyc.userId)}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{kyc.ktpNumber}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(kyc.status)}>
                      {kyc.status === "PENDING" && <Clock className="h-3 w-3 mr-1" />}
                      {kyc.status === "APPROVED" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {kyc.status === "REJECTED" && <XCircle className="h-3 w-3 mr-1" />}
                      {kyc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{kyc.createdAt.toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedKyc(kyc)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Review KYC - {getUserName(kyc.userId)}</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium">Foto KTP</Label>
                                <div className="mt-2 border rounded-lg overflow-hidden">
                                  <Image
                                    src={kyc.ktpImageUrl}
                                    alt="KTP"
                                    width={400}
                                    height={250}
                                    className="w-full h-auto"
                                  />
                                </div>
                                <Button variant="outline" size="sm" className="mt-2">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium">Foto Selfie dengan KTP</Label>
                                <div className="mt-2 border rounded-lg overflow-hidden">
                                  <Image
                                    src={kyc.selfieImageUrl}
                                    alt="Selfie"
                                    width={400}
                                    height={250}
                                    className="w-full h-auto"
                                  />
                                </div>
                                <Button variant="outline" size="sm" className="mt-2">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4 mt-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Nama Lengkap</Label>
                                <p className="text-sm font-medium">{getUserName(kyc.userId)}</p>
                              </div>
                              <div>
                                <Label>Email</Label>
                                <p className="text-sm font-medium">{getUserEmail(kyc.userId)}</p>
                              </div>
                              <div>
                                <Label>No. KTP</Label>
                                <p className="text-sm font-mono">{kyc.ktpNumber}</p>
                              </div>
                              <div>
                                <Label>Status</Label>
                                <Badge className={getStatusBadge(kyc.status)}>
                                  {kyc.status}
                                </Badge>
                              </div>
                            </div>

                            {kyc.status === "PENDING" && (
                              <div className="space-y-4 pt-4 border-t">
                                <div className="space-y-2">
                                  <Label>Alasan Penolakan (jika ditolak)</Label>
                                  <Textarea
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="Masukkan alasan jika KYC ditolak..."
                                    rows={3}
                                  />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleReject(kyc.id)}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Tolak
                                  </Button>
                                  <Button 
                                    onClick={() => handleApprove(kyc.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Setujui
                                  </Button>
                                </div>
                              </div>
                            )}

                            {kyc.status === "REJECTED" && kyc.rejectedReason && (
                              <div className="p-4 bg-red-50 rounded-lg">
                                <Label className="text-red-800">Alasan Penolakan:</Label>
                                <p className="text-sm text-red-700 mt-1">{kyc.rejectedReason}</p>
                              </div>
                            )}

                            {kyc.status === "APPROVED" && (
                              <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-green-800 font-medium">✅ KYC Disetujui</p>
                                <p className="text-sm text-green-700">
                                  Disetujui pada: {kyc.approvedAt?.toLocaleDateString('id-ID')}
                                </p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
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