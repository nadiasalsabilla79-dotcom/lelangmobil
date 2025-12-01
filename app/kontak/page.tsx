"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat",
    details: ["Jl. Sudirman No. 123", "Jakarta Pusat 10220", "Indonesia"],
  },
  {
    icon: Phone,
    title: "Telepon",
    details: ["(021) 1234-5678", "0800-100-LELANG"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["support@lelangmobil.com", "info@lelangmobil.com"],
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    details: ["Senin - Jumat: 08:00 - 17:00", "Sabtu: 08:00 - 12:00", "Minggu: Tutup"],
  },
]

export default function KontakPage() {
  const { toast } = useToast()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    toast({
      title: "Pesan Terkirim",
      description: "Tim kami akan menghubungi Anda dalam 1-2 hari kerja.",
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Ada pertanyaan? Tim kami siap membantu Anda 24/7</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 flex gap-4">
                      <div className="h-12 w-12 rounded-xl bg-navy/10 flex items-center justify-center shrink-0">
                        <info.icon className="h-6 w-6 text-navy" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-sm text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Kirim Pesan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-8 w-8 text-success" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Pesan Terkirim!</h3>
                        <p className="text-muted-foreground mb-6">
                          Terima kasih telah menghubungi kami. Tim kami akan membalas pesan Anda dalam 1-2 hari kerja.
                        </p>
                        <Button onClick={() => setIsSubmitted(false)} variant="outline">
                          Kirim Pesan Lagi
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Masukkan nama Anda"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="email@contoh.com"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telepon</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="08xxxxxxxxxx"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject">Subjek</Label>
                            <Input
                              id="subject"
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              placeholder="Tentang apa pesan Anda?"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Pesan</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Tulis pesan Anda di sini..."
                            rows={5}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-navy hover:bg-navy-light">
                          <Send className="mr-2 h-4 w-4" />
                          Kirim Pesan
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-8">Lokasi Kantor Kami</h2>
            <div className="aspect-video max-w-4xl mx-auto bg-muted rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-navy mx-auto mb-4" />
                <p className="text-muted-foreground">Peta Lokasi</p>
                <p className="text-sm text-muted-foreground">Jl. Sudirman No. 123, Jakarta Pusat</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
