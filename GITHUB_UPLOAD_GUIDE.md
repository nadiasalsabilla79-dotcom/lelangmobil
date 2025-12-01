# 🚀 UPLOAD LELANGMOBIL KE GITHUB

## Step 1: Install Git
Download Git dari: https://git-scm.com/download/win

## Step 2: Buka Command Prompt di folder project
```cmd
cd "c:\Users\opc\Desktop\New folder (15)"
```

## Step 3: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit - LelangMobil Platform"
```

## Step 4: Create GitHub Repository
1. Buka https://github.com
2. Login ke akun GitHub
3. Klik "New Repository"
4. Nama: `lelangmobil`
5. Description: `Platform Lelang Mobil Online - Next.js 15`
6. Public/Private: Pilih sesuai kebutuhan
7. Klik "Create Repository"

## Step 5: Connect & Push
```bash
git remote add origin https://github.com/USERNAME/lelangmobil.git
git branch -M main
git push -u origin main
```

## Step 6: Vercel Auto Deploy
1. Login ke https://vercel.com
2. Import Git Repository
3. Select GitHub → lelangmobil
4. Deploy

## Environment Variables untuk Vercel:
```env
DATABASE_URL=mysql://username:password@host:3306/lelangmobil
NEXT_PUBLIC_APP_URL=https://lelangmobil.vercel.app
JWT_SECRET=lelangmobil-production-jwt-secret-key-2025-secure
```

## ✅ READY TO UPLOAD!

Ganti `USERNAME` dengan username GitHub Anda.