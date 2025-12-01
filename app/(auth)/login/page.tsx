"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/lib/store"
import { dummyUsers, dummyWallets, dummyKYC } from "@/lib/dummy-data"
import { LightweightBackground } from "@/components/ui/lightweight-background"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { setUser, setWallet, setKyc } = useAuthStore()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Demo login - check against dummy data
    const user = dummyUsers.find((u) => u.email === email)

    if (user && password === "password123") {
      const wallet = dummyWallets.find((w) => w.userId === user.id)
      const kyc = dummyKYC.find((k) => k.userId === user.id)

      setUser(user)
      if (wallet) setWallet(wallet)
      if (kyc) setKyc(kyc)

      toast({
        title: "Login Berhasil",
        description: `Selamat datang kembali, ${user.name}!`,
      })

      // Redirect based on role
      if (user.role === "ADMIN") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } else {
      toast({
        title: "Login Gagal",
        description: "Email atau password salah. Silakan periksa kembali kredensial Anda.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 to-purple-100"></div>
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium">Memproses...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/logo-lelangmobil.svg" alt="LelangMobil" width={48} height={48} className="rounded-xl shadow-lg" />
            <span className="font-serif text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">LelangMobil</span>
          </Link>
        </div>

        <Card className="bg-white border shadow-xl rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Masuk ke Akun</CardTitle>
            <CardDescription className="text-gray-600">Masukkan email dan password untuk melanjutkan</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/lupa-password" className="text-sm text-blue-600 hover:underline">
                  Lupa password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Masuk"
                )}
              </Button>
            </form>



            <div className="mt-6 text-center text-sm">
              Belum punya akun?{" "}
              <Link href="/register" className="text-blue-600 font-medium hover:underline">
                Daftar Sekarang
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}