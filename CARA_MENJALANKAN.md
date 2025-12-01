# 🚀 CARA MENJALANKAN WEBSITE LELANGMOBIL

## ⚡ QUICK START (5 MENIT)

### Step 1: Buka Terminal/CMD
```bash
cd "d:\New folder (15)"
```

### Step 2: Install Dependencies (Jika belum)
```bash
npm install
# atau
pnpm install
```

### Step 3: Setup Database (Jika belum)
```bash
npm run db:push
npm run db:seed
```

### Step 4: Jalankan Website
```bash
npm run dev
```

### Step 5: Buka Browser
```
http://localhost:3000
```

---

## 🌐 CARA MELIHAT ONLINE

### Opsi 1: Deploy ke Vercel (GRATIS & CEPAT)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login ke Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Ikuti instruksi**, website akan online dalam 2-3 menit!

5. **Anda akan dapat URL seperti:**
```
https://lelangmobil-xxx.vercel.app
```

---

### Opsi 2: Ngrok (Instant Online)

1. **Download ngrok** dari https://ngrok.com/download

2. **Jalankan website dulu**
```bash
npm run dev
```

3. **Di terminal baru, jalankan ngrok**
```bash
ngrok http 3000
```

4. **Anda akan dapat URL publik:**
```
https://xxxx-xx-xx-xx-xx.ngrok-free.app
```

---

### Opsi 3: Netlify (GRATIS)

1. **Install Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **Build website**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod
```

---

## 📱 AKSES DARI HP/DEVICE LAIN

### Cara 1: Gunakan IP Lokal

1. **Cari IP komputer Anda**
```bash
ipconfig
# Cari IPv4 Address, contoh: 192.168.1.100
```

2. **Jalankan website**
```bash
npm run dev
```

3. **Akses dari HP/device lain di jaringan yang sama**
```
http://192.168.1.100:3000
```

---

## 🎯 DEMO ACCOUNTS

### User Account:
```
Email: budi@gmail.com
Password: password123
```

### Admin Account:
```
Email: admin@lelangmobil.com
Password: password123
```

---

## 🔥 REKOMENDASI TERCEPAT

**Gunakan Vercel** (2-3 menit):

```bash
# 1. Install Vercel
npm i -g vercel

# 2. Deploy
vercel

# 3. Ikuti instruksi
# 4. Website online!
```

**Atau gunakan Ngrok** (1 menit):

```bash
# 1. Jalankan website
npm run dev

# 2. Di terminal baru
ngrok http 3000

# 3. Copy URL yang muncul
# 4. Share ke siapa saja!
```

---

## 📸 SCREENSHOT PREVIEW

Website Anda memiliki:
- ✅ Homepage dengan 13 sections modern
- ✅ Login/Register dengan glassmorphism
- ✅ Dashboard dengan 3D cards
- ✅ Wallet dengan neon effects
- ✅ Admin panel lengkap
- ✅ Semua fitur 2025 modern

---

## 🆘 TROUBLESHOOTING

### Error: Port 3000 sudah digunakan
```bash
# Gunakan port lain
PORT=3001 npm run dev
```

### Error: Database connection
```bash
# Pastikan MySQL running
# Check .env file
```

### Error: Module not found
```bash
# Install ulang
npm install
```

---

## 💡 TIPS

1. **Untuk demo cepat**: Gunakan ngrok
2. **Untuk production**: Gunakan Vercel
3. **Untuk testing**: Gunakan localhost
4. **Untuk share**: Gunakan IP lokal atau ngrok

---

## 🎉 SELAMAT MENCOBA!

Website Anda sudah 100% siap dan modern 2025!

**Support**: Jika ada masalah, cek dokumentasi atau hubungi support.
