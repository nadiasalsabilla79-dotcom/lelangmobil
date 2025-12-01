# 🚀 Quick Start Guide

Panduan cepat untuk menjalankan LelangMobil dalam 5 menit!

## Prerequisites

Pastikan Anda sudah menginstall:
- ✅ Node.js 18+ atau 20+ ([Download](https://nodejs.org/))
- ✅ pnpm (optional, tapi recommended)

## Instalasi Super Cepat (Windows)

### Opsi 1: Menggunakan Script Otomatis

1. **Double-click file `INSTALL.bat`**
   - Script akan otomatis menginstall semua dependencies
   - Tunggu hingga selesai (±3-5 menit)

2. **Double-click file `START.bat`**
   - Server akan berjalan di http://localhost:3000
   - Browser akan otomatis terbuka

### Opsi 2: Manual Installation

```bash
# 1. Install dependencies
pnpm install
# atau jika tidak punya pnpm:
npm install

# 2. Jalankan development server
pnpm dev
# atau:
npm run dev

# 3. Buka browser
# http://localhost:3000
```

## 🎯 Demo Accounts

### User Account (Sudah KYC & Ada Saldo)
```
Email: budi@gmail.com
Password: password123
Saldo: Rp 25.000.000
Status: KYC Approved
```

### Admin Account
```
Email: admin@lelangmobil.com
Password: password123
Role: Administrator
```

### User Lain (Belum KYC)
```
Email: siti@gmail.com
Password: password123

Email: ahmad@gmail.com
Password: password123
```

## 📱 Fitur yang Bisa Dicoba

### Sebagai User (budi@gmail.com)

1. **Dashboard**
   - Lihat statistik akun
   - Cek saldo wallet
   - Lihat status KYC

2. **Lelang**
   - Browse lelang yang sedang berlangsung
   - Filter berdasarkan merek, lokasi, harga
   - Lihat detail mobil dengan galeri foto
   - Pasang bid pada lelang aktif

3. **Wallet**
   - Lihat saldo dan transaksi
   - Deposit saldo (upload bukti transfer)
   - Tarik saldo ke rekening bank

4. **KYC**
   - Sudah terverifikasi (dapat bonus Rp 1jt)
   - Lihat status verifikasi

5. **Notifikasi**
   - Lihat notifikasi bid, transaksi, dll

### Sebagai Admin (admin@lelangmobil.com)

1. **Dashboard Admin**
   - Lihat statistik platform
   - Monitor aktivitas

2. **User Management**
   - Lihat semua user
   - Edit user data

3. **KYC Approval**
   - Review KYC submissions
   - Approve/Reject verifikasi
   - Lihat foto KTP & selfie

4. **Transaction Management**
   - Approve deposit requests
   - Process withdraw requests
   - Lihat bukti transfer

5. **Auction Management**
   - Buat lelang baru
   - Edit lelang existing
   - Monitor bid activity

6. **Car Management**
   - Tambah mobil baru
   - Edit data mobil
   - Upload foto mobil

7. **Reports**
   - Laporan keuangan
   - Statistik lelang
   - User analytics

## 🎨 Fitur UI/UX

- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Dark mode ready (tinggal toggle)
- ✅ Smooth animations
- ✅ Loading states
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Form validation
- ✅ Image gallery
- ✅ Real-time countdown timer
- ✅ Search & filter
- ✅ Pagination ready

## 🔥 Tips & Tricks

### 1. Test Flow Lengkap

**User Flow:**
```
Register → Login → KYC → Deposit → Browse Lelang → Bid → Win
```

**Admin Flow:**
```
Login → Approve KYC → Approve Deposit → Create Auction → Monitor Bids
```

### 2. Test Responsive

- Buka DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test di berbagai ukuran layar

### 3. Test Different States

- Loading states
- Error states
- Empty states
- Success states

### 4. Explore Components

Semua komponen UI ada di:
```
components/ui/
```

Coba explore dan customize sesuai kebutuhan!

## 🐛 Troubleshooting

### Port 3000 sudah digunakan?
```bash
# Gunakan port lain
pnpm dev -- -p 3001
```

### Dependencies error?
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
pnpm install
```

### Tailwind classes tidak muncul?
```bash
# Restart dev server
# Ctrl+C untuk stop
pnpm dev
```

### Images tidak muncul?
- Pastikan file ada di folder `/public`
- Check path nya benar (case-sensitive)

### Store tidak persist?
- Check browser localStorage
- Clear cache jika perlu
- Pastikan tidak dalam incognito mode

## 📚 Next Steps

Setelah familiar dengan aplikasi:

1. **Baca dokumentasi lengkap**
   - README.md
   - API_DOCUMENTATION.md
   - CONTRIBUTING.md

2. **Explore kode**
   - Lihat struktur folder
   - Baca comments di kode
   - Pahami flow aplikasi

3. **Customize**
   - Ubah warna brand
   - Tambah fitur baru
   - Improve UI/UX

4. **Deploy**
   - Build untuk production
   - Deploy ke Vercel/Netlify
   - Setup domain

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Radix UI](https://www.radix-ui.com/)

## 💬 Need Help?

- 📧 Email: support@lelangmobil.com
- 💬 Discord: [Join our Discord]
- 🐛 Issues: [GitHub Issues]

---

**Selamat mencoba! Happy coding! 🚀**
