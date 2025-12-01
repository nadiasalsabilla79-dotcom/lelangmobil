"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsEmailSent(true)
    toast({
      title: "Email Terkirim",
      description: "Link reset password telah dikirim ke email Anda",
    })

    setIsLoading(false)
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-100">
        <Card className="w-full max-w-md bg-white shadow-xl">
          <CardHeader className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
            <CardTitle>Email Terkirim</CardTitle>
            <CardDescription>Link reset password dikirim ke {email}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsEmailSent(false)} variant="outline" className="w-full mb-4">
              Kirim Ulang
            </Button>
            <Link href="/login" className="block text-center text-blue-600 hover:underline">
              Kembali ke Login
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-100">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="text-center">
          <CardTitle>Lupa Password</CardTitle>
          <CardDescription>Masukkan email untuk reset password</CardDescription>
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Mengirim..." : "Kirim Link Reset"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/login" className="inline-flex items-center text-blue-600 hover:underline">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Kembali ke Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}