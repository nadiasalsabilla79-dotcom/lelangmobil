# 🗄️ Database Setup - LelangMobil

## Database Schema Lengkap

### Tables:
1. **users** - User accounts (USER/ADMIN)
2. **kyc** - KYC verification data
3. **wallets** - User wallet balances
4. **transactions** - Deposit/Withdraw/Bid transactions
5. **cars** - Car listings
6. **auctions** - Auction data
7. **bids** - Bid history
8. **notifications** - User notifications

## Setup Instructions

### 1. Install Prisma
```bash
npm install prisma @prisma/client
npm install -D prisma
```

### 2. Setup Database URL
Edit `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/lelangmobil"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Migrations
```bash
npx prisma migrate dev --name init
```

### 5. Seed Database (Optional)
```bash
npx prisma db seed
```

## Database Features

✅ **Full Relations**
- User → KYC (1:1)
- User → Wallet (1:1)
- User → Transactions (1:N)
- User → Bids (1:N)
- Car → Auctions (1:N)
- Auction → Bids (1:N)

✅ **Enums**
- Role (USER, ADMIN)
- KYCStatus (PENDING, APPROVED, REJECTED)
- TransactionType (DEPOSIT, WITHDRAW, BID, WIN, BONUS)
- TransactionStatus (PENDING, COMPLETED, REJECTED)
- AuctionStatus (DRAFT, UPCOMING, LIVE, ENDED)
- BidStatus (ACTIVE, OUTBID, WON)
- NotificationType (10+ types)

✅ **Indexes & Constraints**
- Unique emails
- Unique KTP numbers
- Foreign keys with CASCADE delete
- Timestamps (createdAt, updatedAt)

## Prisma Studio (Database GUI)
```bash
npx prisma studio
```
Buka: http://localhost:5555

## Production Database
Recommended: **PostgreSQL** on:
- Supabase (Free tier)
- Railway
- Neon
- AWS RDS
- Vercel Postgres

## Backup & Restore
```bash
# Backup
pg_dump lelangmobil > backup.sql

# Restore
psql lelangmobil < backup.sql
```

✅ **DATABASE READY FOR PRODUCTION!**
