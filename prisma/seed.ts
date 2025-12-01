import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lelangmobil.com' },
    update: {},
    create: {
      email: 'admin@lelangmobil.com',
      password: hashedPassword,
      name: 'Administrator',
      phone: '081234567890',
      role: 'ADMIN',
      emailVerified: true, // Admin tidak perlu verifikasi
      kycStatus: 'APPROVED',
    },
  })

  await prisma.wallet.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      balance: 100000000,
      holdBalance: 0,
    },
  })

  // Create Regular User (Budi)
  const budi = await prisma.user.upsert({
    where: { email: 'budi@gmail.com' },
    update: {},
    create: {
      email: 'budi@gmail.com',
      password: hashedPassword,
      name: 'Budi Santoso',
      phone: '081234567891',
      role: 'USER',
      emailVerified: true, // Demo user sudah verified
      kycStatus: 'APPROVED',
    },
  })

  await prisma.wallet.upsert({
    where: { userId: budi.id },
    update: {},
    create: {
      userId: budi.id,
      balance: 25000000,
      holdBalance: 0,
    },
  })

  // Create Sample Cars
  const cars = [
    {
      brand: 'Toyota',
      model: 'Avanza',
      year: 2020,
      color: 'Silver',
      transmission: 'Manual',
      fuelType: 'Bensin',
      odometer: 45000,
      location: 'Jakarta',
      grade: 'A',
      description: 'Toyota Avanza 2020 kondisi sangat terawat, service rutin di bengkel resmi.',
      images: ['/cars/avanza-1.jpg', '/cars/avanza-2.jpg', '/cars/avanza-3.jpg'],
    },
    {
      brand: 'Honda',
      model: 'Civic',
      year: 2019,
      color: 'Hitam',
      transmission: 'Automatic',
      fuelType: 'Bensin',
      odometer: 35000,
      location: 'Bandung',
      grade: 'A',
      description: 'Honda Civic Turbo 2019, full original, pajak panjang.',
      images: ['/cars/civic-1.jpg', '/cars/civic-2.jpg'],
    },
    {
      brand: 'Mitsubishi',
      model: 'Xpander',
      year: 2021,
      color: 'Putih',
      transmission: 'Automatic',
      fuelType: 'Bensin',
      odometer: 25000,
      location: 'Surabaya',
      grade: 'A',
      description: 'Mitsubishi Xpander 2021 seperti baru, kilometer rendah.',
      images: ['/cars/xpander-1.jpg', '/cars/xpander-2.jpg'],
    },
  ]

  const createdCars = []
  for (const carData of cars) {
    const car = await prisma.car.create({
      data: carData,
    })
    createdCars.push(car)
  }

  // Create Sample Auctions
  const now = new Date()
  const auctions = [
    {
      carId: createdCars[0].id,
      title: 'Toyota Avanza 2020 - Silver Metalik',
      startPrice: 150000000,
      currentPrice: 150000000,
      minIncrement: 1000000,
      startTime: new Date(now.getTime() - 2 * 60 * 60 * 1000), // Started 2 hours ago
      endTime: new Date(now.getTime() + 22 * 60 * 60 * 1000), // Ends in 22 hours
      status: 'LIVE' as const,
    },
    {
      carId: createdCars[1].id,
      title: 'Honda Civic Turbo 2019 - Hitam',
      startPrice: 280000000,
      currentPrice: 280000000,
      minIncrement: 2000000,
      startTime: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Starts in 1 day
      endTime: new Date(now.getTime() + 48 * 60 * 60 * 1000), // Ends in 2 days
      status: 'UPCOMING' as const,
    },
    {
      carId: createdCars[2].id,
      title: 'Mitsubishi Xpander 2021 - Putih',
      startPrice: 220000000,
      currentPrice: 220000000,
      minIncrement: 1500000,
      startTime: new Date(now.getTime() - 1 * 60 * 60 * 1000), // Started 1 hour ago
      endTime: new Date(now.getTime() + 47 * 60 * 60 * 1000), // Ends in 47 hours
      status: 'LIVE' as const,
    },
  ]

  for (const auctionData of auctions) {
    await prisma.auction.create({
      data: auctionData,
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log('\n📧 Admin Account:')
  console.log('   Email: admin@lelangmobil.com')
  console.log('   Password: password123')
  console.log('\n📧 User Account:')
  console.log('   Email: budi@gmail.com')
  console.log('   Password: password123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
