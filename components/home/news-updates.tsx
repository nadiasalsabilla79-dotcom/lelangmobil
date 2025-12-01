"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const newsUpdates = [
  {
    id: 1,
    title: "Kerjasama Strategis dengan Bank Mandiri untuk Kemudahan Transaksi",
    excerpt: "LelangMobil resmi menjalin kerjasama dengan Bank Mandiri untuk memberikan kemudahan transaksi bagi seluruh pengguna platform.",
    image: "/news/mandiri-partnership.jpg",
    date: "15 Desember 2024",
    category: "Partnership",
    readTime: "3 menit"
  },
  {
    id: 2,
    title: "Fitur Baru: Live Streaming Inspeksi Kendaraan",
    excerpt: "Kini pengguna dapat menyaksikan proses inspeksi kendaraan secara real-time melalui fitur live streaming yang terintegrasi.",
    image: "/news/live-inspection.jpg", 
    date: "10 Desember 2024",
    category: "Product Update",
    readTime: "2 menit"
  },
  {
    id: 3,
    title: "Pencapaian 50.000 Pengguna Aktif di Seluruh Indonesia",
    excerpt: "Milestone baru tercapai! LelangMobil kini telah dipercaya oleh lebih dari 50.000 pengguna aktif di 34 provinsi Indonesia.",
    image: "/news/50k-users.jpg",
    date: "5 Desember 2024", 
    category: "Milestone",
    readTime: "4 menit"
  }
]

export function NewsUpdates() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Berita & Update Terbaru
            </h2>
            <p className="text-lg text-muted-foreground">
              Ikuti perkembangan terbaru dari LelangMobil
            </p>
          </div>
          <Link href="/berita">
            <Button variant="outline" className="hidden md:flex">
              Lihat Semua Berita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsUpdates.map((news, index) => (
            <article 
              key={news.id}
              className={`group cursor-pointer ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full">
                <div className={`relative ${index === 0 ? 'h-64 md:h-80' : 'h-48'}`}>
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-navy text-white px-3 py-1 rounded-full text-sm font-medium">
                      {news.category}
                    </span>
                  </div>
                </div>
                
                <div className={`p-6 ${index === 0 ? 'md:p-8' : ''}`}>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {news.date}
                    </div>
                    <span>•</span>
                    <span>{news.readTime}</span>
                  </div>
                  
                  <h3 className={`font-bold text-foreground mb-3 group-hover:text-navy transition-colors ${
                    index === 0 ? 'text-xl md:text-2xl' : 'text-lg'
                  }`}>
                    {news.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>
                  
                  <div className="flex items-center text-navy font-medium group-hover:gap-2 transition-all">
                    Baca Selengkapnya
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/berita">
            <Button variant="outline">
              Lihat Semua Berita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}