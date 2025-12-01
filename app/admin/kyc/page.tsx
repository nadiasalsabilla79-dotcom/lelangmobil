"use client"

import { useState } from "react"
import Image from "next/image"
import { ShieldCheck, Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { dummyKYC, dummyUsers } from "@/lib/dummy-data"
import { formatDateTime, getStatusColor, getStatusText } from "@/lib/utils/format"

export default function AdminKYCPage() {
  const { toast } = useToast()
  const [kycList, setKycList] = useState(dummyKYC)
  const [selectedKYC, setSelectedKYC] = useState<(typeof dummyKYC)[0] | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const pendingKYC = kycList.filter((k) => k.status === "PENDING")
  const approvedKYC = kycList.filter((k) => k.status === "APPROVED")
  const rejectedKYC = kycList.filter((k) => k.status === "REJECTED")

  const getUserName = (userId: string) => {
    return dummyUsers.find((u) => u.id === userId)?.name || "Unknown"
  }

  const getUserEmail = (userId: string) => {
    return dummyUsers.find((u) => u.id === userId)?.email || "Unknown"
  }

  const handleApprove = async (kyc: (typeof dummyKYC)[0]) => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update KYC status
    setKycList(
      kycList.map((k) =>
        k.id === kyc.id ? { ...k, status: "APPROVED" as const, approvedAt: new Date(), approvedBy: "admin-1" } : k,
      ),
    )

    // PENTING: Bonus Rp 1.000.000 diberikan di sini setelah admin approve
    toast({
      title: "KYC Disetujui",
      description: `KYC ${getUserName(kyc.userId)} berhasil disetujui. Bonus Rp 1.000.000 telah ditambahkan ke wallet.`,
    })

    setIsProcessing(false)
    setShowDetailDialog(false)
    setSelectedKYC(null)
  }

  const handleReject = async (kyc: (typeof dummyKYC)[0]) => {
    if (!rejectReason) {
      toast({
        title: "Error",
        description: "Mohon berikan alasan penolakan",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setKycList(
      kycList.map((k) => (k.id === kyc.id ? { ...k, status: "REJECTED" as const, rejectionReason: rejectReason } : k)),
    )

    toast({
      title: "KYC Ditolak",
      description: `KYC ${getUserName(kyc.userId)} telah ditolak.`,
    })

    setIsProcessing(false)
    setShowDetailDialog(false)
    setSelectedKYC(null)
    setRejectReason("")
  }

  const KYCTable = ({ data }: { data: typeof dummyKYC }) => (
    <div className="space-y-3">
      {data.length === 0 ? (
        <div className="text-center py-8">
          <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Tidak ada data</p>
        </div>
      ) : (
        data.map((kyc) => (
          <div
            key={kyc.id}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                <Image src={kyc.selfieImageUrl || "/placeholder.svg"} alt="Selfie" fill className="object-cover" />
              </div>
              <div>
                <p className="font-medium">{getUserName(kyc.userId)}</p>
                <p className="text-sm text-muted-foreground">{getUserEmail(kyc.userId)}</p>
                <p className="text-xs text-muted-foreground">NIK: {kyc.ktpNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <Badge className={getStatusColor(kyc.status)}>{getStatusText(kyc.status)}</Badge>
                <p className="text-xs text-muted-foreground mt-1">{formatDateTime(kyc.createdAt)}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedKYC(kyc)
                  setShowDetailDialog(true)
                }}
              >
                <Eye className="h-4 w-4 mr-1" />
                Detail
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">KYC Manager</h1>
          <p className="text-muted-foreground">Verifikasi identitas pengguna</p>
        </div>
        {pendingKYC.length > 0 && (
          <Badge className="bg-warning text-warning-foreground">{pendingKYC.length} Menunggu</Badge>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending" className="gap-2">
                <Clock className="h-4 w-4" />
                Menunggu ({pendingKYC.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Disetujui ({approvedKYC.length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="gap-2">
                <XCircle className="h-4 w-4" />
                Ditolak ({rejectedKYC.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <KYCTable data={pendingKYC} />
            </TabsContent>
            <TabsContent value="approved">
              <KYCTable data={approvedKYC} />
            </TabsContent>
            <TabsContent value="rejected">
              <KYCTable data={rejectedKYC} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail KYC</DialogTitle>
            <DialogDescription>Review dokumen verifikasi pengguna</DialogDescription>
          </DialogHeader>

          {selectedKYC && (
            <div className="space-y-6">
              {/* User Info */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Nama</p>
                    <p className="font-medium">{getUserName(selectedKYC.userId)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{getUserEmail(selectedKYC.userId)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">NIK</p>
                    <p className="font-medium font-mono">{selectedKYC.ktpNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tanggal Submit</p>
                    <p className="font-medium">{formatDateTime(selectedKYC.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Foto KTP</p>
                  <div className="relative aspect-[3/2] rounded-lg overflow-hidden border">
                    <Image
                      src={selectedKYC.ktpImageUrl || "/placeholder.svg"}
                      alt="KTP"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Selfie dengan KTP</p>
                  <div className="relative aspect-[3/2] rounded-lg overflow-hidden border">
                    <Image
                      src={selectedKYC.selfieImageUrl || "/placeholder.svg"}
                      alt="Selfie"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(selectedKYC.status)}>{getStatusText(selectedKYC.status)}</Badge>
              </div>

              {/* Actions for Pending */}
              {selectedKYC.status === "PENDING" && (
                <div className="space-y-4 border-t pt-4">
                  <div className="p-4 bg-warning/10 rounded-lg text-sm">
                    <p className="font-medium text-warning-foreground mb-1">Penting!</p>
                    <p className="text-muted-foreground">
                      Jika KYC disetujui, sistem akan otomatis menambahkan bonus Rp 1.000.000 ke wallet pengguna.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Alasan Penolakan (jika ditolak)</label>
                    <Textarea
                      placeholder="Masukkan alasan penolakan..."
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-success hover:bg-success/90"
                      onClick={() => handleApprove(selectedKYC)}
                      disabled={isProcessing}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Setujui KYC
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleReject(selectedKYC)}
                      disabled={isProcessing}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Tolak KYC
                    </Button>
                  </div>
                </div>
              )}

              {/* Rejection Reason */}
              {selectedKYC.status === "REJECTED" && selectedKYC.rejectionReason && (
                <div className="p-4 bg-destructive/10 rounded-lg">
                  <p className="text-sm font-medium text-destructive mb-1">Alasan Penolakan:</p>
                  <p className="text-sm text-muted-foreground">{selectedKYC.rejectionReason}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
