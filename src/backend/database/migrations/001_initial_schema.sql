-- ============================================================
-- Migration 001: Initial Schema
-- Website Báo - PostgreSQL Database
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ============================================================
-- Migrations tracking table
-- ============================================================
CREATE TABLE IF NOT EXISTS migrations (
  id        SERIAL PRIMARY KEY,
  name      TEXT UNIQUE NOT NULL,
  "appliedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Users table
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email                 TEXT UNIQUE NOT NULL,
  password              TEXT NOT NULL,
  "fullName"            TEXT NOT NULL,
  avatar                TEXT,
  role                  TEXT CHECK(role IN ('author', 'editor', 'admin', 'guest')) DEFAULT 'guest',
  bio                   TEXT,
  phone                 TEXT,
  status                TEXT CHECK(status IN ('active', 'inactive', 'suspended')) DEFAULT 'active',
  "subscribedCategories" TEXT[] DEFAULT '{}',
  "loginCount"          INTEGER DEFAULT 0,
  "lastLogin"           TIMESTAMPTZ,
  "createdAt"           TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt"           TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Categories table
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT UNIQUE NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  description  TEXT,
  color        TEXT DEFAULT '#3182ce',
  icon         TEXT,
  "parentId"   UUID REFERENCES categories(id) ON DELETE SET NULL,
  "articleCount" INTEGER DEFAULT 0,
  "isActive"   BOOLEAN DEFAULT TRUE,
  "sortOrder"  INTEGER DEFAULT 0,
  "createdAt"  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Articles table
-- ============================================================
CREATE TABLE IF NOT EXISTS articles (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title             TEXT NOT NULL,
  slug              TEXT,
  excerpt           TEXT,
  content           TEXT NOT NULL,
  category          TEXT NOT NULL,
  author_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  editor_id         UUID REFERENCES users(id) ON DELETE SET NULL,
  status            TEXT CHECK(status IN ('draft', 'pending', 'approved', 'rejected', 'published')) DEFAULT 'draft',
  image             TEXT,
  "readTime"        INTEGER DEFAULT 5,
  views             INTEGER DEFAULT 0,
  likes             INTEGER DEFAULT 0,
  tags              TEXT[] DEFAULT '{}',
  "isFeatured"      BOOLEAN DEFAULT FALSE,
  "publishedAt"     TIMESTAMPTZ,
  "rejectionReason" TEXT,
  search_vector     TSVECTOR,
  "createdAt"       TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt"       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Tags table
-- ============================================================
CREATE TABLE IF NOT EXISTS tags (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT UNIQUE NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  "articleCount" INTEGER DEFAULT 0,
  "createdAt"  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Article Tags (many-to-many)
-- ============================================================
CREATE TABLE IF NOT EXISTS article_tags (
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  tag_id     UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- ============================================================
-- Comments table (với nested reply)
-- ============================================================
CREATE TABLE IF NOT EXISTS comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id  UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "parentId"  UUID REFERENCES comments(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  likes       INTEGER DEFAULT 0,
  status      TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'approved',
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Bookmarks table
-- ============================================================
CREATE TABLE IF NOT EXISTS bookmarks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  article_id  UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- ============================================================
-- Notifications table
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  message     TEXT NOT NULL,
  type        TEXT CHECK(type IN ('system', 'approval', 'rejection', 'comment', 'mention')) DEFAULT 'system',
  "isRead"    BOOLEAN DEFAULT FALSE,
  "relatedId" UUID,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Editor Stats table
-- ============================================================
CREATE TABLE IF NOT EXISTS editor_stats (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  editor_id           UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  "articlesReviewed"  INTEGER DEFAULT 0,
  "articlesApproved"  INTEGER DEFAULT 0,
  "articlesRejected"  INTEGER DEFAULT 0,
  "approvalRate"      REAL DEFAULT 0,
  "avgReviewTime"     REAL DEFAULT 0,
  "updatedAt"         TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- System Logs table
-- ============================================================
CREATE TABLE IF NOT EXISTS system_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action      TEXT NOT NULL,
  level       TEXT CHECK(level IN ('info', 'warn', 'error')) DEFAULT 'info',
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  description TEXT,
  metadata    JSONB,
  ip_address  TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);
