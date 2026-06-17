const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected database error on idle client:', err);
  // Do not process.exit(-1) here. The pool will automatically remove the faulty connection.
});

/**
 * Initialize database bằng cách chạy migration runner.
 * Các migration files được quản lý trong src/backend/database/migrations/
 */
const initDatabase = async () => {
  const path = require('path');
  const fs = require('fs');

  const migrationsDir = path.join(__dirname, '../database/migrations');
  const client = await pool.connect();

  try {
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

    // Đọc và chạy migration files chưa được áp dụng
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    let newCount = 0;
    for (const file of migrationFiles) {
      if (applied.has(file)) continue;

      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query(`INSERT INTO migrations (name) VALUES ($1)`, [file]);
        await client.query('COMMIT');
        newCount++;
      } catch (err) {
        await client.query('ROLLBACK');
        throw new Error(`Migration ${file} failed: ${err.message}`);
      }
    }

    if (newCount > 0) {
      console.log(`✓ Applied ${newCount} new database migration(s)`);
    } else {
      console.log('✓ Database schema is up to date');
    }
  } catch (err) {
    console.error('Error during database initialization:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

/**
 * Helper: chạy một query với error logging
 */
const runQuery = async (text, params = []) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development' && duration > 500) {
      console.warn(`⚠ Slow query (${duration}ms):`, text.substring(0, 80));
    }
    return res;
  } catch (err) {
    console.error('Query error:', { text: text.substring(0, 100), params, error: err.message });
    throw err;
  }
};

module.exports = { pool, initDatabase, runQuery };
