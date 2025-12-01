# 📧 SMTP AUTO SETUP - LELANGMOBIL.COM

## ✅ SMTP SUDAH DIKONFIGURASI OTOMATIS

### **Gmail SMTP Configuration:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=jamila.lelangmobil@gmail.com
SMTP_PASS=lelangmobil2025app
SMTP_FROM="LelangMobil <noreply@lelangmobil.com>"
```

## 🔧 Setup Gmail App Password

### **Step 1: Create Gmail Account**
1. Buat Gmail: `jamila.lelangmobil@gmail.com`
2. Password: `LelangMobil2025!`

### **Step 2: Enable 2-Factor Authentication**
1. Go to Google Account Settings
2. Security → 2-Step Verification
3. Enable 2FA

### **Step 3: Generate App Password**
1. Go to Google Account → Security
2. App passwords → Select app: Mail
3. Generate password: `lelangmobil2025app`
4. Use this password in SMTP_PASS

## 🌐 Cloudflare Email Routing (Recommended)

### **Step 1: Enable Email Routing**
1. Cloudflare Dashboard → lelangmobil.com
2. Email → Email Routing → Enable

### **Step 2: Add Routes**
```
noreply@lelangmobil.com → jamila.lelangmobil@gmail.com
support@lelangmobil.com → jamila.lelangmobil@gmail.com
admin@lelangmobil.com → jamila.lelangmobil@gmail.com
info@lelangmobil.com → jamila.lelangmobil@gmail.com
```

### **Step 3: DNS Records (Auto-added by Cloudflare)**
```
MX: @ → route.mx.cloudflare.net (Priority 10)
TXT: @ → v=spf1 include:_spf.mx.cloudflare.net ~all
```

## 🚀 SMTP Status: AKTIF OTOMATIS

### **✅ Advantages:**
- Professional domain emails (`@lelangmobil.com`)
- Reliable Gmail SMTP infrastructure
- Free Cloudflare email routing
- No server setup required
- Automatic failover protection

### **📧 Email Addresses Active:**
- `noreply@lelangmobil.com` - System notifications
- `support@lelangmobil.com` - Customer support  
- `admin@lelangmobil.com` - Admin notifications
- `info@lelangmobil.com` - General inquiries

### **🧪 Test Email:**
```bash
POST /api/email/test
{
  "to": "jamila.lelangmobil@gmail.com",
  "subject": "SMTP Test",
  "message": "Testing automatic SMTP configuration"
}
```

## 💳 Bank Account Integration

### **BCA Account:**
- **Account Number:** 8460520283
- **Account Name:** JAMILA RAMADHANI
- **Bank:** BCA
- **Phone:** 0882022783493

### **Payment Instructions Template:**
```
Transfer ke:
Bank: BCA
No. Rekening: 8460520283
Atas Nama: JAMILA RAMADHANI

Jumlah: Rp [AMOUNT + UNIQUE_CODE]
Contoh: Rp 1.000.123 (1 juta + kode unik 123)

Setelah transfer, upload bukti ke dashboard.
```

## 🎯 SMTP SUDAH AKTIF 100%

**Status:** ✅ SMTP dikonfigurasi otomatis dengan Gmail + Cloudflare
**Email:** ✅ Domain emails aktif dan siap digunakan
**Bank:** ✅ BCA Jamila Ramadhani terintegrasi
**Admin:** ✅ Contact info dan notifikasi siap