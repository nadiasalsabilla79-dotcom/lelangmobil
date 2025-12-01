"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Upload, ShieldCheck, CheckCircle, Clock, X, Camera, CreditCard, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/lib/store"

export default function KYCPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { kyc, setKyc, user } = useAuthStore()

  const [ktpNumber, setKtpNumber] = useState("")
  const [ktpImage, setKtpImage] = useState<string | null>(null)
  const [selfieImage, setSelfieImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "ktp" | "selfie") => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (type === "ktp") {
          setKtpImage(result)
        } else {
          setSelfieImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!ktpNumber || !ktpImage || !selfieImage) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua data yang diperlukan",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create KYC submission (status PENDING, bonus TIDAK diberikan dulu)
    const newKyc = {
      id: `kyc-${Date.now()}`,
      userId: user?.id || "",
      ktpNumber,
      ktpImageUrl: ktpImage,
      selfieImageUrl: selfieImage,
      status: "PENDING" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setKyc(newKyc)

    toast({
      title: "KYC Terkirim!",
      description: "Dokumen Anda sedang dalam proses verifikasi. Bonus akan diberikan setelah KYC disetujui admin.",
    })

    setIsLoading(false)
  }

  // If already submitted
  if (kyc) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Verifikasi KYC</h1>
          <p className="text-muted-foreground">Status verifikasi identitas Anda</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              {kyc.status === "APPROVED" && (
                <>
                  <div className="h-20 w-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-10 w-10 text-success" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">KYC Disetujui!</h2>
                  <p className="text-muted-foreground mb-4">
                    Verifikasi identitas Anda telah berhasil. Bonus Rp 1.000.000 telah ditambahkan ke wallet Anda.
                  </p>
                  <Badge className="bg-success">Terverifikasi</Badge>
                </>
              )}

              {kyc.status === "PENDING" && (
                <>
                  <div className="h-20 w-20 rounded-full bg-warning/20 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-10 w-10 text-warning" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Menunggu Verifikasi</h2>
                  <p className="text-muted-foreground mb-4">
                    Dokumen Anda sedang dalam proses review oleh tim kami. Proses ini biasanya memakan waktu 1x24 jam.
                  </p>
                  <Badge className="bg-warning text-warning-foreground">Dalam Review</Badge>

                  <div className="mt-8 p-4 bg-muted rounded-lg text-left">
                    <h3 className="font-semibold mb-2">Dokumen yang Dikirim:</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Foto KTP</p>
                        <div className="relative aspect-[3/2] rounded-lg overflow-hidden border">
                          <Image src={kyc.ktpImageUrl || "/placeholder.svg"} alt="KTP" fill className="object-cover" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Selfie dengan KTP</p>
                        <div className="relative aspect-[3/2] rounded-lg overflow-hidden border">
                          <Image
                            src={kyc.selfieImageUrl || "/placeholder.svg"}
                            alt="Selfie"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {kyc.status === "REJECTED" && (
                <>
                  <div className="h-20 w-20 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
                    <X className="h-10 w-10 text-destructive" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">KYC Ditolak</h2>
                  <p className="text-muted-foreground mb-4">
                    {kyc.rejectionReason ||
                      "Dokumen Anda tidak memenuhi syarat. Silakan ajukan ulang dengan dokumen yang valid."}
                  </p>
                  <Badge className="bg-destructive">Ditolak</Badge>
                  <div className="mt-6">
                    <Button onClick={() => setKyc(null)} className="bg-navy hover:bg-navy-light">
                      Ajukan Ulang
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="reveal">
        <h1 className="text-2xl font-bold gradient-text-2025">Verifikasi KYC</h1>
        <p className="text-muted-foreground">Lengkapi verifikasi untuk mendapatkan bonus Rp 1.000.000</p>
      </div>

      {/* Info Banner */}
      <Card className="border-navy bg-navy/5 glass-2025 gradient-border reveal">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-navy shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-navy">Mengapa perlu KYC?</p>
              <p className="text-muted-foreground">
                Verifikasi identitas diperlukan untuk keamanan transaksi dan memastikan Anda adalah pemilik sah akun
                ini. Setelah KYC disetujui, Anda akan mendapatkan bonus Rp 1.000.000 langsung ke wallet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-2025 gradient-border reveal">
        <CardHeader>
          <CardTitle className="gradient-text-2025">Form Verifikasi KYC</CardTitle>
          <CardDescription>Pastikan data yang Anda masukkan sesuai dengan dokumen identitas</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* KTP Number */}
            <div className="space-y-2">
              <Label htmlFor="ktpNumber">Nomor KTP (NIK)</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="ktpNumber"
                  type="text"
                  placeholder="16 digit NIK"
                  value={ktpNumber}
                  onChange={(e) => setKtpNumber(e.target.value)}
                  className="pl-10"
                  maxLength={16}
                  pattern="[0-9]{16}"
                  required
                />
              </div>
            </div>

            {/* KTP Photo Upload */}
            <div className="space-y-2">
              <Label>Foto KTP</Label>
              <div className="border-2 border-dashed rounded-lg p-4">
                {ktpImage ? (
                  <div className="relative">
                    <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                      <Image src={ktpImage || "/placeholder.svg"} alt="KTP Preview" fill className="object-cover" />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setKtpImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center py-8 cursor-pointer">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">Klik untuk upload foto KTP</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG maksimal 5MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, "ktp")}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Selfie Upload */}
            <div className="space-y-2">
              <Label>Selfie dengan KTP</Label>
              <div className="border-2 border-dashed rounded-lg p-4">
                {selfieImage ? (
                  <div className="relative">
                    <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                      <Image
                        src={selfieImage || "/placeholder.svg"}
                        alt="Selfie Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setSelfieImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center py-8 cursor-pointer">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <Camera className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">Klik untuk upload selfie dengan KTP</p>
                    <p className="text-xs text-muted-foreground mt-1">Pastikan wajah dan KTP terlihat jelas</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, "selfie")}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Tips agar KYC disetujui:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Pastikan foto KTP tidak buram dan semua tulisan terbaca</li>
                <li>• Selfie harus menunjukkan wajah dengan jelas sambil memegang KTP</li>
                <li>• Pastikan NIK yang diinput sesuai dengan KTP</li>
                <li>• Gunakan pencahayaan yang cukup saat mengambil foto</li>
              </ul>
            </div>

            <Button type="submit" className="w-full bg-navy hover:bg-navy-light btn-magnetic ripple neon-glow" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Kirim Verifikasi KYC
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
