"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload, Copy, Check, Loader2, X, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { bankList } from "@/lib/dummy-data"
import { formatRupiah } from "@/lib/utils/format"
import { cn } from "@/lib/utils"

interface DepositFormProps {
  onSuccess: () => void
}

const quickAmounts = [1000000, 5000000, 10000000, 25000000, 50000000]

export function DepositForm({ onSuccess }: DepositFormProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [proofImage, setProofImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProofImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!amount || !selectedBank || !proofImage) {
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
      title: "Deposit Berhasil Diajukan",
      description: "Mohon tunggu konfirmasi dari admin. Proses verifikasi memakan waktu 1x24 jam.",
    })

    setIsLoading(false)
    onSuccess()
  }

  const selectedBankInfo = bankList.find((b) => b.code === selectedBank)

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className={cn("h-2 w-8 rounded-full transition-colors", step >= s ? "bg-navy" : "bg-muted")} />
        ))}
      </div>

      {/* Step 1: Amount */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Jumlah Deposit</Label>
            <Input
              type="number"
              placeholder="Masukkan jumlah"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
            {amount && <p className="text-sm text-muted-foreground">{formatRupiah(Number.parseInt(amount) || 0)}</p>}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                type="button"
                variant={Number.parseInt(amount) === quickAmount ? "default" : "outline"}
                size="sm"
                onClick={() => setAmount(quickAmount.toString())}
                className={Number.parseInt(amount) === quickAmount ? "bg-navy" : ""}
              >
                {formatRupiah(quickAmount).replace("Rp", "")}
              </Button>
            ))}
          </div>

          <Button
            className="w-full bg-navy hover:bg-navy-light"
            disabled={!amount || Number.parseInt(amount) < 100000}
            onClick={() => setStep(2)}
          >
            Lanjutkan
          </Button>
          <p className="text-xs text-muted-foreground text-center">Minimum deposit Rp 100.000</p>
        </div>
      )}

      {/* Step 2: Select Bank */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Pilih Bank Tujuan</Label>
            <RadioGroup value={selectedBank} onValueChange={setSelectedBank}>
              {bankList.map((bank) => (
                <label
                  key={bank.code}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                    selectedBank === bank.code ? "border-navy bg-navy/5" : "hover:bg-muted",
                  )}
                >
                  <RadioGroupItem value={bank.code} />
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{bank.name}</p>
                    <p className="text-sm text-muted-foreground">{bank.accountNumber}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          {selectedBankInfo && (
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Nomor Rekening</p>
                  <p className="font-mono font-semibold">{selectedBankInfo.accountNumber}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(selectedBankInfo.accountNumber)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Atas Nama</p>
                <p className="font-medium">{selectedBankInfo.accountName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jumlah Transfer</p>
                <p className="text-lg font-bold text-navy">{formatRupiah(Number.parseInt(amount) || 0)}</p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Kembali
            </Button>
            <Button className="flex-1 bg-navy hover:bg-navy-light" disabled={!selectedBank} onClick={() => setStep(3)}>
              Sudah Transfer
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Upload Proof */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Upload Bukti Transfer</Label>
            <div className="border-2 border-dashed rounded-lg p-4">
              {proofImage ? (
                <div className="relative">
                  <div className="relative aspect-[3/4] max-h-64 mx-auto rounded-lg overflow-hidden">
                    <Image
                      src={proofImage || "/placeholder.svg"}
                      alt="Bukti Transfer"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setProofImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center py-8 cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">Klik untuk upload bukti transfer</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG maksimal 5MB</p>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Ringkasan Deposit:</p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                Jumlah:{" "}
                <span className="text-foreground font-medium">{formatRupiah(Number.parseInt(amount) || 0)}</span>
              </p>
              <p>
                Bank: <span className="text-foreground font-medium">{selectedBankInfo?.name}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
              Kembali
            </Button>
            <Button
              className="flex-1 bg-navy hover:bg-navy-light"
              disabled={!proofImage || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                "Kirim Deposit"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
