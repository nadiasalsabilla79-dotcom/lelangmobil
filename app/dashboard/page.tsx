"use client"

import Link from "next/link"
import { Wallet, Gavel, Clock, Trophy, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/lib/store"
import { formatRupiah } from "@/lib/utils/format"
import { dummyAuctions, dummyBids } from "@/lib/dummy-data"

export default function DashboardPage() {
  const { user, wallet, kyc } = useAuthStore()

  const userBids = dummyBids.filter((b) => b.userId === user?.id)
  const activeBids = userBids.filter((b) => b.status === "ACTIVE")
  const wonAuctions = dummyAuctions.filter((a) => a.winnerId === user?.id)

  const needsKYC = !kyc || kyc.status !== "APPROVED"

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="reveal">
        <h1 className="text-2xl font-bold gradient-text-2025">Selamat Datang, {user?.name}!</h1>
        <p className="text-muted-foreground">Kelola akun dan pantau lelang Anda di sini</p>
      </div>

      {/* KYC Warning Banner */}
      {needsKYC && (
        <Card className="border-warning bg-warning/10 glass-2025 reveal">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-warning flex items-center justify-center shrink-0 float">
                <AlertCircle className="h-5 w-5 text-warning-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Verifikasi KYC Diperlukan</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {kyc?.status === "PENDING"
                    ? "KYC Anda sedang dalam proses review. Mohon tunggu konfirmasi dari admin."
                    : "Lengkapi verifikasi KYC untuk mendapatkan bonus Rp 1.000.000 dan mulai ikut lelang."}
                </p>
                {kyc?.status !== "PENDING" && (
                  <Link href="/dashboard/kyc">
                    <Button size="sm" className="bg-warning text-warning-foreground hover:bg-warning/90 btn-magnetic ripple">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Verifikasi Sekarang
                    </Button>
                  </Link>
                )}
                {kyc?.status === "PENDING" && (
                  <Badge className="bg-warning text-warning-foreground">Menunggu Persetujuan Admin</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-3d glass-2025 glow-pulse hover:scale-105 transition-all stagger-item">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-navy/10 flex items-center justify-center neon-glow">
                <Wallet className="h-6 w-6 text-navy" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saldo Wallet</p>
                <p className="text-xl font-bold gradient-text-2025">{formatRupiah(wallet?.balance || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d glass-2025 glow-pulse hover:scale-105 transition-all stagger-item">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center neon-glow">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saldo Ditahan</p>
                <p className="text-xl font-bold gradient-text-2025">{formatRupiah(wallet?.holdBalance || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d glass-2025 glow-pulse hover:scale-105 transition-all stagger-item">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center neon-glow">
                <Gavel className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bid Aktif</p>
                <p className="text-xl font-bold gradient-text-2025">{activeBids.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d glass-2025 glow-pulse hover:scale-105 transition-all stagger-item">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center neon-glow">
                <Trophy className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Menang Lelang</p>
                <p className="text-xl font-bold gradient-text-2025">{wonAuctions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-2025 gradient-border reveal">
          <CardHeader>
            <CardTitle className="gradient-text-2025">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/wallet">
              <Button variant="outline" className="w-full justify-between bg-transparent btn-magnetic ripple">
                <span className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Top Up Saldo
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/lelang">
              <Button variant="outline" className="w-full justify-between bg-transparent btn-magnetic ripple">
                <span className="flex items-center gap-2">
                  <Gavel className="h-4 w-4" />
                  Lihat Lelang Aktif
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/lelang-saya">
              <Button variant="outline" className="w-full justify-between bg-transparent btn-magnetic ripple">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Riwayat Bid Saya
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="glass-2025 gradient-border reveal">
          <CardHeader>
            <CardTitle className="gradient-text-2025">Status Akun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Verifikasi Email</span>
              <Badge className="bg-success neon-glow">Terverifikasi</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Verifikasi KYC</span>
              <Badge
                className={
                  kyc?.status === "APPROVED"
                    ? "bg-success neon-glow"
                    : kyc?.status === "PENDING"
                      ? "bg-warning text-warning-foreground"
                      : "bg-muted text-muted-foreground"
                }
              >
                {kyc?.status === "APPROVED"
                  ? "Terverifikasi"
                  : kyc?.status === "PENDING"
                    ? "Menunggu"
                    : "Belum Verifikasi"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Status Akun</span>
              <Badge className="bg-success neon-glow">Aktif</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
