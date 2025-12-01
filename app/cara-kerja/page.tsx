import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { UserPlus, Wallet, Search, Gavel, Trophy, Car } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    icon: UserPlus,
    title: "1. Daftar Akun",
    description:
      "Buat akun gratis di lelangmobil.com. Proses registrasi cepat dan mudah, hanya butuh email dan nomor telepon.",
  },
  {
    icon: Wallet,
    title: "2. Verifikasi KYC",
    description:
      "Upload foto KTP dan selfie untuk verifikasi identitas. Setelah disetujui, Anda mendapat bonus saldo Rp 1.000.000!",
  },
  {
    icon: Search,
    title: "3. Cari Mobil Impian",
    description:
      "Jelajahi katalog lelang kami. Filter berdasarkan merek, tahun, harga, dan lokasi untuk menemukan mobil yang sesuai.",
  },
  {
    icon: Gavel,
    title: "4. Mulai Bidding",
    description:
      "Deposit saldo ke wallet Anda, lalu mulai melakukan bid pada mobil yang Anda inginkan. Sistem real-time memastikan transparansi.",
  },
  {
    icon: Trophy,
    title: "5. Menangkan Lelang",
    description:
      "Jika bid Anda tertinggi saat waktu habis, selamat! Anda memenangkan lelang dan bisa melanjutkan ke proses pembayaran.",
  },
  {
    icon: Car,
    title: "6. Terima Mobil",
    description:
      "Selesaikan pembayaran dan urus dokumen. Mobil akan diserahkan ke Anda dengan dokumen lengkap dan sah.",
  },
]

const faqs = [
  {
    question: "Apakah mobil yang dilelang dijamin keasliannya?",
    answer:
      "Ya, semua mobil telah melalui inspeksi ketat oleh tim kami. Kami memberikan laporan kondisi lengkap untuk setiap kendaraan.",
  },
  {
    question: "Berapa minimum deposit untuk mulai bidding?",
    answer:
      "Minimum deposit adalah Rp 1.000.000. Anda bisa deposit lebih untuk mengikuti lelang dengan harga lebih tinggi.",
  },
  {
    question: "Bagaimana sistem hold saldo bekerja?",
    answer:
      "Saat Anda melakukan bid, 10% dari nilai bid akan ditahan sebagai jaminan. Saldo akan dikembalikan jika Anda kalah atau digunakan untuk pembayaran jika menang.",
  },
  {
    question: "Berapa lama proses verifikasi KYC?",
    answer:
      "Proses verifikasi KYC biasanya selesai dalam 1-2 hari kerja. Setelah disetujui, Anda langsung mendapat bonus Rp 1.000.000.",
  },
  {
    question: "Apakah bisa melihat mobil secara langsung?",
    answer:
      "Ya, Anda bisa menjadwalkan kunjungan ke lokasi penyimpanan untuk melihat kondisi mobil secara langsung sebelum bidding.",
  },
  {
    question: "Bagaimana jika saya menang tapi tidak bisa bayar?",
    answer:
      "Saldo yang ditahan akan hangus sebagai penalti. Pastikan Anda hanya bidding pada mobil yang benar-benar Anda mampu dan inginkan.",
  },
]

export default function CaraKerjaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Cara Kerja Lelang</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Ikuti 6 langkah mudah untuk mendapatkan mobil impian Anda dengan harga terbaik
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-xl bg-navy/10 flex items-center justify-center mb-4 group-hover:bg-navy group-hover:text-white transition-colors">
                      <step.icon className="h-7 w-7 text-navy group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                  <div className="absolute top-4 right-4 text-6xl font-bold text-muted/20">{index + 1}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Lihat Video Tutorial</h2>
              <p className="text-muted-foreground mb-8">
                Pelajari lebih detail tentang proses lelang melalui video tutorial kami
              </p>
              <div className="aspect-video bg-navy/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="h-20 w-20 rounded-full bg-navy flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                    <svg className="h-8 w-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground">Klik untuk memutar video</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
                Pertanyaan yang Sering Diajukan
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Siap Mulai Lelang?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Daftar sekarang dan dapatkan bonus saldo Rp 1.000.000 setelah verifikasi KYC
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-navy hover:bg-white/90 px-8">
                  Daftar Sekarang
                </Button>
              </Link>
              <Link href="/lelang">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 bg-transparent"
                >
                  Lihat Lelang
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
