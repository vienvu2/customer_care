import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@customercare.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@customercare.com',
      password: hashedPassword,
      phoneNumber: '0123456789',
      role: UserRole.ADMIN
    }
  })

  // Create staff user
  const staffPassword = await bcrypt.hash('staff123', 12)
  const staff = await prisma.user.upsert({
    where: { email: 'staff@customercare.com' },
    update: {},
    create: {
      name: 'Staff Member',
      email: 'staff@customercare.com',
      password: staffPassword,
      phoneNumber: '0987654321',
      role: UserRole.STAFF
    }
  })

  console.log('✅ Seed completed successfully!')
  console.log(`Created users:`)
  console.log(`- Admin: admin@customercare.com / admin123`)
  console.log(`- Staff: staff@customercare.com / staff123`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
