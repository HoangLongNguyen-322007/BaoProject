/**
 * Database Migration Runner
 * Chạy các migration files theo thứ tự, bỏ qua những file đã chạy rồi.
 * 
 * Usage:
 *   node src/backend/database/migrate.js
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

const runMigrations = async () => {
  const client = await pool.connect();

  try {
    console.log('🔄 Starting database migrations...\n');

    // Đảm bảo bảng migrations tồn tại
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id          SERIAL PRIMARY KEY,
        name        TEXT UNIQUE NOT NULL,
        "appliedAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Lấy danh sách migrations đã chạy
    const { rows: appliedMigrations } = await client.query(
      `SELECT name FROM migrations ORDER BY id`
    );
    const applied = new Set(appliedMigrations.map((r) => r.name));

    // Đọc danh sách migration files, sắp xếp theo tên
    const migrationFiles = fs
      .readdirSync(MIGRATIONS_DIR)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    if (migrationFiles.length === 0) {
      console.log('✓ No migration files found.');
      return;
    }

    let newMigrations = 0;

    for (const file of migrationFiles) {
      if (applied.has(file)) {
        console.log(`  ⏭  Skipping  ${file} (already applied)`);
        continue;
      }

      console.log(`  ▶  Applying  ${file}...`);
      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');

      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query(`INSERT INTO migrations (name) VALUES ($1)`, [file]);
        await client.query('COMMIT');
        console.log(`  ✓  Applied   ${file}`);
        newMigrations++;
      } catch (err) {
        await client.query('ROLLBACK');
        console.error(`  ✗  Failed    ${file}:`, err.message);
        throw err;
      }
    }

    if (newMigrations === 0) {
      console.log('\n✓ Database is already up to date.');
    } else {
      console.log(`\n✓ Applied ${newMigrations} migration(s) successfully.`);
    }
  } catch (err) {
    console.error('\n✗ Migration failed:', err.message);
    if (require.main === module) process.exit(1);
    throw err;
  } finally {
    client.release();
    // Only close pool when run as standalone CLI script
    if (require.main === module) {
      await pool.end();
    }
  }
};

// Chạy trực tiếp nếu là main module
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
