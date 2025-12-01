# 🚀 PRODUCTION DEPLOYMENT - lelangmobil.com

## ✅ DEPLOYMENT READY

### **Domain Setup:**
- Domain: `lelangmobil.com` (aktif)
- SSL: Required (Let's Encrypt/Cloudflare)
- Server: VPS/Cloud hosting

### **Environment Variables (.env.production):**
```env
DATABASE_URL="mysql://username:password@localhost:3306/lelangmobil"
NEXT_PUBLIC_APP_URL="https://lelangmobil.com"
NEXT_PUBLIC_APP_NAME="LelangMobil"
JWT_SECRET="your-super-secure-production-jwt-key-32-chars-min"
NODE_ENV="production"
```

### **Production Build Steps:**

#### 1. Server Setup (Ubuntu/CentOS):
```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt update
sudo apt install nginx
```

#### 2. Upload & Build:
```bash
# Upload project to server
scp -r "New folder (15)" user@server:/var/www/lelangmobil

# On server
cd /var/www/lelangmobil
npm install
npm run build
```

#### 3. Database Setup:
```bash
# Install MySQL
sudo apt install mysql-server

# Create database
mysql -u root -p
CREATE DATABASE lelangmobil CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'lelanguser'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON lelangmobil.* TO 'lelanguser'@'localhost';

# Push schema
npx prisma db push
npx prisma db seed
```

#### 4. Nginx Configuration:
```nginx
# /etc/nginx/sites-available/lelangmobil.com
server {
    listen 80;
    server_name lelangmobil.com www.lelangmobil.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name lelangmobil.com www.lelangmobil.com;

    ssl_certificate /etc/letsencrypt/live/lelangmobil.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lelangmobil.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 5. SSL Certificate (Let's Encrypt):
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d lelangmobil.com -d www.lelangmobil.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### 6. Start Application:
```bash
# Using PM2
pm2 start npm --name "lelangmobil" -- start
pm2 startup
pm2 save

# Enable Nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### **Alternative: Docker Deployment**

#### Dockerfile (already exists):
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Docker Compose with SSL:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mysql://user:pass@db:3306/lelangmobil
    depends_on:
      - db
  
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: lelangmobil
    volumes:
      - mysql_data:/var/lib/mysql
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - /etc/letsencrypt:/etc/letsencrypt
    depends_on:
      - app

volumes:
  mysql_data:
```

### **Cloudflare Setup (Recommended):**

1. **DNS Settings:**
   - A record: `lelangmobil.com` → Server IP
   - CNAME: `www` → `lelangmobil.com`
   - Proxy status: Proxied (orange cloud)

2. **SSL/TLS Settings:**
   - Encryption mode: Full (strict)
   - Edge certificates: Universal SSL
   - Always Use HTTPS: On

3. **Performance:**
   - Caching level: Standard
   - Browser cache TTL: 4 hours
   - Minify: CSS, JS, HTML

### **Security Headers:**
```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      }
    ]
  }
}
```

## 🎯 PRODUCTION CHECKLIST:

- [ ] Domain DNS pointed to server
- [ ] SSL certificate installed
- [ ] Database configured
- [ ] Environment variables set
- [ ] Application built and running
- [ ] Nginx configured
- [ ] PM2 process manager setup
- [ ] Firewall configured (ports 80, 443, 22)
- [ ] Backup strategy implemented
- [ ] Monitoring setup

## 📞 DEPLOYMENT SUPPORT:

**Ready for production deployment to lelangmobil.com with SSL!**