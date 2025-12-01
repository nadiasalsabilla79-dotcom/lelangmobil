import { Metadata } from "next"

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

export function generateMetadata({
  title = "LelangMobil - Platform Lelang Mobil Online Terpercaya Indonesia",
  description = "Dapatkan mobil impian dengan harga terbaik melalui lelang online. Proses transparan, aman, dan mudah. 50.000+ pelanggan puas di seluruh Indonesia.",
  keywords = "lelang mobil, jual beli mobil, mobil bekas, lelang online, mobil murah, BCA, Mandiri, BRI, BNI",
  image = "/og-image.jpg",
  url = "https://lelangmobil.com"
}: MetaTagsProps = {}): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      type: "website",
      title,
      description,
      images: [{ url: image }],
      url,
      siteName: "LelangMobil"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    },
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1"
  }
}