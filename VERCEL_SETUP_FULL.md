# VERCEL FULL SETUP - 100% OTOMATIS

## LANGKAH 1: Setup Vercel Postgres Database

1. Buka Vercel Dashboard: https://vercel.com/dashboard
2. Pilih project **lelangmobil**
3. Klik tab **Storage**
4. Klik **Create Database**
5. Pilih **Postgres**
6. Klik **Continue**
7. Pilih region: **Washington, D.C. (iad1)** (sama dengan deployment)
8. Klik **Create**
9. Klik **Connect** untuk link database ke project
10. Environment variables akan otomatis ditambahkan:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

## LANGKAH 2: Set Environment Variables Manual

Di **Settings → Environment Variables**, tambahkan:

```
JWT_SECRET=lelangmobil-production-jwt-secret-key-2025-secure-random-string
NEXT_PUBLIC_APP_NAME=LelangMobil
```

**PENTING:** `NEXT_PUBLIC_APP_URL` akan otomatis di-set oleh Vercel

## LANGKAH 3: Update Prisma Schema

Schema sudah siap, tapi pastikan menggunakan `POSTGRES_PRISMA_URL`:

```prisma
datasource db {
  provider = "postgresql"
  url = env("POSTGRES_PRISMA_URL")
}
```

## LANGKAH 4: Redeploy

1. Klik tab **Deployments**
2. Klik **Redeploy** pada deployment terakhir
3. Build akan otomatis run `prisma generate` dan `next build`
4. Tunggu hingga status **Ready**

## LANGKAH 5: Seed Database

Setelah deploy berhasil, seed database dengan 2 cara:

### Cara 1: Via Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull

# Seed database
npm run db:push
npm run db:seed
```

### Cara 2: Via Vercel Postgres Dashboard
1. Buka **Storage → Postgres → Query**
2. Copy-paste SQL dari `SETUP_DATABASE.sql`
3. Klik **Run Query**

## LANGKAH 6: Test Website

1. Buka URL deployment: `https://your-project.vercel.app`
2. Login dengan:
   - Email: `admin@lelangmobil.com`
   - Password: `password123`

## SELESAI! 🎉

Website sudah 100% production ready di Vercel!

## Troubleshooting

### Build Failed?
- Cek **Deployments → Build Logs**
- Pastikan Postgres database sudah connected
- Pastikan environment variables sudah di-set

### Database Connection Error?
- Pastikan menggunakan `POSTGRES_PRISMA_URL` di schema.prisma
- Cek di **Storage → Postgres → Settings** apakah database active

### Login Redirect Loop?
- Clear browser cookies
- Pastikan middleware.ts sudah di-update
- Cek auth-storage cookie di browser DevTools
