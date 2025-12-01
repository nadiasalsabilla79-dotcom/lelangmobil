# Setup Guide - LelangMobil

Panduan lengkap untuk mengaktifkan LelangMobil di localhost dengan database HeidiSQL.

## Langkah 1: Setup Database MySQL

### Menggunakan HeidiSQL

1. Buka HeidiSQL
2. Klik "New" untuk membuat koneksi baru
3. Isi detail koneksi:
   - Network type: MySQL (TCP/IP)
   - Hostname: localhost
   - User: root
   - Password: (kosongkan jika default)
   - Port: 3306
4. Klik "Open"
5. Klik kanan pada sidebar > "Create new" > "Database"
6. Nama database: `lelangmobil`
7. Charset: `utf8mb4`
8. Collation: `utf8mb4_unicode_ci`
9. Klik "OK"

### Atau menggunakan XAMPP

1. Buka XAMPP Control Panel
2. Start Apache dan MySQL
3. Klik "Admin" pada MySQL (akan membuka phpMyAdmin)
4. Klik "New" untuk membuat database baru
5. Nama database: `lelangmobil`
6. Collation: `utf8mb4_unicode_ci`
7. Klik "Create"

## Langkah 2: Install Dependencies

Buka terminal di folder project:

```bash
# Install dependencies
pnpm install

# Atau jika menggunakan npm
npm install
```

## Langkah 3: Setup Environment

File `.env` sudah tersedia. Pastikan isinya sesuai:

```env
DATABASE_URL="mysql://root:@localhost:3306/lelangmobil"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

Jika MySQL Anda menggunakan password, ubah menjadi:
```env
DATABASE_URL="mysql://root:PASSWORD@localhost:3306/lelangmobil"
```

## Langkah 4: Setup Database Schema

```bash
# Generate Prisma Client
pnpm prisma generate

# Push schema ke database
pnpm db:push
```

Anda akan melihat output seperti:
```
Your database is now in sync with your Prisma schema.
```

## Langkah 5: Seed Database

```bash
# Isi database dengan data awal
pnpm db:seed
```

Output yang akan muncul:
```
Starting database seed...
Database seeded successfully!

Admin Account:
   Email: admin@lelangmobil.com
   Password: password123

User Account:
   Email: budi@gmail.com
   Password: password123
```

## Langkah 6: Jalankan Development Server

```bash
pnpm dev
```

Server akan berjalan di: http://localhost:3000

## Langkah 7: Verifikasi Database

### Menggunakan HeidiSQL:
1. Buka HeidiSQL
2. Pilih database `lelangmobil`
3. Anda akan melihat tabel-tabel:
   - User
   - Wallet
   - Car
   - Auction
   - Bid
   - Transaction
   - Notification

### Menggunakan Prisma Studio:
```bash
pnpm db:studio
```
Akan membuka GUI di http://localhost:5555

## Langkah 8: Test Login

1. Buka http://localhost:3000
2. Klik "Masuk"
3. Login dengan:
   - Email: admin@lelangmobil.com
   - Password: password123

Atau login sebagai user:
   - Email: budi@gmail.com
   - Password: password123

## Troubleshooting

### Error: Can't reach database server

**Penyebab**: MySQL server tidak berjalan

**Solusi**:
- Jika menggunakan XAMPP: Start MySQL di XAMPP Control Panel
- Jika menggunakan MySQL standalone: Jalankan MySQL service
- Windows: `net start MySQL80` (sesuaikan versi)

### Error: Access denied for user 'root'@'localhost'

**Penyebab**: Password MySQL salah

**Solusi**: Update file `.env`:
```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/lelangmobil"
```

### Error: Unknown database 'lelangmobil'

**Penyebab**: Database belum dibuat

**Solusi**: Buat database di HeidiSQL atau phpMyAdmin (lihat Langkah 1)

### Error: Port 3000 already in use

**Penyebab**: Port 3000 sudah digunakan aplikasi lain

**Solusi**: Gunakan port lain:
```bash
PORT=3001 pnpm dev
```

### Error: Prisma Client not generated

**Solusi**:
```bash
pnpm prisma generate
```

## Struktur Database

### User Table
- id, email, password, name, phone
- role (USER/ADMIN)
- kycStatus (PENDING/APPROVED/REJECTED)
- kycKtpUrl, kycSelfieUrl

### Wallet Table
- id, userId
- balance (saldo tersedia)
- holdBalance (saldo ditahan)

### Car Table
- id, brand, model, year, color
- transmission, fuelType, odometer
- location, grade, description, images

### Auction Table
- id, carId, title
- startPrice, currentPrice, minIncrement
- startTime, endTime, status
- winnerId, totalBids

### Bid Table
- id, auctionId, userId
- amount, isWinning

### Transaction Table
- id, userId, type, amount
- status, bankName, accountNumber
- proofUrl, notes

### Notification Table
- id, userId, title, message
- type, isRead, link

## Fitur yang Sudah Aktif

- [x] Login & Register dengan JWT
- [x] Database MySQL dengan Prisma
- [x] Logo modern SVG (tanpa emoji)
- [x] UI modern 2025 dengan glassmorphism
- [x] API Routes untuk auth
- [x] API Routes untuk auctions
- [x] API Routes untuk bidding
- [x] Seed data awal

## Next Steps

Setelah setup berhasil, Anda bisa:

1. Explore fitur-fitur yang ada
2. Test login sebagai admin dan user
3. Lihat data di HeidiSQL atau Prisma Studio
4. Mulai development fitur baru
5. Customize sesuai kebutuhan

## Perintah Berguna

```bash
# Development
pnpm dev                 # Jalankan dev server
pnpm build              # Build untuk production
pnpm start              # Jalankan production server

# Database
pnpm db:push            # Push schema ke database
pnpm db:seed            # Seed database
pnpm db:studio          # Buka Prisma Studio
pnpm prisma generate    # Generate Prisma Client

# Prisma Commands
pnpm prisma migrate dev # Buat migration baru
pnpm prisma migrate reset # Reset database
pnpm prisma db pull     # Pull schema dari database
```

## Support

Jika ada masalah, check:
1. MySQL server berjalan
2. Database `lelangmobil` sudah dibuat
3. File `.env` sudah benar
4. Dependencies sudah terinstall
5. Prisma Client sudah di-generate

---

Selamat menggunakan LelangMobil!
