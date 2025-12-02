-- Setup Database untuk Neon PostgreSQL
-- Jalankan di Neon SQL Editor atau pgAdmin

-- 1. Pastikan database sudah dibuat
-- Database: neondb (sudah ada)

-- 2. Prisma akan auto-create tables saat deploy
-- Tapi jika perlu manual, jalankan: npx prisma db push

-- 3. Seed data (jalankan setelah tables dibuat)
-- npx prisma db seed

-- ATAU copy-paste seed data manual:

-- Insert Admin User
INSERT INTO "User" (id, email, password, name, role, "emailVerified", "kycStatus", "createdAt", "updatedAt")
VALUES 
('admin-001', 'admin@lelangmobil.com', '$2a$10$rZ5qH8vGqxKx5YxKx5YxKOqH8vGqxKx5YxKx5YxKOqH8vGqxKx5Yx', 'Admin LelangMobil', 'ADMIN', true, 'APPROVED', NOW(), NOW());

-- Insert Demo User
INSERT INTO "User" (id, email, password, name, phone, role, "emailVerified", "kycStatus", "createdAt", "updatedAt")
VALUES 
('user-001', 'budi@gmail.com', '$2a$10$rZ5qH8vGqxKx5YxKx5YxKOqH8vGqxKx5YxKx5YxKOqH8vGqxKx5Yx', 'Budi Santoso', '081234567890', 'USER', true, 'APPROVED', NOW(), NOW());

-- Insert Wallet for Demo User
INSERT INTO "Wallet" (id, "userId", balance, "holdBalance", "createdAt", "updatedAt")
VALUES 
('wallet-001', 'user-001', 25000000, 0, NOW(), NOW());

-- Insert Sample Cars
INSERT INTO "Car" (id, brand, model, year, color, transmission, "fuelType", odometer, location, grade, description, images, "createdAt", "updatedAt")
VALUES 
('car-001', 'Toyota', 'Avanza', 2020, 'Silver', 'Manual', 'Bensin', 45000, 'Jakarta', 'A', 'Toyota Avanza 2020 kondisi istimewa', '["https://images.unsplash.com/photo-1619767886558-efdc259cde1a"]', NOW(), NOW()),
('car-002', 'Honda', 'Civic', 2019, 'Hitam', 'Automatic', 'Bensin', 35000, 'Surabaya', 'A', 'Honda Civic 2019 terawat', '["https://images.unsplash.com/photo-1590362891991-f776e747a588"]', NOW(), NOW());

-- Insert Sample Auctions
INSERT INTO "Auction" (id, "carId", title, "startPrice", "currentPrice", "minIncrement", "startTime", "endTime", status, "totalBids", "createdAt", "updatedAt")
VALUES 
('auction-001', 'car-001', 'Toyota Avanza 2020 - Silver', 150000000, 150000000, 1000000, NOW() + INTERVAL '1 hour', NOW() + INTERVAL '2 days', 'UPCOMING', 0, NOW(), NOW()),
('auction-002', 'car-002', 'Honda Civic 2019 - Hitam', 250000000, 250000000, 2000000, NOW() + INTERVAL '2 hours', NOW() + INTERVAL '3 days', 'UPCOMING', 0, NOW(), NOW());

-- Verify data
SELECT * FROM "User";
SELECT * FROM "Wallet";
SELECT * FROM "Car";
SELECT * FROM "Auction";
