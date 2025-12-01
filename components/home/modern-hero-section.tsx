"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Play, ArrowRight, Star, Users, Shield, Zap } from "lucide-react"

export function ModernHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const heroImages = [
    "/white-toyota-avanza-2022-front-view-showroom.jpg",
    "/black-mitsubishi-pajero-sport-2021-front-view-luxu.jpg",
    "/cars/toyota-fortuner-2023.svg"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: "/3d-icons/shield-3d.png",
      title: "100% Aman",
      description: "Transaksi terjamin"
    },
    {
      icon: "/3d-icons/trophy-3d.png", 
      title: "Harga Terbaik",
      description: "Lelang transparan"
    },
    {
      icon: "/3d-icons/gift-3d.png",
      title: "Bonus 1 Juta",
      description: "Member baru"
    }
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/30">
                <div className="w-4 h-4 mr-2">
                  <Image src="/3d-icons/gift-3d.png" alt="Gift" width={16} height={16} />
                </div>
                Bonus Rp 1.000.000 untuk Member Baru!
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Lelang Mobil
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Online #1
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                Dapatkan mobil impian dengan harga terbaik melalui sistem lelang yang 
                <span className="text-yellow-300 font-semibold"> transparan, aman, dan mudah</span>
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-2">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                    <p className="text-xs text-blue-200">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 group"
              >
                <Link href="/register">
                  <div className="w-5 h-5 mr-2">
                    <Image src="/3d-icons/car-3d.png" alt="Start" width={20} height={20} />
                  </div>
                  Mulai Lelang Sekarang
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full"
              >
                <Play className="mr-2 h-5 w-5" />
                Lihat Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-blue-200">4.9/5</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-300" />
                <span className="text-blue-200">10,000+ Pengguna</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-blue-200">100% Aman</span>
              </div>
            </div>
          </div>

          {/* Right Content - Car Showcase */}
          <div className="relative">
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-2xl">
              <Image
                src={heroImages[currentSlide]}
                alt="Featured Car"
                fill
                className="object-cover transition-all duration-1000"
                priority
              />
              
              {/* Overlay Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <Card className="bg-black/50 backdrop-blur-md border-white/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <h3 className="font-semibold">Toyota Avanza G 2022</h3>
                        <p className="text-sm text-gray-300">Lelang berakhir dalam 2 jam</p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-400 font-bold">Rp 195.000.000</p>
                        <p className="text-xs text-gray-300">Bid tertinggi</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-yellow-400 w-8' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}