import Link from "next/link"
import { ArrowRight, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-8 md:p-12 lg:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]" />

          <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
            {/* Bonus Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-navy-dark text-sm font-bold mb-6">
              <Gift className="h-4 w-4" />
              Bonus Rp 1.000.000 untuk Member Baru!
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Siap Mendapatkan Mobil Impian Anda?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto text-pretty">
              Daftar sekarang, verifikasi KYC, dan dapatkan bonus langsung ke wallet Anda. Mulai ikuti lelang dan
              menangkan mobil dengan harga terbaik!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-navy hover:bg-white/90 px-8 gap-2">
                  Daftar Sekarang
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/lelang">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 bg-transparent"
                >
                  Lihat Lelang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
