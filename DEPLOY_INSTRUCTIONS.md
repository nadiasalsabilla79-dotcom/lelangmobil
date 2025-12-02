# 🚀 AUTO DEPLOY TO VERCEL - 100% OTOMATIS

## Cara Deploy Otomatis:

### Option 1: Script Otomatis
```bash
AUTO_DEPLOY_VERCEL.bat
```

### Option 2: Manual Commands
```bash
# Install Vercel CLI
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy otomatis
vercel --prod --yes
```

## Environment Variables di Vercel:
Tambahkan di Vercel Dashboard:

```
DATABASE_URL=postgresql://neondb_owner:npg_27YdhJjqWurU@ep-blue-surf-ado4gpn9-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=lelangmobil-production-jwt-secret-key-2025-secure-random-string
NEXT_PUBLIC_APP_URL=https://lelangmobil.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=jamila.lelangmobil@gmail.com
SMTP_PASS=lelangmobil2025app
```

## ✅ Website akan live di:
https://lelangmobil.vercel.app