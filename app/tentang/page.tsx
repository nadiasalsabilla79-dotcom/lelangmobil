import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

const stats = [
  { value: "10,000+", label: "Lelang Selesai" },
  { value: "50,000+", label: "Pengguna Terdaftar" },
  { value: "Rp 500M+", label: "Total Transaksi" },
  { value: "99%", label: "Kepuasan Pelanggan" },
]

const values = [
  {
    icon: Shield,
    title: "Kepercayaan",
    description: "Kami menjamin keaslian dan transparansi setiap transaksi lelang.",
  },
  {
    icon: Users,
    title: "Komunitas",
    description: "Membangun komunitas pecinta otomotif yang saling mendukung.",
  },
  {
    icon: Award,
    title: "Kualitas",
    description: "Hanya kendaraan berkualitas yang lolos inspeksi ketat kami.",
  },
  {
    icon: TrendingUp,
    title: "Inovasi",
    description: "Terus berinovasi untuk memberikan pengalaman lelang terbaik.",
  },
]

const team = [
  { name: "Ahmad Wijaya", role: "CEO & Founder", image: "/professional-man-indonesian.jpg" },
  { name: "Siti Nurhaliza", role: "COO", image: "/professional-woman-indonesian.jpg" },
  { name: "Budi Santoso", role: "CTO", image: "/tech-man-indonesian.jpg" },
  { name: "Dewi Lestari", role: "Head of Operations", image: "/business-woman-indonesian.jpg" },
]

export default function TentangPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Tentang Kami</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              lelangmobil.com adalah platform lelang kendaraan online terpercaya di Indonesia
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Cerita Kami</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Berawal dari keinginan untuk menghadirkan pengalaman lelang mobil yang transparan dan mudah diakses,
                    lelangmobil.com didirikan pada tahun 2020.
                  </p>
                  <p>
                    Kami melihat bahwa pasar lelang kendaraan di Indonesia masih didominasi oleh proses offline yang
                    rumit dan kurang transparan. Dengan teknologi, kami percaya bisa mengubah hal tersebut.
                  </p>
                  <p>
                    Kini, lelangmobil.com telah menjadi platform lelang kendaraan online terbesar di Indonesia, dengan
                    ribuan kendaraan dilelang setiap bulannya dan kepuasan pelanggan yang tinggi.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image src="/modern-car-showroom.png" alt="Showroom lelangmobil.com" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-navy mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Nilai-Nilai Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-xl bg-navy/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-navy" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Tim Kami</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative h-40 w-40 mx-auto rounded-full overflow-hidden mb-4">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 bg-navy text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Misi Kami</h2>
            <p className="text-lg text-white/80">
              Menjadi platform lelang kendaraan nomor satu di Indonesia yang menghadirkan pengalaman transparan, aman,
              dan mudah bagi semua orang untuk mendapatkan kendaraan impian mereka.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
