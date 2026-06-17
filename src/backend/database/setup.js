/**
 * Database Setup Script
 * Chạy migration rồi seed data - dùng cho lần đầu setup hoặc sau khi reset.
 *
 * Usage:
 *   npm run db:setup
 *   node src/backend/database/setup.js
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const { runMigrations } = require('./migrate');
const { seedDatabase } = require('../config/seed');

const setup = async () => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║     Website Báo - Database Setup       ║');
  console.log('╚════════════════════════════════════════╝\n');

  try {
    // Step 1: Run migrations
    console.log('Step 1/2: Running migrations...');
    await runMigrations();

    // Step 2: Seed data
    console.log('\nStep 2/2: Seeding data...');
    await seedDatabase();

    console.log('╔════════════════════════════════════════╗');
    console.log('║   ✅  Setup completed successfully!    ║');
    console.log('╚════════════════════════════════════════╝\n');
    console.log('👉 Run: npm run dev  to start the application\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Setup failed:', err.message);
    process.exit(1);
  }
};

setup();
