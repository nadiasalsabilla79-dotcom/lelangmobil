# 🚀 QUICK START GUIDE - LelangMobil

## 📋 Panduan Cepat Memulai Website

### 1️⃣ Persiapan Awal

#### Install Dependencies
```bash
# Menggunakan pnpm (recommended)
pnpm install

# Atau menggunakan npm
npm install
```

#### Setup Database
1. Buka HeidiSQL atau MySQL client
2. Buat database baru:
```sql
CREATE DATABASE lelangmobil CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Setup Environment
File `.env` sudah tersedia di root folder. Pastikan konfigurasi sesuai:
```env
DATABASE_URL="mysql://root:@localhost:3306/lelangmobil"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

---

### 2️⃣ Inisialisasi Database

```bash
# Push schema ke database
pnpm db:push

# Isi database dengan data demo
pnpm db:seed
```

---

### 3️⃣ Jalankan Development Server

```bash
pnpm dev
```

Buka browser dan akses: **http://localhost:3000**

---

## 🎯 AKUN DEMO

### 👤 User Account
```
Email: budi@gmail.com
Password: password123
Status: KYC Approved
Saldo: Rp 25.000.000
```

### 👨‍💼 Admin Account
```
Email: admin@lelangmobil.com
Password: password123
Role: Administrator
```

---

## 🗺️ NAVIGASI WEBSITE

### 🏠 Public Pages
- **Homepage**: `/` - Landing page dengan semua section
- **Lelang**: `/lelang` - Daftar semua lelang dengan filter
- **Detail Lelang**: `/lelang/[id]` - Detail mobil dan bid panel
- **Cara Kerja**: `/cara-kerja` - Panduan menggunakan platform
- **Tentang**: `/tentang` - Informasi tentang perusahaan
- **Kontak**: `/kontak` - Form kontak dan info

### 🔐 Auth Pages
- **Login**: `/login` - Halaman login
- **Register**: `/register` - Halaman registrasi

### 💼 User Dashboard
- **Dashboard**: `/dashboard` - Overview akun user
- **Wallet**: `/dashboard/wallet` - Kelola saldo
- **KYC**: `/dashboard/kyc` - Verifikasi identitas
- **Lelang Saya**: `/dashboard/lelang-saya` - Riwayat bid
- **Notifikasi**: `/dashboard/notifikasi` - Notifikasi user
- **Profil**: `/dashboard/profil` - Edit profil

### 👨‍💼 Admin Panel
- **Admin Dashboard**: `/admin` - Overview admin
- **Users**: `/admin/users` - Kelola pengguna
- **KYC**: `/admin/kyc` - Approve KYC
- **Keuangan**: `/admin/keuangan` - Approve transaksi
- **Lelang**: `/admin/lelang` - Kelola lelang
- **Kendaraan**: `/admin/kendaraan` - Kelola mobil
- **Laporan**: `/admin/laporan` - Lihat laporan
- **Pengaturan**: `/admin/pengaturan` - Konfigurasi sistem

---

## 🎨 FITUR UTAMA

### 1. Authentication
- ✅ Register dengan email, nama, phone
- ✅ Login dengan email & password
- ✅ Logout
- ✅ Protected routes

### 2. KYC Verification
- ✅ Upload foto KTP
- ✅ Upload selfie dengan KTP
- ✅ Admin review & approval
- ✅ Bonus Rp 1.000.000 setelah approved

### 3. Wallet System
- ✅ Deposit via bank transfer
- ✅ Upload bukti transfer
- ✅ Withdraw ke rekening bank
- ✅ Transaction history
- ✅ Balance tracking

### 4. Auction System
- ✅ Browse lelang dengan filter
- ✅ Live countdown timer
- ✅ Place bid
- ✅ Bid history
- ✅ Win notification
- ✅ Auto balance hold/release

### 5. Notifications
- ✅ Real-time notifications
- ✅ Unread count badge
- ✅ Multiple notification types
- ✅ Mark as read

---

## 🔄 WORKFLOW USER

### Alur Lengkap User Baru

1. **Register Akun**
   - Kunjungi `/register`
   - Isi form registrasi
   - Klik "Daftar Sekarang"
   - Redirect ke `/dashboard/kyc`

2. **Verifikasi KYC**
   - Upload foto KTP
   - Upload selfie dengan KTP
   - Submit untuk review
   - Tunggu approval admin

3. **Admin Approve KYC**
   - Admin login ke `/admin/kyc`
   - Review dokumen user
   - Approve KYC
   - Bonus Rp 1.000.000 otomatis masuk wallet

4. **Top Up Saldo (Optional)**
   - Kunjungi `/dashboard/wallet`
   - Klik "Deposit Saldo"
   - Pilih bank & nominal
   - Upload bukti transfer
   - Tunggu approval admin

5. **Ikut Lelang**
   - Browse lelang di `/lelang`
   - Pilih mobil yang diinginkan
   - Klik "Ikut Lelang Sekarang"
   - Masukkan nominal bid
   - Confirm bid
   - Saldo akan di-hold

6. **Menang Lelang**
   - Jika menang, dapat notifikasi
   - Saldo hold dipotong
   - Mobil menjadi milik user

7. **Kalah Lelang**
   - Jika kalah, dapat notifikasi
   - Saldo hold dikembalikan
   - Bisa ikut lelang lain

---

## 🔄 WORKFLOW ADMIN

### Alur Admin Mengelola Platform

