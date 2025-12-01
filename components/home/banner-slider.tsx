"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const banners = [
  {
    id: 1,
    title: "Lelang Mobil Premium",
    subtitle: "Dapatkan mobil mewah dengan harga terbaik",
    description: "Koleksi eksklusif mobil premium dari berbagai merek ternama. Proses lelang transparan dan terpercaya.",
    image: "/cars/iklan1.png",
    ctaText: "Lihat Koleksi Premium",
    ctaLink: "/lelang?category=premium",
    bgColor: "from-blue-900 to-blue-700"
  },
  {
    id: 2,
    title: "Mobil Keluarga Terbaik",
    subtitle: "Solusi transportasi keluarga Indonesia",
    description: "Pilihan lengkap mobil keluarga dengan kondisi prima. Garansi keaslian dan kualitas terjamin.",
    image: "/cars/iklan.png",
    ctaText: "Jelajahi Mobil Keluarga",
    ctaLink: "/lelang?category=family",
    bgColor: "from-emerald-900 to-emerald-700"
  },
  {
    id: 3,
    title: "Investasi Cerdas",
    subtitle: "Mobil sebagai aset investasi",
    description: "Dapatkan mobil dengan nilai investasi tinggi. Analisis pasar dan prediksi harga tersedia.",
    image: "/cars/iklan1.png",
    ctaText: "Mulai Investasi",
    ctaLink: "/lelang?category=investment",
    bgColor: "from-amber-900 to-amber-700"
  },
  {
    id: 4,
    title: "Promo Akhir Tahun",
    subtitle: "Diskon biaya admin hingga 50%",
    description: "Kesempatan terbatas! Nikmati promo spesial akhir tahun dengan berbagai keuntungan menarik.",
    image: "/cars/iklan.png",
    ctaText: "Ambil Promo Sekarang",
    ctaLink: "/promo",
    bgColor: "from-red-900 to-red-700"
  }
]

export function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
          {/* Slides */}
          <div className="relative w-full" style={{ paddingBottom: '40%' }}>
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={cn(
                  "absolute inset-0 transition-all duration-700 ease-in-out",
                  index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                )}
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-contain"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 transition-all z-10 shadow-lg hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-blue-900" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 transition-all z-10 shadow-lg hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-blue-900" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-10 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  index === currentSlide ? "bg-white w-10" : "bg-white/50 w-2.5 hover:bg-white/75"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}