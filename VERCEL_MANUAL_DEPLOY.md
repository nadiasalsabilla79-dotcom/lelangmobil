# 🚀 MANUAL VERCEL DEPLOYMENT - LELANGMOBIL

## ✅ VERCEL CLI INSTALLED SUCCESSFULLY

### **Next Steps:**

#### 1. **Login to Vercel:**
```bash
vercel login
```

#### 2. **Deploy Project:**
```bash
vercel --prod
```

#### 3. **Set Custom Domain:**
- Go to: https://vercel.com/dashboard
- Select your project
- Go to Settings → Domains
- Add: `lelangmobil.com`
- Add: `www.lelangmobil.com`

#### 4. **Update Cloudflare DNS:**
```
Type: CNAME
Name: @
Content: cname.vercel-dns.com
Proxy: DNS Only (Gray Cloud)

Type: CNAME
Name: www
Content: cname.vercel-dns.com
Proxy: DNS Only (Gray Cloud)
```

#### 5. **Environment Variables in Vercel:**
- DATABASE_URL: `mysql://username:password@host:3306/lelangmobil`
- NEXT_PUBLIC_APP_URL: `https://lelangmobil.com`
- JWT_SECRET: `lelangmobil-production-jwt-secret-key-2025-secure`

## 🎯 READY TO DEPLOY!

**Commands to run:**
1. `vercel login`
2. `vercel --prod`
3. Set domain in Vercel dashboard
4. Update DNS in Cloudflare

**Result:** https://lelangmobil.com will be live!