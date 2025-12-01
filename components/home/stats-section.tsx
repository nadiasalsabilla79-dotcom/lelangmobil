const stats = [
  { value: "10.000+", label: "Mobil Terjual" },
  { value: "50.000+", label: "Member Aktif" },
  { value: "Rp 500M+", label: "Total Transaksi" },
  { value: "4.9/5", label: "Rating Kepuasan" },
]

export function StatsSection() {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-blue-900 to-blue-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs md:text-sm text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
