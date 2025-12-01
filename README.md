# LelangMobil - Platform Lelang Mobil Online

Platform lelang mobil online terpercaya di Indonesia. Dapatkan mobil impian dengan harga terbaik melalui sistem lelang yang transparan, aman, dan mudah.

## Fitur Utama

### User Features
- Autentikasi - Login & Register dengan validasi
- KYC Verification - Verifikasi identitas dengan upload KTP & Selfie
- Wallet System - Deposit & Withdraw saldo
- Live Auction - Ikut lelang real-time dengan countdown timer
- Bid Management - Pasang bid, lihat riwayat bid
- Notifikasi - Notifikasi real-time untuk bid, KYC, transaksi
- Dashboard - Pantau aktivitas dan statistik
- Filter & Search - Cari mobil berdasarkan merek, lokasi, harga

### Admin Features
- User Management - Kelola pengguna
- KYC Approval - Approve/Reject verifikasi KYC
- Transaction Management - Approve deposit & withdraw
- Auction Management - Buat dan kelola lelang
- Car Management - Tambah dan edit data mobil
- Reports - Laporan keuangan dan statistik
- Settings - Konfigurasi sistem

## Tech Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Database: MySQL (HeidiSQL)
- ORM: Prisma
- Styling: Tailwind CSS v4
- UI Components: Radix UI + shadcn/ui
- State Management: Zustand
- Forms: React Hook Form + Zod
- Icons: Lucide React
- Date: date-fns
- Charts: Recharts
- Authentication: JWT + bcrypt

## Instalasi

### Prerequisites
- Node.js 18+ atau 20+
- MySQL Server (via HeidiSQL atau XAMPP)
- pnpm (recommended) atau npm

### Step 1: Setup Database

1. Buka HeidiSQL dan buat database baru:
```sql
CREATE DATABASE lelangmobil CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Pastikan MySQL server berjalan di localhost:3306

### Step 2: Clone Repository
```bash
git clone <repository-url>
cd lelangmobil
```

### Step 3: Install Dependencies
```bash
# Menggunakan pnpm (recommended)
pnpm install

# Atau menggunakan npm
npm install
```

### Step 4: Setup Environment
Buat file `.env` di root folder (sudah tersedia):
```env
DATABASE_URL="mysql://root:@localhost:3306/lelangmobil"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

Sesuaikan `DATABASE_URL` dengan kredensial MySQL Anda.

### Step 5: Setup Database Schema
```bash
# Push schema ke database
pnpm db:push

# Atau menggunakan npm
npm run db:push
```

### Step 6: Seed Database
```bash
# Isi database dengan data awal
pnpm db:seed

# Atau menggunakan npm
npm run db:seed
```

### Step 7: Jalankan Development Server
```bash
# Menggunakan pnpm
pnpm dev

# Atau menggunakan npm
npm run dev
```

### Step 8: Buka Browser
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Demo Accounts

### User Account
- Email: budi@gmail.com
- Password: password123
- Status: KYC Approved, Saldo Rp 25.000.000

### Admin Account
- Email: admin@lelangmobil.com
- Password: password123
- Role: Administrator

## Struktur Folder

```
lelangmobil/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth pages (login, register)
│   ├── admin/               # Admin dashboard
│   ├── dashboard/           # User dashboard
│   ├── lelang/              # Auction pages
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── auction/            # Auction-related components
│   ├── home/               # Homepage sections
│   ├── ui/                 # UI components (shadcn)
│   └── wallet/             # Wallet components
├── lib/                     # Utilities & helpers
│   ├── utils/              # Utility functions
│   ├── prisma.ts           # Prisma client
│   ├── store.ts            # Zustand stores
│   └── types.ts            # TypeScript types
├── prisma/                  # Database
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
├── public/                  # Static assets
└── middleware.ts            # Next.js middleware
```

## Database Management

### Prisma Commands
```bash
# Generate Prisma Client
pnpm prisma generate

# Push schema changes to database
pnpm db:push

# Open Prisma Studio (Database GUI)
pnpm db:studio

# Seed database
pnpm db:seed
```

