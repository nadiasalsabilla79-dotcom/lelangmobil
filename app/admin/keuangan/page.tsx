"use client"

import { useState } from "react"
import Image from "next/image"
import { Wallet, ArrowDownLeft, ArrowUpRight, Eye, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { dummyTransactions, dummyUsers } from "@/lib/dummy-data"
import { formatRupiah, formatDateTime, getStatusColor, getStatusText } from "@/lib/utils/format"
import { cn } from "@/lib/utils"

export default function AdminKeuanganPage() {
  const { toast } = useToast()
  const [transactions, setTransactions] = useState(dummyTransactions)
  const [selectedTransaction, setSelectedTransaction] = useState<(typeof dummyTransactions)[0] | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [rejectNotes, setRejectNotes] = useState("")

  const deposits = transactions.filter((t) => t.type === "DEPOSIT")
  const withdrawals = transactions.filter((t) => t.type === "WITHDRAW")
  const pendingDeposits = deposits.filter((d) => d.status === "PENDING")
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "PENDING")

  const totalPendingDeposit = pendingDeposits.reduce((sum, d) => sum + d.amount, 0)
  const totalPendingWithdraw = pendingWithdrawals.reduce((sum, w) => sum + w.amount, 0)

  const getUserName = (userId: string) => {
    return dummyUsers.find((u) => u.id === userId)?.name || "Unknown"
  }

  const handleApproveDeposit = async (trx: (typeof dummyTransactions)[0]) => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setTransactions(
      transactions.map((t) =>
        t.id === trx.id ? { ...t, status: "COMPLETED" as const, processedAt: new Date(), processedBy: "admin-1" } : t,
      ),
    )

    toast({
      title: "Deposit Disetujui",
      description: `Deposit ${formatRupiah(trx.amount)} dari ${getUserName(trx.userId)} telah dikonfirmasi. Saldo pengguna telah diupdate.`,
    })

    setIsProcessing(false)
    setShowDetailDialog(false)
  }

  const handleRejectDeposit = async (trx: (typeof dummyTransactions)[0]) => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setTransactions(
      transactions.map((t) => (t.id === trx.id ? { ...t, status: "REJECTED" as const, notes: rejectNotes } : t)),
    )

    toast({
      title: "Deposit Ditolak",
      description: `Deposit dari ${getUserName(trx.userId)} telah ditolak.`,
    })

    setIsProcessing(false)
    setShowDetailDialog(false)
    setRejectNotes("")
  }

  const handleCompleteWithdraw = async (trx: (typeof dummyTransactions)[0]) => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setTransactions(
      transactions.map((t) =>
        t.id === trx.id ? { ...t, status: "COMPLETED" as const, processedAt: new Date(), processedBy: "admin-1" } : t,
      ),
    )

    toast({
      title: "Penarikan Selesai",
      description: `Penarikan ${formatRupiah(trx.amount)} ke ${getUserName(trx.userId)} telah ditandai selesai.`,
    })

    setIsProcessing(false)
    setShowDetailDialog(false)
  }

  const TransactionTable = ({ data, type }: { data: typeof dummyTransactions; type: "DEPOSIT" | "WITHDRAW" }) => (
    <div className="space-y-3">
      {data.length === 0 ? (
        <div className="text-center py-8">
          <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Tidak ada transaksi</p>
        </div>
      ) : (
        data.map((trx) => (
          <div
            key={trx.id}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center",
                  type === "DEPOSIT" ? "bg-success/20" : "bg-destructive/20",
                )}
              >
                {type === "DEPOSIT" ? (
                  <ArrowDownLeft className="h-5 w-5 text-success" />
                ) : (
                  <ArrowUpRight className="h-5 w-5 text-destructive" />
                )}
              </div>
              <div>
                <p className="font-medium">{getUserName(trx.userId)}</p>
                <p className="text-sm text-muted-foreground">
                  {trx.bankName} {trx.bankAccountNumber && `• ${trx.bankAccountNumber}`}
                </p>
                <p className="text-xs text-muted-foreground">{formatDateTime(trx.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className={cn("font-bold", type === "DEPOSIT" ? "text-success" : "text-destructive")}>
                  {type === "DEPOSIT" ? "+" : "-"}
                  {formatRupiah(trx.amount)}
                </p>
                <Badge className={getStatusColor(trx.status)}>{getStatusText(trx.status)}</Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedTransaction(trx)
                  setShowDetailDialog(true)
                }}
              >
                <Eye className="h-4 w-4" />
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
          <h1 className="text-2xl font-bold">Keuangan</h1>
          <p className="text-muted-foreground">Kelola deposit dan penarikan pengguna</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                <ArrowDownLeft className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deposit Menunggu</p>
                <p className="text-xl font-bold">{pendingDeposits.length}</p>
                <p className="text-sm text-success">{formatRupiah(totalPendingDeposit)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <ArrowUpRight className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Withdraw Menunggu</p>
                <p className="text-xl font-bold">{pendingWithdrawals.length}</p>
                <p className="text-sm text-destructive">{formatRupiah(totalPendingWithdraw)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-navy/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-navy" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Deposit</p>
                <p className="text-xl font-bold">{deposits.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Wallet className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Withdraw</p>
                <p className="text-xl font-bold">{withdrawals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="deposits">
            <TabsList className="mb-4">
              <TabsTrigger value="deposits" className="gap-2">
                <ArrowDownLeft className="h-4 w-4" />
                Deposit ({deposits.length})
              </TabsTrigger>
              <TabsTrigger value="withdrawals" className="gap-2">
                <ArrowUpRight className="h-4 w-4" />
                Penarikan ({withdrawals.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deposits">
              <TransactionTable data={deposits} type="DEPOSIT" />
            </TabsContent>
            <TabsContent value="withdrawals">
              <TransactionTable data={withdrawals} type="WITHDRAW" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail {selectedTransaction?.type === "DEPOSIT" ? "Deposit" : "Penarikan"}</DialogTitle>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-6">
              {/* Amount */}
              <div className="text-center py-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Jumlah</p>
                <p
                  className={cn(
                    "text-3xl font-bold",
                    selectedTransaction.type === "DEPOSIT" ? "text-success" : "text-destructive",
                  )}
                >
                  {formatRupiah(selectedTransaction.amount)}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pengguna</span>
                  <span className="font-medium">{getUserName(selectedTransaction.userId)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank</span>
                  <span className="font-medium">{selectedTransaction.bankName}</span>
                </div>
                {selectedTransaction.bankAccountNumber && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">No. Rekening</span>
                    <span className="font-medium font-mono">{selectedTransaction.bankAccountNumber}</span>
                  </div>
                )}
                {selectedTransaction.bankAccountName && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Atas Nama</span>
                    <span className="font-medium">{selectedTransaction.bankAccountName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tanggal</span>
                  <span className="font-medium">{formatDateTime(selectedTransaction.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className={getStatusColor(selectedTransaction.status)}>
                    {getStatusText(selectedTransaction.status)}
                  </Badge>
                </div>
              </div>

              {/* Proof Image for Deposit */}
              {selectedTransaction.type === "DEPOSIT" && selectedTransaction.proofImageUrl && (
                <div>
                  <p className="text-sm font-medium mb-2">Bukti Transfer</p>
                  <div className="relative aspect-[3/4] max-h-64 mx-auto rounded-lg overflow-hidden border">
                    <Image
                      src={selectedTransaction.proofImageUrl || "/placeholder.svg"}
                      alt="Bukti Transfer"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Actions for Pending */}
              {selectedTransaction.status === "PENDING" && (
                <div className="space-y-4 border-t pt-4">
                  {selectedTransaction.type === "DEPOSIT" ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Catatan Penolakan (opsional)</label>
                        <Textarea
                          placeholder="Masukkan alasan penolakan..."
                          value={rejectNotes}
                          onChange={(e) => setRejectNotes(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button
                          className="flex-1 bg-success hover:bg-success/90"
                          onClick={() => handleApproveDeposit(selectedTransaction)}
                          disabled={isProcessing}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Konfirmasi Deposit
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1"
                          onClick={() => handleRejectDeposit(selectedTransaction)}
                          disabled={isProcessing}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Tolak
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button
                      className="w-full bg-success hover:bg-success/90"
                      onClick={() => handleCompleteWithdraw(selectedTransaction)}
                      disabled={isProcessing}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Tandai Sudah Ditransfer
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
