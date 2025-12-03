-- INSERT DATA ONLY (Tables sudah ada)
-- Copy dan Run di Supabase SQL Editor

-- Insert Admin User (password: password123)
INSERT INTO "User" (id, email, password, name, role, "emailVerified", "kycStatus", "createdAt", "updatedAt")
VALUES ('admin-001', 'admin@lelangmobil.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq8YdVZTy', 'Admin LelangMobil', 'ADMIN', true, 'APPROVED', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Demo User (password: password123)
INSERT INTO "User" (id, email, password, name, phone, role, "emailVerified", "kycStatus", "createdAt", "updatedAt")
VALUES ('user-001', 'budi@gmail.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq8YdVZTy', 'Budi Santoso', '081234567890', 'USER', true, 'APPROVED', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Wallet
INSERT INTO "Wallet" (id, "userId", balance, "holdBalance", "createdAt", "updatedAt")
VALUES ('wallet-001', 'user-001', 25000000, 0, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Cars
INSERT INTO "Car" (id, brand, model, year, color, transmission, "fuelType", odometer, location, grade, description, images, "createdAt", "updatedAt")
VALUES 
('car-001', 'Toyota', 'Avanza', 2020, 'Silver', 'Manual', 'Bensin', 45000, 'Jakarta', 'A', 'Toyota Avanza 2020 kondisi istimewa', '["https://images.unsplash.com/photo-1619767886558-efdc259cde1a"]', NOW(), NOW()),
('car-002', 'Honda', 'Civic', 2019, 'Hitam', 'Automatic', 'Bensin', 35000, 'Surabaya', 'A', 'Honda Civic 2019 terawat', '["https://images.unsplash.com/photo-1590362891991-f776e747a588"]', NOW(), NOW()),
('car-003', 'Mitsubishi', 'Pajero Sport', 2021, 'Putih', 'Automatic', 'Diesel', 25000, 'Bandung', 'A', 'Pajero Sport 2021 mulus', '["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf"]', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Auctions
INSERT INTO "Auction" (id, "carId", title, "startPrice", "currentPrice", "minIncrement", "startTime", "endTime", status, "totalBids", "createdAt", "updatedAt")
VALUES 
('auction-001', 'car-001', 'Toyota Avanza 2020 - Silver', 150000000, 150000000, 1000000, NOW() + INTERVAL '1 hour', NOW() + INTERVAL '2 days', 'UPCOMING', 0, NOW(), NOW()),
('auction-002', 'car-002', 'Honda Civic 2019 - Hitam', 250000000, 250000000, 2000000, NOW() + INTERVAL '2 hours', NOW() + INTERVAL '3 days', 'UPCOMING', 0, NOW(), NOW()),
('auction-003', 'car-003', 'Mitsubishi Pajero Sport 2021', 400000000, 400000000, 5000000, NOW() + INTERVAL '3 hours', NOW() + INTERVAL '4 days', 'UPCOMING', 0, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT 'Setup completed!' as message;
SELECT COUNT(*) as total_users FROM "User";
SELECT COUNT(*) as total_cars FROM "Car";
SELECT COUNT(*) as total_auctions FROM "Auction";
