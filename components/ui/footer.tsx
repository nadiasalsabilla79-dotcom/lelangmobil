import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xl">
                L
              </div>
              <span className="font-serif text-2xl font-bold">LelangMobil</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Platform lelang mobil online terpercaya di Indonesia. Dapatkan mobil impian Anda dengan harga terbaik.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/lelang" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Lelang Aktif
                </Link>
              </li>
              <li>
                <Link href="/cara-kerja" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Informasi Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/syarat-ketentuan" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-privasi" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/panduan-lelang" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Panduan Lelang
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">Jl. Sudirman No. 123, Jakarta Selatan 12190</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-300">+62 21 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-300">info@lelangmobil.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} LelangMobil.com. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}