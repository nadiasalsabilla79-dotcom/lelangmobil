#!/bin/bash

echo "🚀 DEPLOYING LELANGMOBIL TO PRODUCTION"
echo "======================================"

# Variables
DOMAIN="lelangmobil.com"
APP_DIR="/var/www/lelangmobil"
DB_NAME="lelangmobil"
DB_USER="lelanguser"

# Update system
echo "📦 Updating system..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt install -y nginx

# Install MySQL
echo "📦 Installing MySQL..."
sudo apt install -y mysql-server

# Create app directory
echo "📁 Creating app directory..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# Copy application files (assuming they're in current directory)
echo "📋 Copying application files..."
cp -r . $APP_DIR/
cd $APP_DIR

# Install dependencies and build
echo "🔨 Building application..."
npm install
npm run build

# Setup database
echo "🗄️ Setting up database..."
sudo mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY 'secure_password_change_me';"
sudo mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Push database schema
echo "📊 Pushing database schema..."
npx prisma db push
npx prisma db seed

# Configure Nginx
echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo nginx -t

# Install SSL certificate
echo "🔒 Installing SSL certificate..."
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Start application with PM2
echo "🚀 Starting application..."
pm2 start npm --name "lelangmobil" -- start
pm2 startup
pm2 save

# Start services
echo "⚡ Starting services..."
sudo systemctl enable nginx
sudo systemctl restart nginx
sudo systemctl enable mysql

# Setup firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo "✅ DEPLOYMENT COMPLETE!"
echo "🌐 Your site is now live at: https://$DOMAIN"
echo "📊 Admin panel: https://$DOMAIN/admin"
echo "🔐 Create your admin account through the registration system"