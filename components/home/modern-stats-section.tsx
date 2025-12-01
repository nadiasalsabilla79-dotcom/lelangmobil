"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function ModernStatsSection() {
  const stats = [
    {
      icon: "/3d-icons/car-3d.png",
      value: "500+",
      label: "Mobil Terjual",
      description: "Mobil berkualitas telah menemukan pemilik baru",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: "/3d-icons/trophy-3d.png",
      value: "98%",
      label: "Kepuasan Pelanggan",
      description: "Rating tinggi dari ribuan pengguna",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50"
    },
    {
      icon: "/3d-icons/shield-3d.png",
      value: "100%",
      label: "Transaksi Aman",
      description: "Sistem keamanan berlapis untuk melindungi Anda",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      icon: "/3d-icons/money-3d.png",
      value: "Rp 50M+",
      label: "Total Transaksi",
      description: "Volume transaksi yang telah diproses",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            Statistik Platform
          </Badge>
          <h2 className="text-4xl font-bold gradient-text-2025 mb-4">
            Dipercaya Ribuan Pengguna
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bergabunglah dengan komunitas lelang mobil terbesar di Indonesia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`group hover:scale-105 transition-all duration-300 border-0 shadow-lg hover:shadow-2xl ${stat.bgColor} backdrop-blur-sm`}
            >
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={stat.icon}
                      alt={stat.label}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-opacity`}></div>
                </div>
                
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold">
                  {i}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">10,000+ Pengguna Aktif</p>
              <p className="text-sm text-gray-600">Bergabung setiap bulan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}