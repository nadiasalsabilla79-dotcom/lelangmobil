"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "Bagaimana cara mengikuti lelang di LelangMobil?",
    answer: "Daftar akun, verifikasi KYC, deposit saldo, lalu pilih lelang yang diinginkan. Pasang bid sesuai budget Anda dan tunggu hasil lelang."
  },
  {
    question: "Apakah ada biaya tambahan selain harga bid?",
    answer: "Ya, ada biaya admin 2.5% dari harga final dan biaya balik nama sesuai ketentuan Samsat setempat."
  },
  {
    question: "Bagaimana jika saya menang lelang?",
    answer: "Anda akan mendapat notifikasi dan harus melunasi pembayaran dalam 24 jam. Setelah itu, proses serah terima kendaraan dan dokumen."
  },
  {
    question: "Apakah kondisi mobil sesuai deskripsi?",
    answer: "Semua mobil telah diinspeksi tim ahli kami. Kami memberikan grading A, B, C berdasarkan kondisi dan menjamin keaslian deskripsi."
  },
  {
    question: "Bagaimana cara deposit dan withdraw?",
    answer: "Deposit via transfer bank (BCA, Mandiri, BRI, BNI) dengan upload bukti. Withdraw diproses maksimal 24 jam ke rekening terdaftar."
  },
  {
    question: "Apakah ada garansi untuk mobil yang dibeli?",
    answer: "Kami memberikan garansi dokumen legal dan keaslian kondisi sesuai deskripsi. Untuk garansi mesin, tergantung kondisi dan usia kendaraan."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/10 text-navy text-sm font-medium mb-6">
            <HelpCircle className="h-4 w-4" />
            Pertanyaan Umum
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan kami
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white rounded-lg p-6 text-left hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground pr-4">{faq.question}</h3>
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </div>
                <div className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96 mt-4" : "max-h-0"
                )}>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Masih ada pertanyaan lain?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/6281234567890" 
              className="inline-flex items-center justify-center px-6 py-3 bg-success text-white rounded-lg hover:bg-success/90 transition-colors"
            >
              WhatsApp Support
            </a>
            <a 
              href="mailto:support@lelangmobil.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-foreground rounded-lg hover:bg-gray-50 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}