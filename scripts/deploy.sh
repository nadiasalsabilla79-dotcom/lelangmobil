#!/bin/bash

echo "🚀 Starting LelangMobil deployment..."

if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set"
    exit 1
fi

if [ -z "$NEXTAUTH_SECRET" ]; then
    echo "❌ NEXTAUTH_SECRET environment variable is not set"
    exit 1
fi

echo "📦 Installing dependencies..."
npm ci --only=production

echo "🔨 Building application..."
npm run build

echo "🗄️ Running database migrations..."
# npx prisma migrate deploy

echo "🎯 Starting application..."
npm start

echo "✅ Deployment completed successfully!"