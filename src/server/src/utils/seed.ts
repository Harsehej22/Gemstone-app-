import dotenv from 'dotenv';
import { connectDatabase } from '../config/database.js';
import { Gemstone } from '../models/Gemstone.js';
import { User } from '../models/User.js';
import { DEFAULT_GEMSTONES } from './gemstoneData.js';
import bcrypt from 'bcryptjs';

dotenv.config();

async function seed() {
  await connectDatabase();

  // Seed gemstones
  await Gemstone.deleteMany({});
  await Gemstone.insertMany(DEFAULT_GEMSTONES);
  console.log(`Seeded ${DEFAULT_GEMSTONES.length} gemstones`);

  // Seed admin user
  const adminEmail = 'admin@gemstone.app';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    await User.create({
      name: 'Admin User',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });
    console.log('Admin user created: admin@gemstone.app / Admin@123');
  } else {
    console.log('Admin user already exists');
  }

  console.log('Seed completed successfully');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