1. **Login Admin**
   - Kunjungi `/login`
   - Login dengan akun admin
   - Redirect ke `/admin`

2. **Approve KYC**
   - Kunjungi `/admin/kyc`
   - Review dokumen pending
   - Approve atau Reject
   - Bonus otomatis diberikan jika approve

3. **Approve Deposit**
   - Kunjungi `/admin/keuangan`
   - Tab "Deposit"
   - Review bukti transfer
   - Approve atau Reject
   - Saldo otomatis ditambahkan jika approve

4. **Approve Withdraw**
   - Kunjungi `/admin/keuangan`
   - Tab "Penarikan"
   - Review request withdraw
   - Transfer ke rekening user
   - Approve setelah transfer

5. **Kelola Lelang**
   - Kunjungi `/admin/lelang`
   - Buat lelang baru
   - Set start & end time
   - Set starting price & increment
   - Publish lelang

6. **Kelola Mobil**
   - Kunjungi `/admin/kendaraan`
   - Tambah mobil baru
   - Upload foto mobil
   - Isi spesifikasi lengkap
   - Save mobil

7. **Lihat Laporan**
   - Kunjungi `/admin/laporan`
   - Lihat statistik
   - Export data
   - Analisis performa

---

## 🎯 TESTING SCENARIOS

### Scenario 1: User Baru Register & KYC
1. Register akun baru
2. Submit KYC
3. Login sebagai admin
4. Approve KYC
5. Cek wallet user (harus ada bonus Rp 1.000.000)

### Scenario 2: Deposit & Withdraw
1. Login sebagai user
2. Request deposit Rp 5.000.000
3. Upload bukti transfer
4. Login sebagai admin
5. Approve deposit
6. Cek wallet user (saldo bertambah)
7. Request withdraw Rp 2.000.000
8. Admin approve withdraw
9. Cek wallet user (saldo berkurang)

### Scenario 3: Ikut Lelang & Menang
1. Login sebagai user
2. Browse lelang aktif
3. Pilih lelang
4. Place bid
5. Cek wallet (saldo di-hold)
6. Tunggu lelang selesai
7. Jika menang, cek notifikasi
8. Cek wallet (saldo hold dipotong)

### Scenario 4: Ikut Lelang & Kalah
1. Login sebagai user
2. Place bid di lelang
3. User lain bid lebih tinggi
4. Cek notifikasi (outbid alert)
5. Lelang selesai
6. Cek wallet (saldo hold dikembalikan)

---

## 🐛 TROUBLESHOOTING

### Issue: Database connection failed
**Solution**:
1. Pastikan MySQL server berjalan
2. Check kredensial di `.env`
3. Pastikan database `lelangmobil` sudah dibuat

### Issue: Prisma Client not generated
**Solution**:
```bash
pnpm prisma generate
```

### Issue: Port 3000 already in use
**Solution**:
```bash
# Gunakan port lain
PORT=3001 pnpm dev
```

### Issue: Images not loading
**Solution**:
1. Pastikan folder `public/` ada
2. Check path image di code
3. Restart dev server

### Issue: Tailwind classes tidak muncul
**Solution**:
1. Check `postcss.config.mjs`
2. Pastikan menggunakan `@tailwindcss/postcss`
3. Restart dev server

---

## 📊 DATABASE COMMANDS

```bash
# Generate Prisma Client
pnpm prisma generate

# Push schema ke database
pnpm db:push

# Open Prisma Studio (Database GUI)
pnpm db:studio

# Seed database dengan data demo
pnpm db:seed

# Reset database (HATI-HATI!)
pnpm prisma db push --force-reset
```

---

## 🚀 BUILD & DEPLOYMENT

### Build untuk Production
```bash
# Build aplikasi
pnpm build

# Test production build locally
pnpm start
```

### Deploy ke Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables untuk Production
```env
DATABASE_URL="mysql://user:password@host:3306/database"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
JWT_SECRET="your-super-secret-production-key"
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

---

## 🎨 COLOR PALETTE

```css
/* Primary Colors */
--navy: #1e3a5f          /* Brand color */
--navy-light: #2c5282    /* Hover states */
--gold: #d4af37          /* Accent color */

/* Status Colors */
--success: #10b981       /* Success states */
--warning: #f59e0b       /* Warning states */
--destructive: #ef4444   /* Error states */

/* Neutral Colors */
--background: #ffffff    /* Page background */
--foreground: #0a0a0a    /* Text color */
--muted: #f5f5f5        /* Muted background */
--border: #e5e5e5       /* Border color */
```

---

## 🔗 USEFUL LINKS

- **Documentation**: `/docs`
- **API Docs**: `/api/docs`
- **Prisma Studio**: `http://localhost:5555`
- **GitHub**: `https://github.com/yourusername/lelangmobil`

---

## 📞 SUPPORT

Butuh bantuan? Hubungi:
- **Email**: support@lelangmobil.com
- **WhatsApp**: +62 21 1234 5678
- **Live Chat**: Klik icon chat di pojok kanan bawah

---

## ✅ CHECKLIST SEBELUM PRODUCTION

- [ ] Environment variables configured
- [ ] Database migrated & seeded
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Error tracking enabled
- [ ] Analytics integrated
- [ ] Backup strategy implemented
- [ ] Security audit completed
- [ ] Performance testing done
- [ ] User acceptance testing passed

---

**Happy Coding! 🚀**

Last Updated: 2024
Version: 1.0.0
