# 🚀 Deployment Guide - LelangMobil

## Prerequisites
- Node.js 18+ atau 20+
- npm atau pnpm
- Git

## Environment Variables
Buat file `.env.local` dengan konfigurasi berikut:
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-secret-key
```

## Build & Deploy

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t lelangmobil .
docker run -p 3000:3000 lelangmobil
```

### Manual
```bash
npm run build
npm start
```

## Post-Deployment Checklist
- ✅ Test all pages
- ✅ Verify API endpoints
- ✅ Check authentication
- ✅ Test payment integration
- ✅ Monitor performance
