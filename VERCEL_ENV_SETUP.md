# VERCEL ENVIRONMENT VARIABLES SETUP

## CRITICAL: Set these in Vercel Dashboard

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables:

### Database
```
DATABASE_URL=postgresql://neondb_owner:npg_27YdhJjqWurU@ep-blue-surf-ado4gpn9-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### App Configuration
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=LelangMobil
NODE_ENV=production
```

### Security
```
JWT_SECRET=lelangmobil-production-jwt-secret-key-2025-secure-random-string
```

### Email (Optional)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=jamila.lelangmobil@gmail.com
SMTP_PASS=lelangmobil2025app
SMTP_FROM=LelangMobil <noreply@lelangmobil.com>
```

## After Setting Environment Variables:

1. Go to Vercel Dashboard
2. Click "Deployments" tab
3. Click "Redeploy" on latest deployment
4. Build should succeed now

## Database Setup (After Successful Deploy):

Run this command to seed database:
```bash
npx prisma db push
npx prisma db seed
```

Or use Vercel CLI:
```bash
vercel env pull
npm run db:push
npm run db:seed
```
