-- ============================================================
-- Migration 002: Indexes for Performance
-- Website Báo - PostgreSQL Database
-- ============================================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email    ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role     ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status   ON users(status);

-- Articles indexes
CREATE INDEX IF NOT EXISTS idx_articles_status       ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category     ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_author_id    ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_editor_id    ON articles(editor_id);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles("publishedAt" DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_articles_featured     ON articles("isFeatured") WHERE "isFeatured" = TRUE;
CREATE INDEX IF NOT EXISTS idx_articles_views        ON articles(views DESC);
CREATE INDEX IF NOT EXISTS idx_articles_created_at   ON articles("createdAt" DESC);

-- Full-text search index (GIN) - hỗ trợ tìm kiếm tiếng Việt
CREATE INDEX IF NOT EXISTS idx_articles_search ON articles USING GIN(search_vector);

-- Composite index for common query: published articles by category
CREATE INDEX IF NOT EXISTS idx_articles_published_category
  ON articles(category, "publishedAt" DESC)
  WHERE status = 'published';

-- Comments indexes
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id    ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id  ON comments("parentId");
CREATE INDEX IF NOT EXISTS idx_comments_status     ON comments(status);

-- Bookmarks indexes
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id    ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_article_id ON bookmarks(article_id);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id  ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read  ON notifications("isRead") WHERE "isRead" = FALSE;
CREATE INDEX IF NOT EXISTS idx_notifications_created  ON notifications("createdAt" DESC);

-- Tags indexes
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);

-- Article tags
CREATE INDEX IF NOT EXISTS idx_article_tags_article ON article_tags(article_id);
CREATE INDEX IF NOT EXISTS idx_article_tags_tag     ON article_tags(tag_id);

-- Categories
CREATE INDEX IF NOT EXISTS idx_categories_slug      ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories("parentId");

-- System logs
CREATE INDEX IF NOT EXISTS idx_system_logs_user_id   ON system_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_system_logs_action    ON system_logs(action);
CREATE INDEX IF NOT EXISTS idx_system_logs_level     ON system_logs(level);
CREATE INDEX IF NOT EXISTS idx_system_logs_created   ON system_logs("createdAt" DESC);
