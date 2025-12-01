"use client"

import Image from "next/image"
import Link from "next/link"
import { Smartphone, Download, Star, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const appFeatures = [
  {
    icon: Zap,
    title: "Notifikasi Real-time",
    description: "Dapatkan update lelang dan bid secara instant"
  },
  {
    icon: Shield,
    title: "Keamanan Tinggi",
    description: "Biometric login dan enkripsi end-to-end"
  },
  {
    icon: Star,
    title: "User Experience Terbaik",
    description: "Interface yang intuitif dan mudah digunakan"
  }
]

export function MobileAppPromo() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
              <Smartphone className="h-4 w-4" />
              Segera Hadir di Mobile
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Lelang Mobil di <span className="text-yellow-400">Genggaman Anda</span>
            </h2>
            
            <p className="text-xl text-gray-200 mb-8">
              Akses semua fitur LelangMobil dengan mudah melalui aplikasi mobile. 
              Ikuti lelang, kelola wallet, dan dapatkan mobil impian kapan saja, di mana saja.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-white/10 rounded-full p-2 mt-1">
                    <feature.icon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="#" className="flex-1">
                <Button size="lg" className="w-full bg-white text-blue-900 hover:bg-gray-100 font-semibold">
                  <Download className="mr-2 h-5 w-5" />
                  Download di Google Play
                </Button>
              </Link>
              <Link href="#" className="flex-1">
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-900 font-semibold">
                  <Download className="mr-2 h-5 w-5" />
                  Download di App Store
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">4.8★</div>
                <div className="text-sm text-gray-300">Rating App</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">100K+</div>
                <div className="text-sm text-gray-300">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">24/7</div>
                <div className="text-sm text-gray-300">Support</div>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="relative">
            <div className="relative mx-auto w-80 h-[600px]">
              <Image
                src="/modern-car-showroom.png"
                alt="LelangMobil Mobile App"
                fill
                className="object-contain rounded-3xl"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full animate-bounce">
              <Download className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-yellow-500 text-blue-900 p-3 rounded-full animate-pulse">
              <Star className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}