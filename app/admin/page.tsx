"use client"

import { Users, Wallet, ShieldCheck, Gavel, TrendingUp, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatRupiah } from "@/lib/utils/format"
import { dummyUsers, dummyKYC, dummyTransactions, dummyAuctions } from "@/lib/dummy-data"

export default function AdminDashboardPage() {
  const totalUsers = dummyUsers.filter((u) => u.role === "USER").length
  const pendingKYC = dummyKYC.filter((k) => k.status === "PENDING").length
  const pendingDeposits = dummyTransactions.filter((t) => t.type === "DEPOSIT" && t.status === "PENDING")
  const pendingWithdraws = dummyTransactions.filter((t) => t.type === "WITHDRAW" && t.status === "PENDING")
  const liveAuctions = dummyAuctions.filter((a) => a.status === "LIVE").length

  const totalPendingDeposit = pendingDeposits.reduce((sum, t) => sum + t.amount, 0)
  const totalSuccessDeposit = dummyTransactions
    .filter((t) => t.type === "DEPOSIT" && t.status === "COMPLETED")
    .reduce((sum, t) => sum + t.amount, 0)

  const stats = [
    {
      title: "Total Pengguna",
      value: totalUsers,
      icon: Users,
      color: "text-navy",
      bgColor: "bg-navy/10",
    },
    {
      title: "KYC Menunggu",
      value: pendingKYC,
      icon: ShieldCheck,
      color: "text-warning",
      bgColor: "bg-warning/10",
      alert: pendingKYC > 0,
    },
    {
      title: "Deposit Menunggu",
      value: pendingDeposits.length,
      icon: Wallet,
      color: "text-success",
      bgColor: "bg-success/10",
      subValue: formatRupiah(totalPendingDeposit),
      alert: pendingDeposits.length > 0,
    },
    {
      title: "Lelang Aktif",
      value: liveAuctions,
      icon: Gavel,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="reveal">
        <h1 className="text-2xl font-bold gradient-text-2025">Dashboard Admin</h1>
        <p className="text-muted-foreground">Selamat datang di Admin Panel LelangMobil</p>
      </div>

      {/* Alerts */}
      {(pendingKYC > 0 || pendingDeposits.length > 0 || pendingWithdraws.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pendingKYC > 0 && (
            <Card className="border-warning bg-warning/10">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-medium">{pendingKYC} KYC Menunggu</p>
                  <p className="text-sm text-muted-foreground">Perlu verifikasi</p>
                </div>
              </CardContent>
            </Card>
          )}
          {pendingDeposits.length > 0 && (
            <Card className="border-success bg-success/10">
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-success" />
                <div>
                  <p className="font-medium">{pendingDeposits.length} Deposit Menunggu</p>
                  <p className="text-sm text-muted-foreground">{formatRupiah(totalPendingDeposit)}</p>
                </div>
              </CardContent>
            </Card>
          )}
          {pendingWithdraws.length > 0 && (
            <Card className="border-destructive bg-destructive/10">
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium">{pendingWithdraws.length} Withdraw Menunggu</p>
                  <p className="text-sm text-muted-foreground">Perlu diproses</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-3d glass-2025 glow-pulse hover:scale-105 transition-all stagger-item">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-12 w-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                {stat.alert && <Badge className="bg-warning text-warning-foreground">Perlu Aksi</Badge>}
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              {stat.subValue && <p className="text-sm font-medium mt-1">{stat.subValue}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Ringkasan Keuangan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">Total Deposit Berhasil</span>
              <span className="font-bold text-success">{formatRupiah(totalSuccessDeposit)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">Deposit Menunggu</span>
              <span className="font-bold text-warning">{formatRupiah(totalPendingDeposit)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">Total Transaksi Hari Ini</span>
              <span className="font-bold">{dummyTransactions.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5 text-navy" />
              Status Lelang
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Sedang Berlangsung
              </span>
              <span className="font-bold">{dummyAuctions.filter((a) => a.status === "LIVE").length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-warning" />
                Akan Datang
              </span>
              <span className="font-bold">{dummyAuctions.filter((a) => a.status === "UPCOMING").length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                Selesai
              </span>
              <span className="font-bold">{dummyAuctions.filter((a) => a.status === "ENDED").length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
