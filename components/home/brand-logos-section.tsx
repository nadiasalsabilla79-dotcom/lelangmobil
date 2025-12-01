"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const carBrands = [
  { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/200px-Toyota.svg.png" },
  { name: "Honda", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Honda_logo.svg/200px-Honda_logo.svg.png" },
  { name: "Mitsubishi", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Mitsubishi_logo.svg/200px-Mitsubishi_logo.svg.png" },
  { name: "Suzuki", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/200px-Suzuki_logo_2.svg.png" },
  { name: "Daihatsu", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Daihatsu_Logo.svg/200px-Daihatsu_Logo.svg.png" },
  { name: "Nissan", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Nissan_logo.svg/200px-Nissan_logo.svg.png" },
  { name: "Mazda", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Mazda_logo_%28North_America%29.svg/200px-Mazda_logo_%28North_America%29.svg.png" },
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/200px-BMW_logo_%28gray%29.svg.png" },
  { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/200px-Mercedes-Logo.svg.png" },
  { name: "Hyundai", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Hyundai_logo_%282011%29.svg/200px-Hyundai_logo_%282011%29.svg.png" },
  { name: "Kia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kia_logo_2.svg/200px-Kia_logo_2.svg.png" },
  { name: "Isuzu", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Isuzu_logo.svg/200px-Isuzu_logo.svg.png" },
]

export function BrandLogosSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carBrands.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isAutoPlay])

  const visibleBrands = [
    carBrands[currentIndex],
    carBrands[(currentIndex + 1) % carBrands.length],
    carBrands[(currentIndex + 2) % carBrands.length],
    carBrands[(currentIndex + 3) % carBrands.length],
    carBrands[(currentIndex + 4) % carBrands.length],
    carBrands[(currentIndex + 5) % carBrands.length],
  ]

  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Brand Mobil Terpercaya
            </h2>
          </div>
          <p className="text-gray-600">Lelang mobil dari brand ternama dunia</p>
        </div>

        {/* Auto Sliding Logos */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {visibleBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center p-4 group hover:scale-110 border border-gray-100"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {carBrands.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-10 max-w-2xl mx-auto">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-2xl font-bold text-blue-900">12+</p>
            <p className="text-sm text-gray-600">Brand Mobil</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-2xl font-bold text-green-600">500+</p>
            <p className="text-sm text-gray-600">Unit Tersedia</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-2xl font-bold text-orange-600">100%</p>
            <p className="text-sm text-gray-600">Original</p>
          </div>
        </div>
      </div>
    </section>
  )
}
