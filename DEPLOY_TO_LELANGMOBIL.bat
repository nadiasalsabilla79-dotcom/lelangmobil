@echo off
echo ========================================
echo  DEPLOY TO LELANGMOBIL.COM
echo ========================================
echo.

echo 🚀 PRODUCTION DEPLOYMENT READY!
echo.
echo Domain: https://lelangmobil.com
echo SSL: Let's Encrypt (Auto-configured)
echo.

echo 📋 DEPLOYMENT STEPS:
echo.
echo 1. Upload project to your server:
echo    scp -r "New folder (15)" user@server:/var/www/lelangmobil
echo.
echo 2. Run deployment script on server:
echo    chmod +x deploy-production.sh
echo    ./deploy-production.sh
echo.
echo 3. Update database credentials in .env.production
echo.
echo 4. Your site will be live at: https://lelangmobil.com
echo.

echo ✅ FILES READY FOR PRODUCTION:
echo    - Production environment (.env.production)
echo    - Deployment script (deploy-production.sh)
echo    - Nginx configuration
echo    - SSL auto-setup
echo    - Database schema & seed
echo    - PM2 process management
echo.



pause