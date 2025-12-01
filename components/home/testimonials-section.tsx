"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, CheckCircle, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { testimonials } from "@/lib/dummy-data"
import { cn } from "@/lib/utils"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const nextPage = () => setCurrentIndex((prev) => (prev + 1) % totalPages)
  const prevPage = () => setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)

  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  )

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4 shadow-sm">
            <CheckCircle className="h-4 w-4" />
            50.000+ Pelanggan Puas di Seluruh Indonesia
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🌟 Testimoni <span className="text-blue-900">Pemenang Lelang</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cerita sukses dari 20+ pemenang lelang yang hemat jutaan rupiah
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 relative group">
                <div className="absolute -top-3 -right-3">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-2 rounded-full shadow-lg">
                    <Quote className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4 mt-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {testimonial.verified && (
                    <div className="ml-auto flex items-center gap-1 text-xs text-green-600 font-semibold">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </div>
                  )}
                </div>

                <p className="text-gray-700 text-sm mb-5 leading-relaxed line-clamp-4">
                  "{testimonial.message}"
                </p>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 mb-5 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-gray-900">{testimonial.car}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-600">Harga Lelang:</span>
                      <p className="font-bold text-green-700">{testimonial.purchasePrice}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Hemat:</span>
                      <p className="font-bold text-green-700">🎉 {testimonial.savings}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover border-2 border-blue-200"
                    />
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-900 truncate">{testimonial.name}</h3>
                    <p className="text-xs text-gray-600 truncate">{testimonial.profession}</p>
                    <p className="text-xs text-gray-500 truncate">📍 {testimonial.location}</p>
                    <p className="text-xs text-gray-400 mt-0.5">📅 {testimonial.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="sm" onClick={prevPage} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-200",
                    index === currentIndex ? "bg-navy" : "bg-gray-300 hover:bg-gray-400"
                  )}
                />
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={nextPage} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
