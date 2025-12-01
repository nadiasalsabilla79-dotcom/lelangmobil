"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, XCircle, Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function VerifyEmailPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    } else {
      setStatus("error")
    }
  }, [token])

  const verifyEmail = async (verificationToken: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Simulate verification
      if (verificationToken === "valid-token") {
        setStatus("success")
        toast({
          title: "Email Terverifikasi",
          description: "Akun Anda berhasil diverifikasi",
        })
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    }
  }

  const resendVerification = async () => {
    setIsResending(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    toast({
      title: "Email Verifikasi Terkirim",
      description: "Silakan periksa inbox email Anda",
    })
    setIsResending(false)
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-100">
        <Card className="w-full max-w-md bg-white shadow-xl">
          <CardHeader className="text-center">
            <Loader2 className="mx-auto h-16 w-16 text-blue-600 animate-spin mb-4" />
            <CardTitle>Memverifikasi Email</CardTitle>
            <CardDescription>Mohon tunggu, sedang memverifikasi email Anda...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-100">
        <Card className="w-full max-w-md bg-white shadow-xl">
          <CardHeader className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
            <CardTitle className="text-green-600">Email Terverifikasi</CardTitle>
            <CardDescription>
              Selamat! Email Anda berhasil diverifikasi. Anda sekarang dapat menggunakan semua fitur platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/login">Masuk ke Akun</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard">Ke Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-100">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-600 mb-4" />
          <CardTitle className="text-red-600">Verifikasi Gagal</CardTitle>
          <CardDescription>
            Link verifikasi tidak valid atau sudah kedaluwarsa. Silakan minta link verifikasi baru.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={resendVerification} 
            disabled={isResending}
            className="w-full"
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Kirim Ulang Verifikasi
              </>
            )}
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/login">Kembali ke Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}