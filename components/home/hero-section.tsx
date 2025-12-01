"use client"

import Link from "next/link"
import { ArrowRight, Shield, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a5f05_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/10 text-navy text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            Lelang sedang berlangsung - Gabung sekarang!
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Platform Lelang Mobil <span className="text-navy">Terpercaya</span> di Indonesia
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Dapatkan mobil impian Anda dengan harga terbaik. Proses transparan, aman, dan mudah. Bergabunglah dengan
            ribuan pemenang lelang kami.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/lelang">
              <Button size="lg" className="bg-navy hover:bg-navy-light text-white px-8 gap-2">
                Lihat Lelang Aktif
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/cara-kerja">
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Pelajari Cara Kerja
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-muted/50">
              <div className="h-12 w-12 rounded-full bg-navy/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-navy" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">100% Aman</p>
                <p className="text-sm text-muted-foreground">Garansi keaslian</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-muted/50">
              <div className="h-12 w-12 rounded-full bg-navy/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-navy" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Proses Cepat</p>
                <p className="text-sm text-muted-foreground">24 jam selesai</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-muted/50">
              <div className="h-12 w-12 rounded-full bg-navy/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-navy" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">10.000+</p>
                <p className="text-sm text-muted-foreground">Pemenang lelang</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
