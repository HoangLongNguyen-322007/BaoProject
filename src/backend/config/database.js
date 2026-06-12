const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
  process.exit(-1);
});

// Initialize database schema
const initDatabase = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Enable UUID extension
    await client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        "fullName" TEXT NOT NULL,
        avatar TEXT,
        role TEXT CHECK(role IN ('author', 'editor', 'admin', 'guest')) DEFAULT 'guest',
        bio TEXT,
        phone TEXT,
        status TEXT CHECK(status IN ('active', 'inactive', 'suspended')) DEFAULT 'active',
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Articles table
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        editor_id UUID REFERENCES users(id),
        status TEXT CHECK(status IN ('draft', 'pending', 'approved', 'rejected', 'published')) DEFAULT 'draft',
        image TEXT,
        "readTime" INTEGER DEFAULT 5,
        views INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0,
        "publishedAt" TIMESTAMPTZ,
        "rejectionReason" TEXT,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Categories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        color TEXT,
        icon TEXT,
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Comments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'approved',
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Editor stats table
    await client.query(`
      CREATE TABLE IF NOT EXISTS editor_stats (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        editor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        "articlesReviewed" INTEGER DEFAULT 0,
        "articlesApproved" INTEGER DEFAULT 0,
        "articlesRejected" INTEGER DEFAULT 0,
        "approvalRate" REAL DEFAULT 0,
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // System logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS system_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        action TEXT NOT NULL,
        user_id UUID REFERENCES users(id),
        description TEXT,
        metadata TEXT,
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Bookmarks table
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, article_id)
      )
    `);

    // Notifications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT CHECK(type IN ('system', 'approval', 'rejection', 'comment')) DEFAULT 'system',
        "isRead" BOOLEAN DEFAULT FALSE,
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await client.query('COMMIT');
    console.log('✓ Database schema initialized (PostgreSQL)');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error initializing database schema:', err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { pool, initDatabase };
