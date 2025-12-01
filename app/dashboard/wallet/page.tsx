"use client"

import type React from "react"

import { useState } from "react"
import { Wallet, Plus, Minus, ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuthStore } from "@/lib/store"
import { formatRupiah, formatDateTime, getStatusColor, getStatusText } from "@/lib/utils/format"
import { dummyTransactions } from "@/lib/dummy-data"
import { DepositForm } from "@/components/wallet/deposit-form"
import { WithdrawForm } from "@/components/wallet/withdraw-form"
import { cn } from "@/lib/utils"

export default function WalletPage() {
  const { wallet, user } = useAuthStore()
  const [showDepositDialog, setShowDepositDialog] = useState(false)
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)

  const transactions = dummyTransactions.filter((t) => t.userId === user?.id)
  const pendingDeposits = transactions.filter((t) => t.type === "DEPOSIT" && t.status === "PENDING")
  const pendingWithdraws = transactions.filter((t) => t.type === "WITHDRAW" && t.status === "PENDING")

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return <ArrowDownLeft className="h-4 w-4 text-success" />
      case "WITHDRAW":
        return <ArrowUpRight className="h-4 w-4 text-destructive" />
      case "BONUS":
        return <Plus className="h-4 w-4 text-gold" />
      case "BID_HOLD":
        return <Clock className="h-4 w-4 text-warning" />
      case "BID_REFUND":
        return <ArrowDownLeft className="h-4 w-4 text-success" />
      default:
        return <Wallet className="h-4 w-4" />
    }
  }

  const getTransactionLabel = (type: string) => {
    const labels: Record<string, string> = {
      DEPOSIT: "Deposit",
      WITHDRAW: "Penarikan",
      BONUS: "Bonus KYC",
      BID_HOLD: "Hold Bid",
      BID_REFUND: "Refund Bid",
      AUCTION_WIN: "Menang Lelang",
    }
    return labels[type] || type
  }

  return (
    <div className="space-y-6">
      <div className="reveal">
        <h1 className="text-2xl font-bold gradient-text-2025">Wallet Saya</h1>
        <p className="text-muted-foreground">Kelola saldo dan transaksi Anda</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-navy text-white glass-2025 card-3d glow-pulse hover:scale-105 transition-all stagger-item">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="h-8 w-8" />
              <Badge className="bg-white/20 text-white">Saldo Tersedia</Badge>
            </div>
            <p className="text-3xl font-bold">{formatRupiah(wallet?.balance || 0)}</p>
            <p className="text-sm text-white/70 mt-1">Dapat digunakan untuk bid</p>
          </CardContent>
        </Card>

        <Card className="glass-2025 card-3d hover:scale-105 transition-all stagger-item">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-warning neon-glow" />
              <Badge className="bg-warning/20 text-warning">Ditahan</Badge>
            </div>
            <p className="text-3xl font-bold">{formatRupiah(wallet?.holdBalance || 0)}</p>
            <p className="text-sm text-muted-foreground mt-1">Saldo sedang di-hold untuk bid</p>
          </CardContent>
        </Card>

        <Card className="glass-2025 card-3d hover:scale-105 transition-all stagger-item">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="h-8 w-8 text-muted-foreground" />
              <Badge className="bg-muted">Total</Badge>
            </div>
            <p className="text-3xl font-bold">{formatRupiah((wallet?.balance || 0) + (wallet?.holdBalance || 0))}</p>
            <p className="text-sm text-muted-foreground mt-1">Total saldo keseluruhan</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
          <DialogTrigger asChild>
            <Button className="flex-1 bg-navy hover:bg-navy-light gap-2 btn-magnetic ripple neon-glow">
              <Plus className="h-4 w-4" />
              Deposit Saldo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Deposit Saldo</DialogTitle>
              <DialogDescription>Transfer ke rekening kami dan upload bukti transfer</DialogDescription>
            </DialogHeader>
            <DepositForm onSuccess={() => setShowDepositDialog(false)} />
          </DialogContent>
        </Dialog>

        <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1 gap-2 bg-transparent btn-magnetic ripple">
              <Minus className="h-4 w-4" />
              Tarik Saldo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tarik Saldo</DialogTitle>
              <DialogDescription>Minta penarikan saldo ke rekening bank Anda</DialogDescription>
            </DialogHeader>
            <WithdrawForm onSuccess={() => setShowWithdrawDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Pending Requests Warning */}
      {(pendingDeposits.length > 0 || pendingWithdraws.length > 0) && (
        <Card className="border-warning bg-warning/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="font-medium">Ada transaksi yang menunggu diproses</p>
                <p className="text-sm text-muted-foreground">
                  {pendingDeposits.length > 0 && `${pendingDeposits.length} deposit`}
                  {pendingDeposits.length > 0 && pendingWithdraws.length > 0 && " dan "}
                  {pendingWithdraws.length > 0 && `${pendingWithdraws.length} penarikan`} sedang menunggu konfirmasi
                  admin.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
          <CardDescription>Semua aktivitas wallet Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdraw">Penarikan</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <TransactionList
                transactions={transactions}
                getIcon={getTransactionIcon}
                getLabel={getTransactionLabel}
              />
            </TabsContent>
            <TabsContent value="deposit">
              <TransactionList
                transactions={transactions.filter((t) => t.type === "DEPOSIT" || t.type === "BONUS")}
                getIcon={getTransactionIcon}
                getLabel={getTransactionLabel}
              />
            </TabsContent>
            <TabsContent value="withdraw">
              <TransactionList
                transactions={transactions.filter((t) => t.type === "WITHDRAW")}
                getIcon={getTransactionIcon}
                getLabel={getTransactionLabel}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function TransactionList({
  transactions,
  getIcon,
  getLabel,
}: {
  transactions: typeof dummyTransactions
  getIcon: (type: string) => React.ReactNode
  getLabel: (type: string) => string
}) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">Belum ada transaksi</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
              {getIcon(transaction.type)}
            </div>
            <div>
              <p className="font-medium">{getLabel(transaction.type)}</p>
              <p className="text-sm text-muted-foreground">
                {formatDateTime(transaction.createdAt)}
                {transaction.bankName && ` • ${transaction.bankName}`}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={cn(
                "font-semibold",
                transaction.type === "WITHDRAW" || transaction.type === "BID_HOLD"
                  ? "text-destructive"
                  : "text-success",
              )}
            >
              {transaction.type === "WITHDRAW" || transaction.type === "BID_HOLD" ? "-" : "+"}
              {formatRupiah(transaction.amount)}
            </p>
            <Badge className={cn("text-xs", getStatusColor(transaction.status))}>
              {getStatusText(transaction.status)}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
