# 🚀 DEPLOYMENT GUIDE - RDP + DOMAIN lelangmobil.com

## 📋 CHECKLIST PERSIAPAN

### 1. Software yang Harus Diinstall di RDP:
- [ ] Node.js 20.x LTS (https://nodejs.org)
- [ ] MySQL Server 8.0+ (https://dev.mysql.com/downloads/mysql/)
- [ ] Git (https://git-scm.com/download/win)
- [ ] PM2 (npm install -g pm2)
- [ ] Nginx atau IIS (Web Server)

---

## 🔧 STEP 1: INSTALL NODE.JS DI RDP

### Download & Install:
```powershell
# Download Node.js 20.x LTS dari:
https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi

# Install dengan default settings
# Centang "Automatically install necessary tools"
```

### Verifikasi:
```powershell
node --version
# Output: v20.11.0

npm --version
# Output: 10.2.4
```

---

## 🗄️ STEP 2: SETUP MYSQL DI RDP

### Install MySQL:
```powershell
# Download MySQL Installer:
https://dev.mysql.com/downloads/installer/

# Pilih: mysql-installer-community-8.0.xx.msi
# Install Type: Developer Default
# Set root password: (catat password ini!)
```

### Buat Database:
```sql
# Buka MySQL Command Line atau HeidiSQL

CREATE DATABASE lelangmobil CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Buat user khusus (optional, lebih aman):
CREATE USER 'lelanguser'@'localhost' IDENTIFIED BY 'password_kuat_123';
GRANT ALL PRIVILEGES ON lelangmobil.* TO 'lelanguser'@'localhost';
FLUSH PRIVILEGES;
```

---

## 📁 STEP 3: UPLOAD PROJECT KE RDP

### Opsi A: Via Git (Recommended)
```powershell
# Di RDP, buka PowerShell
cd C:\inetpub\wwwroot

# Clone repository
git clone <your-repo-url> lelangmobil
cd lelangmobil

# Install dependencies
npm install
```

### Opsi B: Via FTP/Copy Manual
```powershell
# Copy folder project ke:
C:\inetpub\wwwroot\lelangmobil

# Atau lokasi lain sesuai kebutuhan:
D:\websites\lelangmobil
```

---

## ⚙️ STEP 4: KONFIGURASI ENVIRONMENT

### Buat file .env.production:
```env
# Database
DATABASE_URL="mysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/lelangmobil"

# App
NEXT_PUBLIC_APP_URL="https://lelangmobil.com"
NEXT_PUBLIC_APP_NAME="LelangMobil"
NODE_ENV="production"

# JWT Secret (GANTI DENGAN RANDOM STRING!)
JWT_SECRET="ganti-dengan-random-string-panjang-minimal-32-karakter"

# Upload
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
UPLOAD_DIR="./public/uploads"

# Email (Optional - untuk notifikasi)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@lelangmobil.com"
```

### Generate JWT Secret:
```powershell
# Di PowerShell, generate random string:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🗄️ STEP 5: SETUP DATABASE

```powershell
# Di folder project
cd C:\inetpub\wwwroot\lelangmobil

# Generate Prisma Client
npx prisma generate

# Push schema ke database
npx prisma db push

# Seed database dengan data awal
npm run db:seed
```

---

## 🏗️ STEP 6: BUILD PROJECT

```powershell
# Build untuk production
npm run build

# Test build locally
npm start
# Buka: http://localhost:3000
```

---

## 🌐 STEP 7: SETUP DOMAIN & WEB SERVER

### Opsi A: Menggunakan IIS (Windows Server)

#### 1. Install IIS:
```powershell
# Buka Server Manager
# Add Roles and Features
# Pilih: Web Server (IIS)
# Install
```

#### 2. Install IISNode:
```powershell
# Download dari:
https://github.com/Azure/iisnode/releases

# Install iisnode-full-v0.2.26-x64.msi
```

#### 3. Install URL Rewrite:
```powershell
# Download dari:
https://www.iis.net/downloads/microsoft/url-rewrite

# Install rewrite_amd64_en-US.msi
```

#### 4. Konfigurasi IIS Site:
```powershell
# Buka IIS Manager
# Add Website:
#   - Site name: lelangmobil
#   - Physical path: C:\inetpub\wwwroot\lelangmobil
#   - Binding: 
#     - Type: http
#     - Port: 80
#     - Host name: lelangmobil.com
```

#### 5. Buat web.config:
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
    </handlers>
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^server.js\/debug[\/]?" />
        </rule>
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="server.js"/>
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering>
        <hiddenSegments>
          <remove segment="bin"/>
        </hiddenSegments>
      </requestFiltering>
    </security>
    <httpErrors existingResponse="PassThrough" />
  </system.webServer>
</configuration>
```

### Opsi B: Menggunakan PM2 + Nginx (Recommended)

#### 1. Install PM2:
```powershell
npm install -g pm2
pm2 install pm2-windows-startup
pm2-startup install
```

#### 2. Buat ecosystem.config.js:
```javascript
module.exports = {
  apps: [{
    name: 'lelangmobil',
    script: 'npm',
    args: 'start',
    cwd: 'C:\\inetpub\\wwwroot\\lelangmobil',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}
```

#### 3. Start dengan PM2:
```powershell
cd C:\inetpub\wwwroot\lelangmobil

# Start aplikasi
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# List running apps
pm2 list

# Monitor
pm2 monit

# Logs
pm2 logs lelangmobil
```

#### 4. Install Nginx:
```powershell
# Download Nginx untuk Windows:
http://nginx.org/en/download.html

# Extract ke: C:\nginx
```

#### 5. Konfigurasi Nginx (C:\nginx\conf\nginx.conf):
```nginx
http {
    upstream lelangmobil {
        server 127.0.0.1:3000;
        server 127.0.0.1:3001;
        keepalive 64;
    }

    server {
        listen 80;
        server_name lelangmobil.com www.lelangmobil.com;

        # Redirect to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name lelangmobil.com www.lelangmobil.com;

        # SSL Certificate
        ssl_certificate C:/nginx/ssl/lelangmobil.com.crt;
        ssl_certificate_key C:/nginx/ssl/lelangmobil.com.key;

        # SSL Settings
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Security Headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;

        # Max upload size
        client_max_body_size 10M;

        # Proxy to Next.js
        location / {
            proxy_pass http://lelangmobil;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Static files
        location /_next/static {
            proxy_pass http://lelangmobil;
            proxy_cache_valid 200 60m;
            add_header Cache-Control "public, immutable";
        }

        # Images
        location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
            proxy_pass http://lelangmobil;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

#### 6. Start Nginx:
```powershell
cd C:\nginx
start nginx

# Reload config
nginx -s reload

# Stop
nginx -s stop
```

---

## 🔒 STEP 8: SETUP SSL CERTIFICATE

### Opsi A: Let's Encrypt (Gratis)

#### Install Certbot:
```powershell
# Download Certbot untuk Windows:
https://dl.eff.org/certbot-beta-installer-win_amd64.exe

# Install dan jalankan:
certbot certonly --standalone -d lelangmobil.com -d www.lelangmobil.com
```

### Opsi B: SSL Berbayar (Comodo, DigiCert, dll)

```powershell
# Beli SSL certificate
# Download certificate files:
#   - lelangmobil.com.crt
#   - lelangmobil.com.key
#   - ca-bundle.crt

# Copy ke:
C:\nginx\ssl\
```

---

## 🌍 STEP 9: KONFIGURASI DNS DOMAIN

### Di Control Panel Domain (Namecheap, GoDaddy, dll):

```
Type    Host    Value               TTL
A       @       [IP_RDP_ANDA]       300
A       www     [IP_RDP_ANDA]       300
CNAME   www     lelangmobil.com     300
```

### Cek DNS Propagation:
```
https://dnschecker.org
```

---

## 🔥 STEP 10: FIREWALL & SECURITY

### Buka Port di Windows Firewall:
```powershell
# Port 80 (HTTP)
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow

# Port 443 (HTTPS)
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -LocalPort 443 -Protocol TCP -Action Allow

# Port 3306 (MySQL) - JANGAN buka ke public!
# Hanya untuk localhost
```

---

## ✅ STEP 11: TESTING

### 1. Test Local:
```powershell
# Cek aplikasi berjalan
pm2 list

# Test di browser RDP
http://localhost:3000
```

### 2. Test Domain:
```
https://lelangmobil.com
```

### 3. Test Fitur:
- [ ] Homepage loading
- [ ] Login/Register
- [ ] Dashboard
- [ ] Upload gambar
- [ ] Deposit/Withdraw
- [ ] Lelang
- [ ] Admin panel

---

## 📊 MONITORING & MAINTENANCE

### PM2 Commands:
```powershell
# Status
pm2 status

# Logs
pm2 logs lelangmobil

# Restart
pm2 restart lelangmobil

# Stop
pm2 stop lelangmobil

# Delete
pm2 delete lelangmobil

# Monitor
pm2 monit
```

### Database Backup:
```powershell
# Backup database
mysqldump -u root -p lelangmobil > backup_$(date +%Y%m%d).sql

# Restore
mysql -u root -p lelangmobil < backup_20240101.sql
```

### Update Aplikasi:
```powershell
cd C:\inetpub\wwwroot\lelangmobil

# Pull latest code
git pull

# Install dependencies
npm install

# Build
npm run build

# Restart
pm2 restart lelangmobil
```

---

## 🚨 TROUBLESHOOTING

### Issue: Port 3000 sudah digunakan
```powershell
# Cari process yang menggunakan port
netstat -ano | findstr :3000

# Kill process
taskkill /PID [PID_NUMBER] /F
```

### Issue: Database connection failed
```powershell
# Cek MySQL running
Get-Service MySQL80

# Start MySQL
Start-Service MySQL80

# Cek connection
mysql -u root -p -e "SELECT 1"
```

### Issue: Permission denied
```powershell
# Run PowerShell as Administrator
# Set folder permissions
icacls "C:\inetpub\wwwroot\lelangmobil" /grant Users:F /T
```

### Issue: SSL certificate error
```powershell
# Cek certificate
openssl x509 -in lelangmobil.com.crt -text -noout

# Verify certificate chain
openssl verify -CAfile ca-bundle.crt lelangmobil.com.crt
```

---

## 📞 SUPPORT CHECKLIST

### Sebelum Production:
- [ ] Backup database
- [ ] Test semua fitur
- [ ] Cek SSL certificate
- [ ] Monitor logs
- [ ] Setup error tracking
- [ ] Setup uptime monitoring

### Monitoring Tools:
- PM2 Monitor: `pm2 monit`
- Nginx Logs: `C:\nginx\logs\`
- App Logs: `C:\inetpub\wwwroot\lelangmobil\logs\`
- MySQL Logs: `C:\ProgramData\MySQL\MySQL Server 8.0\Data\`

---

## 🎉 SELESAI!

Website LelangMobil sekarang live di:
**https://lelangmobil.com**

### Admin Access:
```
URL: https://lelangmobil.com/admin
Email: admin@lelangmobil.com
Password: password123
```

### User Demo:
```
URL: https://lelangmobil.com
Email: budi@gmail.com
Password: password123
```

---

**SELAMAT! WEBSITE PRODUCTION READY! 🚀**
