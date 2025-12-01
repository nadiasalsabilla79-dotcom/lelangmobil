"use client"

import Image from "next/image"
import { Shield, CheckCircle, Clock, Award } from "lucide-react"

const bankPartners = [
  {
    name: "Bank Central Asia",
    code: "BCA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/200px-Bank_Central_Asia.svg.png",
    accountNumber: "1234567890",
    accountName: "PT LelangMobil Indonesia",
    features: ["Transfer Real-time", "Mobile Banking", "Internet Banking"]
  },
  {
    name: "Bank Mandiri",
    code: "MANDIRI", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/200px-Bank_Mandiri_logo_2016.svg.png",
    accountNumber: "0987654321",
    accountName: "PT LelangMobil Indonesia",
    features: ["Livin' by Mandiri", "ATM Terluas", "Transfer Instan"]
  },
  {
    name: "Bank Rakyat Indonesia",
    code: "BRI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_2020.svg/200px-BRI_2020.svg.png", 
    accountNumber: "1122334455",
    accountName: "PT LelangMobil Indonesia",
    features: ["BRImo", "Jaringan Terluas", "Transfer 24/7"]
  },
  {
    name: "Bank Negara Indonesia",
    code: "BNI",
    logo: "https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/200px-BNI_logo.svg.png",
    accountNumber: "5544332211", 
    accountName: "PT LelangMobil Indonesia",
    features: ["BNI Mobile", "Taplus", "Transfer Cepat"]
  }
]

const trustIndicators = [
  {
    icon: Shield,
    title: "Keamanan Terjamin",
    description: "Sistem enkripsi SSL 256-bit dan sertifikasi ISO 27001"
  },
  {
    icon: CheckCircle, 
    title: "Verifikasi Otomatis",
    description: "Konfirmasi transfer otomatis dalam 5-15 menit"
  },
  {
    icon: Clock,
    title: "Proses 24/7",
    description: "Layanan deposit dan withdraw tersedia sepanjang waktu"
  },
  {
    icon: Award,
    title: "Terpercaya",
    description: "Dipercaya 50.000+ pengguna di seluruh Indonesia"
  }
]

export function BankPartners() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Partner Bank Resmi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami bekerja sama dengan bank-bank terpercaya di Indonesia untuk memberikan kemudahan transaksi yang aman dan cepat
          </p>
        </div>

        {/* Bank Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {bankPartners.map((bank) => (
            <div 
              key={bank.code}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-navy/20"
            >
              <div className="aspect-square relative mb-4">
                <Image
                  src={bank.logo}
                  alt={`Logo ${bank.name}`}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-sm text-foreground mb-2">{bank.name}</h3>
                <div className="space-y-1">
                  {bank.features.map((feature, index) => (
                    <p key={index} className="text-xs text-muted-foreground">{feature}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-navy/10 rounded-full mb-4">
                <indicator.icon className="h-6 w-6 text-navy" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{indicator.title}</h3>
              <p className="text-sm text-muted-foreground">{indicator.description}</p>
            </div>
          ))}
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Shield className="h-10 w-10 text-green-600" />
            <span className="text-sm font-medium text-muted-foreground">SSL Secured</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="h-10 w-10 text-blue-600" />
            <span className="text-sm font-medium text-muted-foreground">ISO 27001</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-10 w-10 text-purple-600" />
            <span className="text-sm font-medium text-muted-foreground">PCI DSS Compliant</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-10 w-10 text-red-600" />
            <span className="text-sm font-medium text-muted-foreground">Kominfo Certified</span>
          </div>
        </div>
      </div>
    </section>
  )
}