### HeidiSQL
Anda dapat menggunakan HeidiSQL untuk:
- Melihat dan mengedit data
- Menjalankan query SQL
- Backup dan restore database
- Monitor performa database

## Fitur Lengkap

### 1. Authentication & Authorization
- Login dengan email & password
- Register akun baru
- Protected routes dengan middleware
- Role-based access (User & Admin)
- JWT token authentication
- Password hashing dengan bcrypt

### 2. KYC Verification
- Upload foto KTP
- Upload selfie dengan KTP
- Admin approval system
- Bonus Rp 1.000.000 setelah KYC approved
- Status tracking (Pending, Approved, Rejected)

### 3. Wallet Management
- Deposit via bank transfer
- Upload bukti transfer
- Withdraw ke rekening bank
- Transaction history
- Balance tracking (Available & Hold)
- Multi-bank support (BCA, Mandiri, BRI, BNI)
- Admin approval workflow

### 4. Auction System
- Live auction dengan countdown timer
- Real-time bid updates
- Minimum bid increment
- Bid history
- Auto-refresh timer
- Auction status (Draft, Upcoming, Live, Ended)
- Winner announcement
- Automatic balance hold/release

### 5. Car Listing
- Detailed car specifications
- Multiple images gallery
- Car grading system (A, B, C)
- Location-based filtering
- Brand & model filtering
- Transmission & fuel type filters
- Odometer & year information

### 6. Dashboard
- User statistics
- Active bids tracking
- Won auctions
- Wallet balance overview
- Quick actions
- Account status

### 7. Admin Panel
- User management
- KYC approval workflow
- Transaction approval
- Auction management
- Car inventory management
- Financial reports
- System settings

### 8. Notifications
- Real-time notifications
- Unread count badge
- Notification types:
  - KYC approved/rejected
  - Deposit approved/rejected
  - Withdraw completed
  - Outbid alert
  - Auction won
  - Auction started
  - Bonus received

### 9. Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop layout
- Touch-friendly UI
- Mobile navigation drawer

### 10. Modern UI/UX
- Clean & professional design
- Glassmorphism effects
- Smooth animations
- Loading states
- Error handling
- Toast notifications
- Modal dialogs
- Form validation
- Accessibility compliant

## Build untuk Production

```bash
# Build aplikasi
pnpm build

# Jalankan production server
pnpm start
```

## Environment Variables

File `.env` di root folder:

```env
# Database
DATABASE_URL="mysql://root:@localhost:3306/lelangmobil"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="LelangMobil"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Upload
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
UPLOAD_DIR="./public/uploads"
```

## Konfigurasi

### Tailwind CSS v4
Proyek ini menggunakan Tailwind CSS v4 dengan konfigurasi modern:
- CSS-first configuration
- Custom color tokens
- Brand colors (navy, gold, success, warning)
- Responsive breakpoints
- Dark mode support
- Glassmorphism utilities

### TypeScript
- Strict mode enabled
- Path aliases (@/*)
- Type-safe components
- Interface definitions

### Prisma
- Type-safe database queries
- Auto-generated types
- Migration system
- Seeding support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Issue: Database connection failed
**Solution**: 
1. Pastikan MySQL server berjalan
2. Check kredensial di file `.env`
3. Pastikan database `lelangmobil` sudah dibuat

### Issue: Prisma Client not generated
**Solution**: 
```bash
pnpm prisma generate
```

### Issue: Tailwind classes tidak muncul
**Solution**: Pastikan `postcss.config.mjs` menggunakan `@tailwindcss/postcss`

### Issue: Port 3000 already in use
**Solution**: 
```bash
# Gunakan port lain
PORT=3001 pnpm dev
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Developer

Developed by LelangMobil Team

## Support

Untuk bantuan dan pertanyaan:
- Email: support@lelangmobil.com
- WhatsApp: +62 21 1234 5678

---

Happy Coding!
