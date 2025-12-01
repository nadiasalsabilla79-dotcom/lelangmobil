# 📧 CLOUDFLARE DNS SETUP - LELANGMOBIL.COM EMAIL

## 🎯 Required DNS Records for Email

### **MX Records (Mail Exchange)**
```
Type: MX
Name: @
Content: mail.lelangmobil.com
Priority: 10
Proxy: DNS Only (Gray Cloud)
```

### **A Records (Mail Server)**
```
Type: A
Name: mail
Content: YOUR_SERVER_IP (e.g., 192.168.1.100)
Proxy: DNS Only (Gray Cloud)
```

### **TXT Records (SPF - Sender Policy Framework)**
```
Type: TXT
Name: @
Content: v=spf1 include:_spf.google.com include:mail.lelangmobil.com ~all
```

### **TXT Records (DKIM - DomainKeys Identified Mail)**
```
Type: TXT
Name: default._domainkey
Content: v=DKIM1; k=rsa; p=YOUR_DKIM_PUBLIC_KEY
```

### **TXT Records (DMARC - Domain-based Message Authentication)**
```
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=quarantine; rua=mailto:dmarc@lelangmobil.com; ruf=mailto:dmarc@lelangmobil.com; fo=1
```

## 🔧 Email Accounts Setup

### **Primary Email Accounts:**
- `noreply@lelangmobil.com` - System notifications
- `support@lelangmobil.com` - Customer support
- `admin@lelangmobil.com` - Admin notifications
- `info@lelangmobil.com` - General inquiries

### **SMTP Configuration:**
```
Host: mail.lelangmobil.com
Port: 587 (STARTTLS) or 465 (SSL)
Username: noreply@lelangmobil.com
Password: LelangMobil2025!Secure
```

## 🚀 Alternative: Use Cloudflare Email Routing

### **Step 1: Enable Email Routing**
1. Go to Cloudflare Dashboard
2. Select lelangmobil.com domain
3. Go to Email → Email Routing
4. Click "Enable Email Routing"

### **Step 2: Add Email Routes**
```
noreply@lelangmobil.com → your-gmail@gmail.com
support@lelangmobil.com → your-gmail@gmail.com
admin@lelangmobil.com → your-gmail@gmail.com
```

### **Step 3: Update Environment Variables**
```env
# Use Gmail SMTP with custom FROM address
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="LelangMobil <noreply@lelangmobil.com>"
```

## ✅ Verification Steps

### **1. Test MX Record:**
```bash
nslookup -type=MX lelangmobil.com
```

### **2. Test SPF Record:**
```bash
nslookup -type=TXT lelangmobil.com
```

### **3. Test Email Sending:**
Use the API endpoint: `POST /api/email/test`
```json
{
  "to": "test@example.com",
  "subject": "Test Email",
  "message": "This is a test email from LelangMobil"
}
```

## 🎯 Recommended: Cloudflare Email Routing + Gmail SMTP

**Advantages:**
- ✅ Free email routing
- ✅ Professional email addresses
- ✅ Reliable Gmail SMTP
- ✅ Easy setup
- ✅ No server maintenance

**Setup:**
1. Enable Cloudflare Email Routing
2. Route all emails to your Gmail
3. Use Gmail SMTP with custom FROM addresses
4. Professional appearance with domain emails