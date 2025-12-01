"use client"

import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/lib/store"
import { formatRupiah } from "@/lib/utils/format"
import { cn } from "@/lib/utils"

interface WithdrawFormProps {
  onSuccess: () => void
}

const banks = [
  { code: "BCA", name: "Bank Central Asia" },
  { code: "MANDIRI", name: "Bank Mandiri" },
  { code: "BRI", name: "Bank Rakyat Indonesia" },
  { code: "BNI", name: "Bank Negara Indonesia" },
]

export function WithdrawForm({ onSuccess }: WithdrawFormProps) {
  const { toast } = useToast()
  const { wallet } = useAuthStore()

  const [amount, setAmount] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const maxWithdraw = wallet?.balance || 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const withdrawAmount = Number.parseInt(amount) || 0

    // Check if user has participated in at least 1 auction
    try {
      const response = await fetch('/api/users/check-bid-history', {
        credentials: 'include',
      })
      const data = await response.json()
      
      if (!data.hasBidHistory) {
        toast({
          title: "Tidak Dapat Menarik Saldo",
          description: "Anda harus mengikuti lelang minimal 1x sebelum dapat mencairkan saldo bonus Rp 1.000.000",
          variant: "destructive",
        })
        return
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memeriksa riwayat lelang",
        variant: "destructive",
      })
      return
    }

    if (withdrawAmount < 100000) {
      toast({
        title: "Error",
        description: "Minimum penarikan adalah Rp 100.000",
        variant: "destructive",
      })
      return
    }

    if (withdrawAmount > maxWithdraw) {
      toast({
        title: "Error",
        description: "Saldo tidak mencukupi",
        variant: "destructive",
      })
      return
    }

    if (!selectedBank || !accountNumber || !accountName) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua data",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Penarikan Berhasil Diajukan",
      description: "Mohon tunggu proses transfer dari admin. Biasanya memakan waktu 1x24 jam.",
    })

    setIsLoading(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Available Balance */}
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">Saldo Tersedia</p>
        <p className="text-2xl font-bold text-navy">{formatRupiah(maxWithdraw)}</p>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label>Jumlah Penarikan</Label>
        <Input
          type="number"
          placeholder="Masukkan jumlah"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          max={maxWithdraw}
        />
        {amount && <p className="text-sm text-muted-foreground">{formatRupiah(Number.parseInt(amount) || 0)}</p>}
        <Button type="button" variant="outline" size="sm" onClick={() => setAmount(maxWithdraw.toString())}>
          Tarik Semua
        </Button>
      </div>

      {/* Select Bank */}
      <div className="space-y-2">
        <Label>Bank Tujuan</Label>
        <RadioGroup value={selectedBank} onValueChange={setSelectedBank}>
          <div className="grid grid-cols-2 gap-2">
            {banks.map((bank) => (
              <label
                key={bank.code}
                className={cn(
                  "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors text-sm",
                  selectedBank === bank.code ? "border-navy bg-navy/5" : "hover:bg-muted",
                )}
              >
                <RadioGroupItem value={bank.code} />
                <span>{bank.code}</span>
              </label>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Account Number */}
      <div className="space-y-2">
        <Label>Nomor Rekening</Label>
        <Input
          type="text"
          placeholder="Nomor rekening tujuan"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>

      {/* Account Name */}
      <div className="space-y-2">
        <Label>Nama Pemilik Rekening</Label>
        <Input
          type="text"
          placeholder="Nama sesuai buku tabungan"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
      </div>

      {/* Info */}
      <div className="p-3 bg-warning/10 rounded-lg text-sm text-muted-foreground">
        <p>Penarikan akan diproses secara manual oleh admin. Pastikan data rekening sudah benar.</p>
      </div>

      <Button type="submit" className="w-full bg-navy hover:bg-navy-light" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Memproses...
          </>
        ) : (
          "Ajukan Penarikan"
        )}
      </Button>
    </form>
  )
}
