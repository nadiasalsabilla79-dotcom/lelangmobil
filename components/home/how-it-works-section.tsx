import { UserPlus, CreditCard, Gavel, Car } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Daftar & Verifikasi",
    description: "Buat akun dan lengkapi verifikasi KYC untuk mendapatkan bonus Rp 1.000.000",
  },
  {
    icon: CreditCard,
    title: "Isi Saldo Wallet",
    description: "Top up saldo melalui transfer bank untuk siap mengikuti lelang",
  },
  {
    icon: Gavel,
    title: "Ikuti Lelang",
    description: "Pilih mobil favorit dan ajukan bid. Pantau secara real-time!",
  },
  {
    icon: Car,
    title: "Menangkan Mobil",
    description: "Jika menang, selesaikan pembayaran dan ambil mobil Anda",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">Cara Kerja LelangMobil</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Empat langkah mudah untuk mendapatkan mobil impian Anda dengan harga terbaik
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="relative inline-flex mb-4">
                  <div className="h-16 w-16 rounded-full bg-blue-900 flex items-center justify-center">
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-yellow-400 text-blue-900 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
