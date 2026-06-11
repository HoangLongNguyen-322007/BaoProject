const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../Data/database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Initialize database schema
const initDatabase = () => {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        fullName TEXT NOT NULL,
        avatar TEXT,
        role TEXT CHECK(role IN ('author', 'editor', 'admin', 'guest')) DEFAULT 'guest',
        bio TEXT,
        phone TEXT,
        status TEXT CHECK(status IN ('active', 'inactive', 'suspended')) DEFAULT 'active',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Articles table
    db.run(`
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        author_id TEXT NOT NULL,
        editor_id TEXT,
        status TEXT CHECK(status IN ('draft', 'pending', 'approved', 'rejected', 'published')) DEFAULT 'draft',
        image TEXT,
        readTime INTEGER,
        views INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0,
        publishedAt DATETIME,
        rejectionReason TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(author_id) REFERENCES users(id),
        FOREIGN KEY(editor_id) REFERENCES users(id)
      )
    `);

    // Categories table
    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        color TEXT,
        icon TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Comments table
    db.run(`
      CREATE TABLE IF NOT EXISTS comments (
        id TEXT PRIMARY KEY,
        article_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        content TEXT NOT NULL,
        status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(article_id) REFERENCES articles(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
      )
    `);

    // Editor stats table
    db.run(`
      CREATE TABLE IF NOT EXISTS editor_stats (
        id TEXT PRIMARY KEY,
        editor_id TEXT NOT NULL,
        articlesReviewed INTEGER DEFAULT 0,
        articlesApproved INTEGER DEFAULT 0,
        articlesRejected INTEGER DEFAULT 0,
        approvalRate REAL DEFAULT 0,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(editor_id) REFERENCES users(id)
      )
    `);

    // System logs table
    db.run(`
      CREATE TABLE IF NOT EXISTS system_logs (
        id TEXT PRIMARY KEY,
        action TEXT NOT NULL,
        user_id TEXT,
        description TEXT,
        metadata TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )
    `);

    console.log('Database schema initialized');
  });
};

module.exports = {
  db,
  initDatabase
};
